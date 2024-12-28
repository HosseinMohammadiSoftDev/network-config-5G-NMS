<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Modules\User\Models\Role;
use Modules\User\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Contract\ApiController;
use Modules\User\Http\Requests\Role\AddPermissionToUser;

class RoleController extends ApiController
{
    public function showAllRolesPermissions (Request $request)
    {
        $roles = Role::with('permissions:name')->get();

        return $this->respondSuccess('لیست تمام نقش ها با دسترسی', $roles);
    }
    public function addPermissionToUser(AddPermissionToUser $request)
    {
        $credentials = $request->validated();

        $user = User::find($credentials['user_id']);
        $permissionName = $request->input('permission_name');

        $user->givePermissionTo($permissionName);

        return response()->json([
            'message' => 'دسترسی با موفقیت به کاربر اضافه شد',
        ]);
    }
    public function removePermissionFromUser(AddPermissionToUser $request   )
    {
        $credentials = $request->validated();

        $user = User::find($credentials['user_id']);
        $permissionName = $request->input('permission_name');

        $user->revokePermissionTo($permissionName);

        return response()->json([
            'message' => 'دسترسی کاربر با موفقیت حذف شد',
        ]);
    }
}
