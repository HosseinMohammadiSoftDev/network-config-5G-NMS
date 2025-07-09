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
    public function runServiceLTE ()
    {
        return CommandManager::runServiceLTE();
    }
    public function runServiceGSM ()
    {
        return CommandManager::runServiceLTE();
    }

}
