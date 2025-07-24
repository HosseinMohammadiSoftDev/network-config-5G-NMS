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
use Modules\SystemSetting\Http\Requests\ShowInterfaceVmRequest;

class CommandController extends Controller
{
    public function __construct()
    {}

    public function showInterfaceVm (ShowInterfaceVmRequest $request)
    {
        $validate = $request->validated();

        try {
            $server = server::find($validate['server_id']);
            $port = $request->input('port', 22);


            $command = 'ip link show'; // command as systemctl

            return $this->runCommandModuleToServer($validate, $command, $server,'showInterfaceVm', 'showInterfaceVm');

        } catch (\Exception $e) {
            throw ValidationException::withMessages(['warning' => $e->getMessage()]);
        }
    }


    // service module
    private function runCommandModuleToServer ($validate, $command, server $server, $typeCommand, $method)
    {
        $username = $validate['username'];
        $password = $validate['password'];

//           is down server
        if ($server['is_down'] == Server::OFF)
            throw ValidationException::withMessages(['server', 'this server off']);


        try {

            $sshHelper = new sshHelper($server, $username, $password);

            $output = $sshHelper->runCommandModule($command, $typeCommand, $method, $server);

            return response()->json(['message' => $output]);

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
        $validate = $request->validated();

        $server = server::find($validate['server_id']);
        $module = Module::find($validate['module_id']);

        // $command = $server['path_run_config'] . 'bbdh-' . $module['name'] . 'd' . ' restart';  // command as bbdh
//        $command = 'systemctl restart ' . 'bbdh-' . $module['name'] . 'd'; // command as systemctl
        $command = 'systemctl restart ' . 'apache2'; // command as systemctl

        return $this->runCommandModuleToServer($validate, $command, $server,'restartModel', 'restartServiceModule');
    }
    public function startServiceModule (restartServiceModuleRequest $request)
    {
        $validate = $request->validated();

        $server = server::find($validate['server_id']);
        $module = Module::find($validate['module_id']);

        // $command = $server['path_run_config'] . 'bbdh-' . $module['name'] . 'd' . ' start';  // command as bbdh
//        $command = 'systemctl start ' . 'bbdh-' . $module['name'] . 'd'; // command as systemctl
        $command = 'systemctl start ' . 'apache2'; // command as systemctl

        return $this->runCommandModuleToServer($validate, $command, $server, 'startModule', 'startServiceModule');
    }
    public function stopServiceModule (restartServiceModuleRequest $request)
    {
        $validate = $request->validated();

        $server = server::find($validate['server_id']);
        $module = Module::find($validate['module_id']);

        // $command = $server['path_run_config'] . 'bbdh-' . $module['name'] . 'd' . ' stop'; // command as bbdh
//        $command = 'systemctl stop ' . 'bbdh-' . $module['name'] . 'd'; // command as systemctl
        $command = 'systemctl stop ' . 'apache2'; // command as systemctl

        return $this->runCommandModuleToServer($validate, $command, $server,'stopModule', 'stopServiceModule');
    }
    public function statusServiceModule (restartServiceModuleRequest $request)
    {
        $validate = $request->validated();

        $server = server::find($validate['server_id']);
        $module = Module::find($validate['module_id']);


        // $command = $server['path_run_config'] . 'bbdh-' . $module['name'] . 'd' . ' status'; // command as bbdh
//        $command = 'systemctl status ' . 'bbdh-' . $module['name'] . 'd'; // command as systemctl
        $command = 'systemctl status ' . 'apache2'; // command as systemctl

        return $this->runCommandModuleToServer($validate, $command, $server, 'statusModule', 'statusServiceModule');
    }
    public function pingServer (SshServerRequest $request)
    {
        $validate = $request->validated();

        $server = server::find($validate['server_id']);

            $validate['interface'] ?? null
            ? $command = 'ping ' . '-I ' . $validate['interface'] . ' ' . $validate['ipـdestination']
            : $command = 'ping ' . $validate['ipـdestination'];


        return $this->runCommandModuleToServer($validate, $command, $server,'pingServer', 'pingServer');
    }
}
