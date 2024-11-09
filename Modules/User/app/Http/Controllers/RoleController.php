<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Contract\ApiController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\User\Models\Role;

class RoleController extends ApiController
{
    public function showAllRolesPermissions (Request $request)
    {
        $roles = Role::with('permissions:name')->get();

        return $this->respondSuccess('لیست تمام نقش ها با دسترسی', $roles);
    }
    
}
