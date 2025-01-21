<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Modules\User\Models\Role;
use Modules\User\Models\User;
use App\Http\Controllers\Contract\ApiController;
use Modules\User\Http\Requests\Role\AddPermissionToUser;
use Modules\User\Models\Permission;

class RoleController extends ApiController
{
    public function showAllRolesPermissions (Request $request)
    {
        $roles = Role::with('permissions:name')->get();

        return $this->respondSuccess('List of all roles with access', $roles);
    }


    public function showAllPermissions ()
    {
        $moduleName = Permission::all()->pluck('name');

        return $this->respondSuccess('List of all permissions', $moduleName);
    }


    public function addPermissionToUser(AddPermissionToUser $request)
    {
        $credentials = $request->validated();

        $user = User::find($credentials['user_id']);
        $permissionName = $request->input('permission_name');

        $user->givePermissionTo($permissionName);

        return response()->json([
            'message' => 'Permission was successfully added to the user'
        ]);
    }
    public function removePermissionFromUser(AddPermissionToUser $request   )
    {
        $credentials = $request->validated();

        $user = User::find($credentials['user_id']);
        $permissionName = $request->input('permission_name');

        $user->revokePermissionTo($permissionName);

        return response()->json([
            'message' =>'The user\'s permission was successfully removed'
        ]);
    }
}
