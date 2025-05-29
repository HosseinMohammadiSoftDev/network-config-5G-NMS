<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Modules\User\Models\User;
use function PHPSTORM_META\map;
use Modules\Server\Models\Server;
use Illuminate\Support\Facades\DB;
use Modules\User\Models\Permission;
use Illuminate\Support\Facades\Auth;
use Modules\User\Services\PaginationService;
use App\Http\Controllers\Contract\ApiController;
use Modules\User\Http\Requests\User\AddMemberRequest;
use Modules\User\Http\Requests\User\EditMemberRequest;
use Modules\User\Http\Requests\User\resetPasswordRequest;
use function PHPUnit\Framework\isEmpty;

class UserController extends ApiController
{
    protected $paginationService;
    public function __construct(PaginationService $paginationService)
    {
        $this->paginationService = $paginationService;
    }

    public function getMe ()
    {
        $serverIds = Server::whereIn(
            'name',
            Auth::user()->permissions()
                ->where('name', 'like', 'server/%')
                ->pluck('name')
                ->map(fn($name) => str_replace('server/', '', $name))
        )->pluck('id');


        return $this->respondSuccess('The user was successfully displayed', [
            'user' => [
                'id' => Auth::user()->id,
                'first_name' => Auth::user()->first_name,
                'last_name' => Auth::user()->last_name,
                'auth_name' => Auth::user()->auth_name,
                'phone' => Auth::user()->phone,
                'server_id' => Auth::user()?->server_id,
                'created_at' => Auth::user()->created_at,
                'updated_at' => Auth::user()->updated_at,
                'roles' => Auth::user()->getRoleNames(),
                'permissions' => Auth::user()->getAllPermissions()->pluck('name'),
                'permissionServerIds' => $serverIds
            ],
        ]);
    }

    public function showAllUsers (Request $request)
    {
        $usersQuery = User::query();

        $users = $this->paginationService->paginate($usersQuery, $request,
        ['id', 'created_at', 'updated_at']);

        $user = $users->map(function ($user) {
            return [
                'id' => $user['id'],
                'auth_name' => $user['auth_name'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'phone' => $user['phone'],
                'server_id' => $user['server_id'] ?? null,
                'added_by' => $user['added_by'],
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
            ];
        });

        return $this->respondSuccess('All users of the application were successfully retrieved', [
            'users' => $user,
            'pagination' => [
                'total' => $users->total(),
                'per_page' => $users->perPage(),
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'path' => $users->path(),
            ]
        ]);
    }
    public function getDeletedAccounts (request $request)
    {
        $usersQuery = User::onlyTrashed()->with('roles:name');

        $users = $this->paginationService->paginate($usersQuery, $request,
        ['id', 'created_at', 'updated_at']);

        return $this->respondSuccess('The list of users you have deleted', $users);
    }


    private function assignRoleAndPermissionsToVisitor(User $user, $role, $permissionNames)
    {
        $allowed = ['monitoring', "module/read", "VM/read"];

        $user->syncPermissions([]);

        $allowed = array_merge($allowed, Permission::where('name', 'like', 'server/%')->pluck('name')->toArray());

        if ((!in_array('module/read', $permissionNames, true) || !in_array('VM/read', $permissionNames, true)))
            $permissionNames = array_unique(array_merge($permissionNames, ['module/read', 'VM/read']));


        if (count($permissionNames) === 0 )
            throw new HttpResponseException(response()->json(['msg' => 'Granting access to the user is mandatory'], 422));

        if (!empty($permissionNames) && is_array($permissionNames)) {
            $invalidPermissions = array_diff($permissionNames, $allowed);
            if (!empty($invalidPermissions))
                throw new HttpResponseException(response()->json(['msg' => 'Invalid permissions provided: ' . implode(', ', $invalidPermissions)], 422));

            $user->assignRole($role);
            $user->givePermissionTo($permissionNames);
        }
    }



    public function addMember (AddMemberRequest $request)
    {
        return Http::post(env('NMS_IP') . 'add-member', []);
    }
    public function editMember (EditMemberRequest $request)
    {
        $credentials = $request->validated();

        $user = User::find($credentials['user_id']);
        $role = $credentials['role'] ?? $user->getRoleNames()[0];


        try {
            DB::beginTransaction();


            if ($role == 'visitor')
                $this->assignRoleAndPermissionsToVisitor($user, $role, $request['permissionNames']);
            else
                $this->assignRoleAndPermissionsToExpert($user, $role, $request['permissionNames']);


            $user->update([
                'auth_name' => $credentials['auth_name'] ?? $user['auth_name'],
                'password' => $credentials['password'] ?? $user['password'],
                'first_name' => $credentials['first_name'] ?? $user['first_name'],
                'last_name' => $credentials['last_name'] ?? $user['last_name'],
                'phone' => $credentials['phone'] ?? $user['phone']
            ]);

                // edit role user
            if (isset($credentials['role']))
                $user->syncRoles([$credentials['role']]);

                // server permission
            if ($request['serverPermission'])
                $user->givePermissionTo($request['serverPermission']);


                // logout user
            $user->tokens()->delete();

        activity('reset-pass-and-auth-name')
            ->causedBy(Auth::user())
            ->performedOn($user)
            ->event('update-pass-auth-name')
            ->withProperties([
                'type-log' => 'app',
                'route' => request()->fullUrl(),
                'method' => 'resetPsswordAndAuthName',
                'user' => Auth::user()->makeHidden(['roles', 'permissions'])->toArray(),
                'user_role' => Auth::user()->roles()->pluck('name')->first(),
                'member' => $user,
            ])
            ->log('The user\'s username and password were successfully updated');

        DB::commit();
        return $this->respondSuccess('The user Edit successfully', [
            'user' => [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'phone' => $user->phone,
                'auth_name' => $user->auth_name,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
            ],
        ]);

        } catch (\Exception $e) {
                DB::rollBack();
            throw $e;
        }
    }
    public function deleteAccountMember ($userId)
    {

    }


}
