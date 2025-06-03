<?php

namespace Modules\Server\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Spyc;
use Exception;
use Illuminate\Http\Request;
use Modules\User\Models\Role;
use Modules\User\Models\User;
use Modules\Server\Models\Server;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Modules\User\Models\Permission;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Modules\Server\Helpers\SshHelper;
use Modules\User\Services\PaginationService;
use phpseclib3\Crypt\EC\Formats\Signature\SSH2;
use App\Http\Controllers\Contract\ApiController;
use Illuminate\Http\Exceptions\HttpResponseException;
use Modules\Server\Http\Requests\TestConnectionRequest;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Modules\Server\Http\Requests\Server\EditServerReqest;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Modules\Server\Http\Requests\Server\DeleteServerReqest;
use Modules\Server\Http\Requests\Server\CreateServerRequest;
use Modules\Server\Http\Requests\Server\UploadModuleRequest;
use Modules\Server\Http\Requests\Server\StartStopComandReqest;


class ServerController extends ApiController
{

    public function showAllServers (Request $request)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $request->header('Authorization'),
            'Accept' => 'application/json'
        ])->get(env('NMS_IP') . 'show-all-servers');

        return response()->json($response->json(), $response->status());
    }


    public function editServer (Request $request)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $request->header('Authorization'),
            'Accept' => 'application/json'
        ])->post(env('NMS_IP') . 'edit-server', [
                'server_id' => $request['server_id'],
                'name' => $request['name'] ?? null,
                'ip' => $request['ip'] ?? null,
                'path_config' => $request['path_config'] ?? null,
                'path_run_config' => $request['path_run_config'] ?? null,
            ]);

        return response()->json($response->json(), $response->status());
    }


    public function serverStop (Request $request)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $request->header('Authorization'),
            'Accept' => 'application/json'
        ])->post(env('NMS_IP') . 'server-stop', [
                'server_id' => $request['server_id'],
            ]);

        return response()->json($response->json(), $response->status());
    }
    public function serverStart (Request $request)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $request->header('Authorization'),
            'Accept' => 'application/json'
        ])->post(env('NMS_IP') . 'server-start', [
                'server_id' => $request['server_id'],
            ]);

        return response()->json($response->json(), $response->status());
    }
    public function serverStatus (Request $request)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $request->header('Authorization'),
            'Accept' => 'application/json'
        ])->post(env('NMS_IP') . 'server-status', [
                'server_id' => $request['server_id'],
            ]);

        return response()->json($response->json(), $response->status());
    }


    public function testConnection (Request $request)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $request->header('Authorization'),
            'Accept' => 'application/json'
        ])->post(env('NMS_IP') . 'test-connection', [
                'server_id' => $request['server_id'],
                'username' => $request['username'],
                'password' => $request['password'],
            ]);

        return response()->json($response->json(), $response->status());
    }
}

