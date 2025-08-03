<?php

namespace Modules\Server\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Modules\Server\Helpers\SshHelper;
use Modules\Server\Http\Requests\Module\restartServiceModuleRequest;
use Modules\Server\Http\Requests\SshServer\SshServerRequest;
use Modules\Server\Models\Module;
use Modules\Server\Models\Server;
use Modules\Server\services\FilterOutputCommandService;
use Modules\Server\Utility\CommandOutputAnalyzerService;
use Modules\SystemSetting\Http\Requests\ShowInterfaceVmRequest;

class CommandController extends Controller
{
    public function __construct()
    {}

    public function showInterfaceVm (ShowInterfaceVmRequest $request)
    {
        $credentials = $request->validated();

        try {
            $server = server::find($credentials['server_id']);

            $command = 'ip link show'; // command as systemctl

            return $this->runCommandModuleToServer($credentials, $command, $server,'show-interface-vm', 'showInterfaceVm');

        } catch (\Exception $e) {
            throw ValidationException::withMessages(['warning' => $e->getMessage()]);
        }
    }


    // service module
    private function runCommandModuleToServer (
        $credentials,
        $command,
        server $server,
        $typeCommand,
        $method,
        int $port = 22,
        int $timeout = 5
    ) {
        $username = $credentials['username'];
        $password = $credentials['password'];

//           is down server
        if ($server['is_down'] == Server::OFF)
            throw ValidationException::withMessages(['server', 'this server off']);


        try {

            $sshHelper = new sshHelper($server, $username, $password, $port, $timeout);

            $outputCommand = $sshHelper->runCommandModule($command, $typeCommand, $method, $server);

            if (! empty(CommandOutputAnalyzerService::extractErrors($outputCommand)))
                throw ValidationException::withMessages(CommandOutputAnalyzerService::extractErrors($outputCommand));

            return response()->json(['message' => $outputCommand]);

        } catch (ValidationException $e) {
            throw $e;
        } catch(\InvalidArgumentException $e) {
            DB::rollBack();

            $message = $e->getMessage();

            $message = preg_replace('/\x1b\[[0-9;]*m/', '', $message); // حذف کدهای ANSI
            $message = preg_replace('/\r?\n.*?\[root@localhost.*?$/', '', $message); // حذف اطلاعات اضافی مربوط به خط فرمان

            preg_match_all('/\b(FATAL|ERROR):\s.*?(?=\s\(.*?\)|$)/m', $message, $matches);

            $formattedMessages = $matches[0] ?? [];

            $separatedMessages = [];
            foreach ($formattedMessages as $index => $msg) {
                $separatedMessages["Error-" . ($index + 1)] = $msg;
            }

            throw ValidationException::withMessages(['message' => $separatedMessages]);

        } catch (\Exception $e) {
            DB::rollBack();
                throw ValidationException::withMessages(['message' => $e->getMessage()]);
        }
    }
    public function restartServiceModule (restartServiceModuleRequest $request)
    {
        $credentials = $request->validated();

        $server = server::find($credentials['server_id']);
        $module = Module::find($credentials['module_id']);

        $command = 'systemctl restart ' . 'bbdh-' . $module['name'] . 'd'; // command as systemctl

        return $this->runCommandModuleToServer($credentials, $command, $server,'restartModel'
            , 'restartServiceModule', );
    }
    public function startServiceModule (restartServiceModuleRequest $request)
    {
        $credentials = $request->validated();

        $server = server::find($credentials['server_id']);
        $module = Module::find($credentials['module_id']);

        $command = 'systemctl start ' . 'bbdh-' . $module['name'] . 'd'; // command as systemctl

        return $this->runCommandModuleToServer($credentials, $command, $server, 'startModule', 'startServiceModule');
    }
    public function stopServiceModule (restartServiceModuleRequest $request)
    {
        $credentials = $request->validated();

        $server = server::find($credentials['server_id']);
        $module = Module::find($credentials['module_id']);

        $command = 'systemctl stop ' . 'bbdh-' . $module['name'] . 'd'; // command as systemctl

        return $this->runCommandModuleToServer($credentials, $command, $server,'stopModule', 'stopServiceModule');
    }
    public function statusServiceModule (restartServiceModuleRequest $request)
    {
        $credentials = $request->validated();

        $server = server::find($credentials['server_id']);
        $module = Module::find($credentials['module_id']);

        $command = 'systemctl status ' . 'bbdh-' . $module['name'] . 'd'; // command as systemctl

        return $this->runCommandModuleToServer($credentials, $command, $server, 'statusModule', 'statusServiceModule');
    }
    public function pingServer (SshServerRequest $request)
    {
        $credentials = $request->validated();

        $server = server::find($credentials['server_id']);

            $credentials['Interface'] ?? null
            ? $command = 'ping ' . '-I ' . $credentials['Interface'] . ' ' . $credentials['ipـdestination'] . ' -c 5'
            : $command = 'ping ' . $credentials['ipـdestination'] . ' -c 5';


        $sshHelper = new SSHHelper($server, $credentials['username'], $credentials['password']);
        return response()->json(['message' => $sshHelper->pingRunCommand($command)]);
    }
}
