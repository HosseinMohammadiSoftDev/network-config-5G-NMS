<?php

namespace Modules\SystemSetting\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Modules\Server\Helpers\SshHelper;
use Modules\Server\Models\Module;
use Modules\Server\Models\Server;
use Modules\SystemSetting\Http\Requests\Trace\TraceServerRequest;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class TraceController extends Controller
{
    public function __construct()
    {}




//          start trace
    private function processRuner ($process, $server)
    {
        $process->setTimeout(20);

        Log::info($process->getCommandLine());

        $process->run(function ($type, $buffer) use ($server, &$output) {
            $output .= $buffer;

            if (Process::OUT === $type)
                echo "$server->ip OUT $buffer";
            else
                echo "$server->ip ERR $buffer";
        });

        return [
            'process' => $process,
            'output' => $output,
        ];
    }
    private function processStarter ($process, $server)
    {
        $process->setTimeout(20);

        $output = '';

        $process->start(function ($type, $buffer) use ($server, &$output, &$hasError) {
            $output .= $buffer;

            if (Process::OUT === $type) {
                echo "$server->ip OUT: $buffer";
            } else {
                echo "$server->ip ERR: $buffer";
            }
        });

        return [
            'process' => $process,
            'output' => $output,
        ];
    }
    private function commandHelperStartServer (string $username, string $password, Server $server, array $moduleName = null)
    {
        $ip = $server['ip'];

        $impledModuleName = !empty($moduleName) ? implode(' ', $moduleName) : null;

        $tsharkControllPath  = base_path('Modules/SystemSetting/app/Http/Services/Bash/tshark-control.sh');
        $setShPath           = base_path('Modules/SystemSetting/app/Http/Services/Bash/set.sh');
        $remotePath          = env('TRACE_REMOTE_PATH');

        $makeDirCommand = "sshpass -p '{$password}' ssh -o StrictHostKeyChecking=no {$username}@{$ip} 'mkdir -p {$remotePath}'";

        $commandScpTsharkControl = "sshpass -p '{$password}' scp -o StrictHostKeyChecking=no {$tsharkControllPath} {$username}@{$ip}:{$remotePath} ";

        $commandScpSetSh = "sshpass -p '{$password}' scp -o StrictHostKeyChecking=no {$setShPath} {$username}@{$ip}:{$remotePath}";

        $permissionCommand =
            "sshpass -p '{$password}' ssh -T -o StrictHostKeyChecking=no {$username}@{$ip} "
            . "'echo \"{$password}\" | sudo -S -p \"\" chmod 777 -R {$remotePath}'";

//        run tshark service
        $commandRunScript =
            "sshpass -p '{$password}' ssh -T -o StrictHostKeyChecking=no {$username}@{$ip} "
            . "'echo \"{$password}\" | sudo -S nohup bash {$remotePath}tshark-control.sh start {$impledModuleName} > {$remotePath}tshark.log 2>&1 &'";


        return [
            'makeDirCommand'            => $makeDirCommand,
            'commandScpTsharkControl'   => $commandScpTsharkControl,
            'commandScpSetSh'           => $commandScpSetSh,
            'permissionCommand'         => $permissionCommand,
            'commandRunScript'          => $commandRunScript,
        ];
    }
    public function traceServerStart(TraceServerRequest $request)
    {
        $credentials = $request->validated();

        try {
            DB::beginTransaction();

            $results   = [];
            $processes = [];

            foreach ($request['servers'] as $server) {

                $serverIndex = array_search($server['id'], array_column($credentials['servers'], 'id'));
                $username    = $credentials['servers'][$serverIndex]['username'];
                $password    = $credentials['servers'][$serverIndex]['password'];
                $port        = $credentials['servers'][$serverIndex]['port'] ?? 22;

                $moduleName  = isset($credentials['servers'][$serverIndex]['module_ids'])
                    ? Module::whereIn('id', $credentials['servers'][$serverIndex]['module_ids'])->pluck('name')->toArray()
                    : null;

                $commands    = $this->commandHelperStartServer($username, $password, $server, $moduleName);

                $sshHelper = new sshHelper($server, $username, $password, $creadtional['port'] ?? 22, 7);
                $sshHelper->testConnection();


                foreach (['makeDirCommand', 'commandScpTsharkControl', 'commandScpSetSh',
                             'permissionCommand', 'commandRunScript'] as $key) {
                    $proc = Process::fromShellCommandline($commands[$key]);
                    $started = $this->processRuner($proc, $server);
                    $processes[$server['ip']][] = [
                        'name'    => $key,
                        'process' => $started['process'],
                        'output'  => $started['output'],
                    ];
                }
            }

            foreach ($processes as $ip => $list) {
                foreach ($list as $item) {
                    $item['process']->wait();
                    $results[$ip][$item['name']] = [
                        'status' => true,
                    ];
                }
            }

            DB::commit();
                return response()->json(['status' => true, 'message'=> 'Trace server success.', 'data' => $results], 200);

        } catch (\Exception $e) {
            DB::rollBack();
//                return response()->json(['status' => false, 'message'=> $e->getMessage(),], 422);
                throw $e;
        }
    }




//        stop trace
    private function commandHelperStopServer (string $username, string $password, Server $server, array $moduleName = null)
    {
        $localPath    = env('TRACE_REMOTE_PATH');
        $setShCommand = 'bash ' . $localPath . 'set.sh';
        $remotePath   = '/tmp/' . $server['ip'] . '.pcapng';
        $logFilePath  = env('TRACE_LOG_FILE_PATH');
        $moduleName   = $server->modules()->pluck('name')->toArray();

        $logFiles = array_map(function ($name) use ($logFilePath) {
            return "{$logFilePath}{$name}*";
        }, $moduleName);
        $remoteLogPaths = implode(' ', $logFiles);

        $moduleName = array_map(function ($name) use ($logFilePath) {
            return "{$name}.log";
        }, $moduleName);
        $moduleNmaeImplode = implode(' ', $moduleName);


//        $commandStopTshark = "sshpass -p '{$password}' ssh -tt {$username}@{$server['ip']}"
//            . " 'echo \"{$password}\" | sudo -S bash {$localPath}tshark-control.sh stop'";

        $commandStopTshark = "sshpass -p '{$password}' ssh -tt {$username}@{$server['ip']} \"echo '{$password}' | sudo -S bash {$localPath}tshark-control.sh stop\"";

        $commandScpPcapFile = "sshpass -p '{$password}' scp -o StrictHostKeyChecking=no {$username}@{$server['ip']}:'{$remotePath}' {$localPath}";

        $commandMergePcap = 'cd ' . $localPath . '&& mergecap -w final.pcapng ' . $server['ip'] . '.pcapng';

        $scpLogCommand = "sshpass -p '{$password}' scp -o StrictHostKeyChecking=no " .
            "{$username}@{$server['ip']}:{$remoteLogPaths} {$localPath}";

        $mergeMmeLogCommand = "cd {$logFilePath} && cat {$moduleNmaeImplode} > {$localPath}mme.log";

        $setShRun = "sshpass -p '{$password}' ssh -tt {$username}@{$server['ip']} cat | sudo -S {$localPath}set.sh";


        return [
            'commandStopTshark' => $commandStopTshark,
            'commandScpPcapFile' => $commandScpPcapFile,
            'scpMmeLogCommand'=> $scpLogCommand,
            'mergeMmeLogCommand' => $mergeMmeLogCommand,
            'commandMergePcap' => $commandMergePcap,
            'setShRun' => $setShRun,
        ];
    }
    public function traceServerStop (TraceServerRequest $request)
    {
        $credentials = $request->validated();

        try {
            DB::beginTransaction();

                $results   = [];
                $processes = [];

            try {
                foreach ($request['servers'] as $server) {

                    $serverIndex = array_search($server['id'], array_column($credentials['servers'], 'id'));
                    $username    = $credentials['servers'][$serverIndex]['username'];
                    $password    = $credentials['servers'][$serverIndex]['password'];
                    $port        = $credentials['servers'][$serverIndex]['port'] ?? 22;

                    $moduleName  = isset($credentials['servers'][$serverIndex]['module_ids'])
                        ? Module::whereIn('id', $credentials['servers'][$serverIndex]['module_ids'])->pluck('name')->toArray()
                        : null;

                    $commands = $this->commandHelperStopServer($username, $password, $server, $moduleName);

                    foreach (['commandStopTshark', 'commandScpPcapFile', 'commandMergePcap'
                             , 'scpMmeLogCommand', 'mergeMmeLogCommand'] as $key) {

                        $proc = Process::fromShellCommandline($commands[$key]);
                        $started = $this->processStarter($proc, $server);
                        $processes[$server['ip']][] = [
                            'name'    => $key,
                            'process' => $started['process'],
                            'output'  => $started['output'],
                        ];
                    }
                }

                foreach ($processes as $ip => $list) {
                    foreach ($list as $item) {
                        $item['process']->wait();
                        $results[$ip][$item['name']] = [
                            'status' => true,
                            'output' => $item['output'],
                        ];
                    }
                }

            } catch (ProcessFailedException $e) {
                $results[$server['ip']] = ['status' => false, 'error' => $e->getMessage()];
            }




            DB::commit();
                return response()->json(['status' => true, 'message' => 'Trace server success.'], 200);

        } catch (\Exception $e) {
            DB::rollBack();
                return response()->json(['success' => false, 'message' => $e->getMessage()], 422);
        }
    }
}
