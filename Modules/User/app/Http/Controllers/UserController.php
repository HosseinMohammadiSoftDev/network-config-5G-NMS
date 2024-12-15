<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Contract\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\User\Http\Requests\User\AddMemberRequest;
use Modules\User\Http\Requests\User\resetPasswordRequest;
use Modules\User\Models\User;
use Modules\User\Services\PaginationService;

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

        return $this->respondSuccess('کاربر با موفقیت نمایش پیدا کرد', [
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
    }

    public function showAllUsers (Request $request)
    {
        $usersQuery = User::with('roles:name');

        $users = $this->paginationService->paginate($usersQuery, $request,
        ['id', 'created_at', 'updated_at']);

        return $this->respondSuccess('تمام کاربران برنامه با موفقیت دریافت شدند', $users);
    }
    public function getDeletedAccounts (request $request)
    {
        $usersQuery = User::onlyTrashed()->with('roles:name');

        $users = $this->paginationService->paginate($usersQuery, $request,
        ['id', 'created_at', 'updated_at']);

        return $this->respondSuccess('لیست کاربرانی که شما ان ها را حذف کردید', $users);
    }


    public function addMember (AddMemberRequest $request)
    {
        $credentials = $request->validated();
        $credentials['added_by'] = Auth::id();

        try {
                DB::beginTransaction();
            $user = User::create($credentials);
            $role = $credentials['role'] ?? null;

            if ($role)
                $user->assignRole($role);

                activity('add-member')
                    ->causedBy(Auth::user())
                    ->event('create-member')
                    ->withProperties([
                        'route' => request()->fullUrl(),
                        'method' => 'addMember',
                        'user' => Auth::user(),
                        'member' => $credentials,
                    ])
                ->log('ادمین کاربر را به برنامه ااضافه کرد');

                DB::commit();
            return $this->respondCreated('کاربر با موفقیت ساخته شد', ['user' => $user,'role' => $role ]);

        } catch (\Exception $e) {
                DB::rollBack();

                activity('add-member')
                    ->causedBy(Auth::user())
                    ->event('create-member')
                    ->withProperties([
                        'route' => request()->fullUrl(),
                        'method' => 'addMember',
                        'member' => $credentials,
                    ])
                ->log('ادمین کاربر را به برنامه ااضافه کرد');

            return $this->respondInternalError('مشکلی در روند برنامه رخ داد');
        }
    }
    public function resetPsswordAndAuthName (resetPasswordRequest $request)
    {
        $credentials = $request->validated();

        $user = User::find($credentials['user_id']);

        if ($user->hasRole('admin') && !Auth::user()->hasRole('admin'))
            return response()->json(['msg' => 'شما نمیتوانید نام کاربری و پسورد ادمین را تعقییر دهیم'], 403);


        try {
                DB::beginTransaction();

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
                    'credentials' => $credentials
                ])
            ->log('نام  کاربری و پسورد کاربر توسط ادمین با موفقیت به روز رسانی شد');

                    DB::commit();
            return $this->respondSuccess('نام کاربری و رمز عبور کاربر با موفقیت تعقییر کرد', [
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
            ->log('در تعویض نام کاربری و پسورد کاربر توسط ادمین مشکلی به وجود امد');

            return $this->respondInternalError('مشکلی در به روز راسانی نام کاربری و پسورد پیش امده');
        }
    }
    public function deleteAccountMember ($userId)
    {
        $user = User::find($userId);
            if (!$user)
                return response()->json(['msg' => 'شناسه کاربر درست نیست'], 404);

        if ($user->hasRole('admin'))
            return response()->json(['msg' => 'شما نمیتوانید کاربری که نقش ادمین را دارد را حذف کنید'], 403);


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
        ->log('حساب کاربر با موفقیت توسط ادمین حذف شد');

        return $this->respondSuccess('اکانت کاربر با موفقیت حذف شد', $user);
    }


}
