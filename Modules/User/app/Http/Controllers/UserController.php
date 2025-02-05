<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Modules\User\Models\User;
use function PHPSTORM_META\map;
use Modules\Server\Models\Server;
use Illuminate\Support\Facades\DB;
use Modules\User\Models\Permission;
use Illuminate\Support\Facades\Auth;
use Modules\User\Services\PaginationService;
use App\Http\Controllers\Contract\ApiController;
use Modules\User\Http\Requests\User\AddMemberRequest;
use Modules\User\Http\Requests\User\resetPasswordRequest;

class UserController extends ApiController
{
     protected $paginationService;
    public function __construct(PaginationService $paginationService)
    {
        $this->paginationService = $paginationService;
    }

    public function getMe ()
    {
        $user = User::find(Auth::id());
        $serverPermissions = Permission::where('name', 'like', 'server/%')->pluck('name')->toArray();
        $userPermissions = $user->permissions()->whereIn('name', $serverPermissions)->pluck('name')->toArray();
        $modifiedArray = array_map(fn($item) => str_replace("server/", "", $item), $userPermissions);

        $serverIds = Server::whereIn('name', $modifiedArray)->pluck('id');


        return $this->respondSuccess('The user was successfully displayed', [
            'user' => [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'auth_name' => $user->auth_name,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
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
                'added_by' => $user['added_by'],
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
            ];
        });

        return $this->respondSuccess('All users of the application were successfully retrieved', ['user' => $user]);
    }
    public function getDeletedAccounts (request $request)
    {
        $usersQuery = User::onlyTrashed()->with('roles:name');

        $users = $this->paginationService->paginate($usersQuery, $request,
        ['id', 'created_at', 'updated_at']);

        return $this->respondSuccess('The list of users you have deleted', $users);
    }



    private function assignRoleAndPermissions(User $user, $role, $permissionNames)
    {

        $user->assignRole($role);

        $rolePermissions = Permission::whereHas('roles', function ($query) use ($role) {
            $query->where('name', $role);
        })->pluck('name')->toArray();


        $user->revokePermissionTo($rolePermissions);
        $user->syncPermissions([]);

        if (!empty($permissionNames) && is_array($permissionNames)) {
            $user->givePermissionTo($permissionNames);

            $vmCrudPermissions = ['VM/create', 'VM/delete', 'VM/update'];
            $moduleCrudPermissions = ['module/create', 'module/delete', 'module/update'];

            $hasVmCrud = !empty(array_intersect($vmCrudPermissions, $permissionNames));
            $hasModuleCrud = !empty(array_intersect($moduleCrudPermissions, $permissionNames));

            if ($hasVmCrud)
                $user->givePermissionTo('VM/read');

            if ($hasModuleCrud)
                $user->givePermissionTo('module/read');
        }
    }
    public function addMember (AddMemberRequest $request)
    {
        $credentials = $request->validated();
        $credentials['added_by'] = Auth::id();

        try {
                DB::beginTransaction();
            $user = User::create($credentials);
            $role = $credentials['role'] ?? null;
            $permissionName = $credentials['permission_name'] ?? null;

            $this->assignRoleAndPermissions($user, $role, $permissionName);


                activity('add-member')
                    ->causedBy(Auth::user())
                    ->event('create-member')
                    ->withProperties([
                        'route' => request()->fullUrl(),
                        'method' => 'addMember',
                        'user' => Auth::user(),
                        'member' => $credentials,
                    ])
                ->log('The admin added the user to the application');

                DB::commit();


            return $this->respondCreated('The user was successfully created', ['user' => $user,'role' => $role, 'permission_name' => $permissionName ]);

        } catch (\Exception $e) {
                DB::rollBack();

                activity('add-member')
                    ->causedBy(Auth::user())
                    ->event('create-member')
                    ->withProperties([
                        'route' => request()->fullUrl(),
                        'method' => 'addMember',
                        'member' => $credentials,
                        'user' => Auth::user(),
                    ])
                ->log('An issue occurred during the process');

            return $this->respondInternalError('An issue occurred during the process');
        }
    }
    public function editMember (resetPasswordRequest $request)
    {
        $credentials = $request->validated();

        $user = User::find($credentials['user_id']);
        $role = $credentials['role'] ?? null;
        $permissionName = $credentials['permission_name'] ?? null;

        if ($user->hasRole('admin') && !Auth::user()->hasRole('admin'))
            return response()->json(['msg' => 'You cannot change the admin username and password'], 403);


        try {
                DB::beginTransaction();

            $this->assignRoleAndPermissions($user, $role, $permissionName);

            $user->update([
                'auth_name' => $credentials['auth_name'] ?? $user['auth_name'],
                'password' => $credentials['password'] ?? $user['password'],
                'first_name' => $credentials['first_name'] ?? $user['first_name'],
                'last_name' => $credentials['last_name'] ?? $user['last_name'],
            ]);

                // edit role user
            if (isset($credentials['role']))
                $user->syncRoles([$credentials['role']]);


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
                    'user' => Auth::user(),
                    'member' => $user,
                ])
            ->log('The user\'s username and password were successfully updated');

                    DB::commit();
            return $this->respondSuccess('The user\'s username and password were successfully changed', [
                'user' => [
                    'id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'auth_name' => $user->auth_name,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                    'roles' => $user->getRoleNames(),
                    'permissions' => $user->getAllPermissions()->pluck('name'),
                ],
            ]);

        } catch (\Exception $e) {
                DB::rollBack();

            activity('reset-pass-and-auth-name')
                ->causedBy(Auth::user())
                ->performedOn($user)
                ->event('update-pass-auth-name')
                ->withProperties([
                    'route' => request()->fullUrl(),
                    'method' => 'resetPsswordAndAuthName',
                    'user' => $user,
                    'error' => $e->getMessage()
                ])
            ->log('An issue occurred while updating the username and password');

            return $this->respondInternalError('An issue occurred while updating the username and password');
        }
    }
    public function deleteAccountMember ($userId)
    {
        $user = User::find($userId);
            if (!$user)
                return response()->json(['msg' => 'The user ID is incorrect'], 404);

        if ($user->hasRole('admin'))
            return response()->json(['msg' => 'You cannot delete a user who has an admin role'], 403);


        $user->delete();

        $user->tokens()->delete();


        activity('delete-account')
            ->causedBy(Auth::user())
            ->performedOn($user)
            ->event('delete')
            ->withProperties([
                'type-log' => 'app',
                'route' => request()->fullUrl(),
                'method' => 'deleteAccountMember',
                'user' => Auth::user(),
                'member' => $user,
            ])
        ->log('The user account was successfully deleted');

        return $this->respondSuccess('The user account was successfully deleted', $user);
    }


}
