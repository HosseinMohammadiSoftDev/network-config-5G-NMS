<?php

namespace Modules\SystemSetting\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Modules\Server\Helpers\SshHelper;
use Modules\SystemSetting\Http\Requests\Trace\TraceServerRequest;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class TraceController extends Controller
{
    public function __construct()
    {

    }




//          start trace
    private function processRuner ($process, $server)
    {
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
    private function commandHelperStartServer ($username, $password, $server)
    {
        $ip = $server['ip'];

        $tsharkControllPath  = base_path('Modules/SystemSetting/app/Http/Services/Bash/tshark-control.sh');
        $setShPath = base_path('Modules/SystemSetting/app/Http/Services/Bash/set.sh');
        $remotePath      = '/home/siz-tel/trace/';

        $makeDirCommand = "sshpass -p '{$password}' ssh -o StrictHostKeyChecking=no {$username}@{$ip} 'mkdir -p /home/siz-tel/trace'";

        $commandScpTsharkControl = "sshpass -p '{$password}' scp -o StrictHostKeyChecking=no {$tsharkControllPath} {$username}@{$ip}:{$remotePath} ";

        $commandScpSetSh = "sshpass -p '{$password}' scp -o StrictHostKeyChecking=no {$setShPath} {$username}@{$ip}:{$remotePath}";

        $permissionCommand =
            "sshpass -p '{$password}' ssh -T -o StrictHostKeyChecking=no {$username}@{$ip} "
            . "'echo \"{$password}\" | sudo -S -p \"\" chmod 777 -R /home/siz-tel/trace'";

        $commandRunScript =
            "sshpass -p '{$password}' ssh -T -o StrictHostKeyChecking=no {$username}@{$ip} "
            . "'echo \"{$password}\" | sudo -S nohup bash {$remotePath}tshark-control.sh start > /home/siz-tel/trace/tshark.log 2>&1 &'";

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
        $credentials     = $request->validated();
        $username        = $credentials['username'];
        $password        = $credentials['password'];
        $servers         = $request['servers'];


        try {
            DB::beginTransaction();

            $results   = [];
            $processes = [];

            foreach ($servers as $server) {
                $commands = $this->commandHelperStartServer($username, $password, $server);

                foreach (['makeDirCommand', 'commandScpTsharkControl', 'commandScpSetSh',
                             'permissionCommand', 'commandRunScript'] as $key) {
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
                    ];
                }
            }

            DB::commit();
                return response()->json(['status' => true, 'message'=> 'Trace server success.', 'data' => $results], 200);

        } catch (\Exception $e) {
            DB::rollBack();
                return response()->json(['status' => false, 'message'=> $e->getMessage(),], 422);
        }
    }




//        stop trace
    private function commandHelperStopServer ($username, $password, $server)
    {
        $localPath = '/home/siz/trace/';
            $setShCommand = $localPath . 'bash ./set.sh ';

        $remotePath = '/tmp/' . $server['ip'] . '.pcapng';
        $mmeLogFile = '/var/log/bbdh/mme1.log';


        $commandStopTshark = "sshpass -p '{$password}' ssh -o StrictHostKeyChecking=no {$username}@{$server['ip']}"
            . " 'echo \"{$password}\" | sudo -S bash /home/siz-tel/trace/tshark-control.sh stop'";


        $commandScpPcapFile = "sshpass -p '{$password}' scp -o StrictHostKeyChecking=no " .
            "{$username}@{$server['ip']}:{$remotePath} {$localPath}";


        $commandMergePcap = 'cd ' . $localPath . '&& mergecap -w final.pcapng ' . $server['ip'] . '.pcapng';

        $scpMmeLogCommand = "sshpass -p '{$password}' scp -o StrictHostKeyChecking=no " .
            "{$username}@{$server['ip']}:{$mmeLogFile} {$localPath}";

        $mergeMmeLogCommand = 'cd ' . $localPath . 'cat mme1.log mme2.log mme3.log > /home/siz-tel/trace/mme.log';

        $setShRun = '/home/siz-tel/trace/set.sh ';


        return [
            'commandStopTshark' => $commandStopTshark,
            'commandScpPcapFile' => $commandScpPcapFile,
            'scpMmeLogCommand'=> $scpMmeLogCommand,
            'mergeMmeLogCommand' => $mergeMmeLogCommand,
            'commandMergePcap' => $commandMergePcap,
            'setShCommand' => $setShCommand,
            'setShRun' => $setShRun,
        ];
    }
    public function traceServerStop (TraceServerRequest $request)
    {
        $credentials = $request->validated();

        $username = $credentials['username'];
        $password = $credentials['password'];
        $servers  = $request['servers'];

        try {
            DB::beginTransaction();

                $results   = [];
                $processes = [];

            try {
                foreach ($servers as $server) {
                    $commands = $this->commandHelperStopServer($username, $password, $server);

                    foreach (['commandStopTshark', 'commandScpPcapFile', 'commandMergePcap', 'scpMmeLogCommand',
                                 'mergeMmeLogCommand', 'setShRun'] as $key) {

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
