<?php

namespace Modules\Server\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Server\Helpers\SshHelper;
use Modules\Server\Http\Requests\Module\restartServiceModuleRequest;
use Modules\Server\Http\Requests\SshServer\SshServerRequest;
use Modules\Server\Models\Module;
use Modules\Server\Models\Server;
use Modules\Server\Services\Command\CommandManager;

class CommandController extends Controller
{

    public function __construct()
    {}


    // service module
    public function runServiceLTE (restartServiceModuleRequest $request)
    {
        $validate = $request->validated();

        $server = server::find($validate['server_id']);

        return CommandManager::runServiceLTE($server, $validate['username'], $validate['password']);
    }
    public function runServiceGSM (restartServiceModuleRequest $request)
    {
        $validate = $request->validated();

        $server = server::find($validate['server_id']);

        return CommandManager::runServiceLTE($server, $validate['username'], $validate['password']);
    }

}
