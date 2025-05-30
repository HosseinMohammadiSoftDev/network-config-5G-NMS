<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Contract\ApiController;

class UserController extends ApiController
{
    public function getMe (Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->get(env('NMS_IP') . 'get-me');
    }




//    role, permission methods
    public function showAllRolesPermissions (Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->get(env('NMS_IP') . 'show-all-roles');
    }
    public function showAllPermissions (Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->get(env('NMS_IP') . 'show-all-permission');
    }


//    log method
    public function showAllLogs (Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->get(env('NMS_IP') . 'show-all-logs');
    }

}
