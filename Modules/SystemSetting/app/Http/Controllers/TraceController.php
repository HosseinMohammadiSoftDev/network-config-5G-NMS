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
use Symfony\Component\Process\Exception\ProcessSignaledException;
use Symfony\Component\Process\Process;

class TraceController extends Controller
{
    public function __construct() {}




//          start trace
    private function processRuner ($process, $server)
    {
        $process->setTimeout(300);
        $process->setIdleTimeout(60);

        Log::info("Starting process for server {$server->ip}: " . $process->getCommandLine());

        $output = '';
        $error  = '';

        try {
            $process->run(function ($type, $buffer) use ($server, &$output, &$error) {
                if (Process::OUT === $type) {
                    $output .= $buffer;
                    Log::info("Server {$server->ip} OUT: " . trim($buffer));
                } else {
                    $error .= $buffer;
                    Log::error("Server {$server->ip} ERR: " . trim($buffer));
                }
            });

            if ($process->hasBeenSignaled()) Log::warning("Process terminated by signal: " . $process->getTermSignal());


            if ($process->hasBeenSignaled()) {
                $signal = $process->getTermSignal();
                Log::warning("Process for server {$server->ip} terminated by signal: " . $signal);

                if ($signal === 15) {
                    return [
                        'process' => $process,
                        'output' => $output,
                        'error' => $error . " [Process was gracefully terminated with SIGTERM]",
                        'success' => true,
                        'exit_code' => 0,
                        'command' => $process->getCommandLine(),
                        'signaled' => true
                    ];
                }
            }

            $output .= $process->getIncrementalOutput();
            $error  .= $process->getIncrementalErrorOutput();
            $success = $process->isSuccessful();

            return [
                'process' => $process,
                'output' => $output,
                'error' => $error,
                'success' => $success,
                'exit_code' => $process->getExitCode(),
                'command' => $process->getCommandLine()
            ];

        } catch (ProcessSignaledException $e) {
            Log::error("ProcessSignaledException for server {$server->ip}: " . $e->getMessage());
            return [
                'process' => $process,
                'output' => $output,
                'error' => $error . " [Process signaled: " . $e->getMessage() . "]",
                'success' => false,
                'exit_code' => -1,
                'command' => $process->getCommandLine(),
                'signaled' => true
            ];
        } catch (\Exception $e) {
            Log::error("Exception in processRuner for server {$server->ip}: " . $e->getMessage());
            return [
                'process' => $process,
                'output' => $output,
                'error' => $error . " [Exception: " . $e->getMessage() . "]",
                'success' => false,
                'exit_code' => -1,
                'command' => $process->getCommandLine()
            ];
        }
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
    private function commandHelperStartServer (
        string $username,
        string $password,
        Server $server,
        array $interface,
        array $moduleName = null
    ) {
        $ip = $server['ip'];

        $impledModuleName    = !empty($moduleName) ? implode(' ', $moduleName) : null;
        $impledInterfaceName = !empty($interface) ? '-i ' . implode(' -i ', $interface) : 'any';

        $tsharkControllPath  = base_path('Modules/SystemSetting/app/Http/Services/Bash/tshark-control.sh');
        $setShPath           = base_path('Modules/SystemSetting/app/Http/Services/Bash/set.sh');
        $remotePath          = env('TRACE_REMOTE_PATH');

        $sshOptions = "-T -o StrictHostKeyChecking=no";

        $makeDirCommand = "sshpass -p '{$password}' ssh {$sshOptions} {$username}@{$ip} 'mkdir -p {$remotePath}'";

        $commandScpTsharkControl = "sshpass -p '{$password}' scp -o StrictHostKeyChecking=no {$tsharkControllPath} {$username}@{$ip}:{$remotePath}";

        $commandScpSetSh = "sshpass -p '{$password}' scp -o StrictHostKeyChecking=no {$setShPath} {$username}@{$ip}:{$remotePath}";

        $permissionCommand =
            "sshpass -p '{$password}' ssh {$sshOptions} {$username}@{$ip} "
            . "'echo \"{$password}\" | sudo -S -p \"\" chmod 777 -R {$remotePath}'";

//        run tshark service
        $commandRunScript =
            "sshpass -p '{$password}' ssh {$sshOptions} {$username}@{$ip} "
            . "'echo \"{$password}\" | sudo -S bash {$remotePath}tshark-control.sh start -i {$impledInterfaceName} -m {$impledModuleName} > {$remotePath}tshark.log 2>&1 &'";

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

            $results   = [];
            $processes = [];

            foreach ($request['servers'] as $server) {

                $serverIndex = array_search($server['id'], array_column($credentials['servers'], 'id'));
                $username    = $credentials['servers'][$serverIndex]['username'];
                $password    = $credentials['servers'][$serverIndex]['password'];
                $interface   = $credentials['servers'][$serverIndex]['interface'] ?? [];
                $port        = $credentials['servers'][$serverIndex]['port'] ?? 22;

                $moduleName  = isset($credentials['servers'][$serverIndex]['module_ids'])
                    ? Module::whereIn('id', $credentials['servers'][$serverIndex]['module_ids'])->pluck('name')->toArray()
                    : null;

                $commands = $this->commandHelperStartServer($username, $password, $server, $interface, $moduleName);

                $sshHelper = new sshHelper($server, $username, $password, $port, 7);
                $sshHelper->testConnection();


                foreach (['makeDirCommand', 'commandScpTsharkControl', 'commandScpSetSh',
                             'permissionCommand', 'commandRunScript'] as $key) {
                    $proc = Process::fromShellCommandline($commands[$key]);
                    $started = $this->processRuner($proc, $server);
                    $processes[$server['ip']][] = [
                        'name'      => $key,
                        'process'   => $started['process'],
                        'output'    => $started['output'],
                        'error'     => $started['error'],
                        'success'   => $started['success'],
                        'exit_code' => $started['exit_code']
                    ];
                }
            }

            foreach ($processes as $ip => $list) {
                foreach ($list as $item) {
                    $item['process']->wait();
                    $results[$ip][$item['name']] = [
                        'status' => $item['success'],
                        'output' => $item['output'],
                        'error' => $item['error'],
                        'exit_code' => $item['exit_code']
                    ];
                }
            }


            return response()->json([
                'status' => true,
                'message' => 'Trace started successfully.',
                'results' => $results,
            ], 200);

        } catch (\Exception $e) {
//                return response()->json(['status' => false, 'message'=> $e->getMessage(),], 422);
                throw $e;
        }
    }




//        stop trace
    private function commandHelperStopServer (
        string $username,
        string $password,
        Server $server,
        array $interface,
        mixed $moduleIdentifier,
        string $currentServerPassword,
        array $moduleName = null
    ) {
        $moduleName          = $server->modules()->pluck('name')->toArray();
        $impledModuleName    = !empty($moduleName) ? implode(' ', $moduleName) : null;
        $impledInterfaceName = !empty($interface) ? implode(' -i ', $interface) : 'any';

        $localPath    = env('TRACE_REMOTE_PATH');
        $remotePath   = '/tmp/' . $server['ip'] . '_' . $impledInterfaceName . '.pcapng';
        $logFilePath  = env('TRACE_LOG_FILE_PATH');


        $logFiles = array_map(function ($name) use ($logFilePath) {
            return "{$logFilePath}bbdh-{$name}d";
        }, $moduleName);
        $remoteLogPaths = implode(' ', $logFiles);

        $moduleName = array_map(function ($name) use ($logFilePath) {
            return "bbdh-{$name}d.log";
        }, $moduleName);
        $moduleNmaeImplode = implode(' ', $moduleName);


        $commandStopTshark  = "sshpass -p '{$password}' ssh -tt {$username}@{$server['ip']} \"echo '{$password}' | sudo -S bash {$localPath}tshark-control.sh stop -i {$impledInterfaceName} -m {$impledModuleName}\"";

        $commandScpPcapFile = "sshpass -p '{$password}' scp -o StrictHostKeyChecking=no {$username}@{$server['ip']}:'{$remotePath}' {$localPath}";

        $commandMergePcap   = 'cd ' . $localPath . ' && mergecap -w final.pcapng ' . $server['ip'] . '_' . $impledInterfaceName . '.pcapng';

        $scpLogCommand = "sshpass -p '{$password}' scp -o StrictHostKeyChecking=no " .
            "{$username}@{$server['ip']}:{$remoteLogPaths} {$localPath}";

        $mergeMmeLogCommand = "cd {$logFilePath} && cat {$moduleNmaeImplode} > {$localPath}mme.log";

//        $setShRun = "echo '{$currentServerPassword}' | sudo -S {$localPath}set.sh {$moduleIdentifier}";
        $setShRun = "echo '{$currentServerPassword}' | su - root -c '{$localPath}set.sh {$moduleIdentifier}'";

        $dockerRunWireShark = "echo '{$currentServerPassword}' | sudo -S nohup docker run -d --rm -p 8085:8085 -v \$(pwd)/captures:/captures ghcr.io/qxip/webshark:latest > /dev/null 2>&1 &";

        return [
            'commandStopTshark' => $commandStopTshark,
            'commandScpPcapFile' => $commandScpPcapFile,
            'scpMmeLogCommand'=> $scpLogCommand,
            'mergeMmeLogCommand' => $mergeMmeLogCommand,
            'commandMergePcap' => $commandMergePcap,
            'setShRun' => $setShRun,
            'dockerRunWireShark' => $dockerRunWireShark,
        ];
    }
    public function traceServerStop (TraceServerRequest $request)
    {
        $credentials = $request->validated();

        $results   = [];
        $processes = [];

//            try {
                foreach ($request['servers'] as $server) {

                    $serverIndex = array_search($server['id'], array_column($credentials['servers'], 'id'));
                    $username    = $credentials['servers'][$serverIndex]['username'];
                    $password    = $credentials['servers'][$serverIndex]['password'];
                    $interface   = $credentials['servers'][$serverIndex]['interface'] ?? [];
                    $port        = $credentials['servers'][$serverIndex]['port'] ?? 22;

                    $moduleIdentifier = isset($credentials['servers'][$serverIndex]['module_identifier'])
                        ? $credentials['servers'][$serverIndex]['module_identifier']
                        : null;

                    $moduleName  = isset($credentials['servers'][$serverIndex]['module_ids'])
                        ? Module::whereIn('id', $credentials['servers'][$serverIndex]['module_ids'])->pluck('name')->toArray()
                        : null;

                    $commands = $this->commandHelperStopServer($username, $password, $server, $interface, $moduleIdentifier, $credentials['current_server_password'], $moduleName);

                    $sshHelper = new sshHelper($server, $username, $password, $port, 7);
                    $sshHelper->testConnection();


                    foreach (['commandStopTshark', 'commandScpPcapFile', 'commandMergePcap', 'scpMmeLogCommand',
                             'mergeMmeLogCommand', 'dockerRunWireShark'] as $key) {

                        $proc = Process::fromShellCommandline($commands[$key]);
                        $started = $this->processRuner($proc, $server);
                        $processes[$server['ip']][] = [
                            'name'    => $key,
                            'process' => $started['process'],
                            'output'  => $started['output'],
                            'error'   => $started['error'],
                            'success' => $started['success'],
                            'exit_code' => $started['exit_code']
                        ];
                    }
                }

                foreach ($processes as $ip => $list) {
                    foreach ($list as $item) {
                        $item['process']->wait();
                        $results[$ip][$item['name']] = [
                            'status' => $item['success'],
                            'output' => $item['output'],
                            'error' => $item['error'],
                            'exit_code' => $item['exit_code']
                        ];
                    }
                }

            return response()->json(['status' => true, 'message' => 'Trace stopped successfully.', 'results' => $results, 'webshark' => 'http://localhost:8085/webshark'], 200);

//        } catch (\Exception $e) {
//            return response()->json(['success' => false, 'message' => $e->getMessage()], 422);
//        }
    }
}
