<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Contract\ApiController;

class UserController extends ApiController
{
    public function getMe (Request $request)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $request->header('Authorization'),
            'Accept' => 'application/json'
        ])->get(env('NMS_IP') . 'get-me');

        return response()->json($response->json(), $response->status());
    }




//    role, permission methods
    public function showAllRolesPermissions (Request $request)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $request->header('Authorization'),
            'Accept' => 'application/json'
        ])->get(env('NMS_IP') . 'show-all-roles');

        return response()->json($response->json(), $response->status());
    }
    public function showAllPermissions (Request $request)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $request->header('Authorization'),
            'Accept' => 'application/json'
        ])->get(env('NMS_IP') . 'show-all-permission');

        return response()->json($response->json(), $response->status());
    }


//    log method
    public function showAllLogs (Request $request)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $request->header('Authorization'),
            'Accept' => 'application/json'
        ])->get(env('NMS_IP') . 'show-all-logs');

        return response()->json($response->json(), $response->status());
    }

}
