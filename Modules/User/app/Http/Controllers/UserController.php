<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Contract\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function getMe (Request $request) 
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
        $user = Auth::user();

        $credentials['added_by'] = Auth::id();
        $user = User::create($credentials);

        $role = $credentials['role'] ?? null;

        if ($role) 
            $user->assignRole($role);

        return $this->respondCreated('کاربر با موفقیت ساخته شد', [
            'user' => $user,
            'role' => $role
        ]);
    }
    public function resetPsswordAndAuthName (resetPasswordRequest $request)
    {
        $credentials = $request->validated();
        
        $user = User::find($credentials['user_id']);

        if ($user->hasRole('admin')) 
            return response()->json(['msg' => 'شما نمیتوانید کاربری که نقش ادمین را دارد را حذف کنید'], 403);

        $user->update([
           'auth_name' => $credentials['auth_name'] ?? $user['auth_name'],
           'password' => $credentials['password'] ?? $user['password'],
        ]);

            // کاربر را logout میکنیم
        $user->tokens()->delete();

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
    public function deleteAccountMember ($userId)
    {
        $user = User::find($userId);
            if (!$user) 
                return response()->json(['msg' => 'شناسه کاربر درست نیست'], 404);

        if ($user->hasRole('admin')) 
            return response()->json(['msg' => 'شما نمیتوانید کاربری که نقش ادمین را دارد را حذف کنید'], 403);
        

        $user->delete();

        $user->tokens()->delete();

        return $this->respondSuccess('اکانت کاربر با موفقیت حذف شد', $user);
    }

  
}
