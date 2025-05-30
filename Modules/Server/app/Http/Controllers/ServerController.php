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
        return Http::get(env('NMS_IP') . 'show-all-servers');
    }


    public function editServer (EditServerReqest $request)
    {
        $credentials = $request->validated();

        return Http::post(env('NMS_IP') . 'edit-server', [
            'server_id' => $credentials['server_id'],
            'name' => $credentials['name'] ?? null,
            'ip' => $credentials['ip'] ?? null,
            'path_config' => $credentials['path_config'] ?? null,
            'path_run_config' => $credentials['path_run_config'] ?? null,
        ]);
    }


    public function serverStop (StartStopComandReqest $request)
    {
        $credentials = $request->validated();

        return Http::post(env('NMS_IP') . 'server-stop', [
            'server_id' => $credentials['server_id'],
        ]);
    }
    public function serverStart (StartStopComandReqest $request)
    {
        $credentials = $request->validated();

        return Http::post(env('NMS_IP') . 'server-start', [
            'server_id' => $credentials['server_id'],
        ]);
    }
    public function serverStatus (StartStopComandReqest $request)
    {
        $credentials = $request->validated();

        return Http::post(env('NMS_IP') . 'server-status', [
            'server_id' => $credentials['server_id'],
        ]);
    }


    public function testConnection (TestConnectionRequest $request)
    {
        $creadtional = $request->validated();

        return Http::post(env('NMS_IP') . 'test-connection', [
            'server_id' => $creadtional['server_id'],
            'username' => $creadtional['username'],
            'password' => $creadtional['password'],
        ]);
    }
}

