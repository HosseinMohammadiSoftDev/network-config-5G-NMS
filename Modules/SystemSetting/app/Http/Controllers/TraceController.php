<?php

namespace Modules\SystemSetting\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $process->start(function ($type, $buffer) use ($server, &$output) {
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
    private function commandHelperStartServer ($bashScripPath, $remotePath, $username, $password, $server)
    {

//                   read content bash script AND echo to VM server
        $scriptContent = file_get_contents($bashScripPath);

        $command =
            <<<EOT
                    cat > {$remotePath}
                    {$scriptContent}
            EOT;

        $commandEchoBashToVM =
            <<<EOT
                    sshpass -p '{$password}' ssh -o StrictHostKeyChecking=no {$username}@{$server['ip']}
                            'echo {$command} > {$remotePath} && chmod 777 {$remotePath} && {$remotePath} start'
            EOT;



//            make directory
        $makeDirCommand = "sshpass -p '{$password}' ssh -o StrictHostKeyChecking=no {$username}@{$server['ip']} 'mkdir -p /home/siz-tel/trace'";

//            SCP bash script command
        $commandSCP = "sshpass -p '{$password}' scp -o StrictHostKeyChecking=no " .
            "{$bashScripPath} {$username}@{$server['ip']}:{$remotePath}";


//            permission and controly command
        $permissionCommand = "sshpass -p '{$password}' ssh -o StrictHostKeyChecking=no {$username}@{$server['ip']} "
            . "'echo {$password} | sudo -S chmod 777 -R /home/siz-tel/trace'";

//            run script command
        $commandRunScript = "sshpass -p '{$password}' ssh -o StrictHostKeyChecking=no {$username}@{$server['ip']}"
            . " 'echo \"{$password}\" | sudo -S bash {$remotePath} start'";


        return [
            'permissionCommand' => $permissionCommand,
            'makeDirCommand' => $makeDirCommand,
            'commandSCP' => $commandSCP,
//            'commandEchoBashToVM' => $commandEchoBashToVM,
            'commandRunScript' => $commandRunScript,
        ];
    }
    public function traceServerStart (TraceServerRequest $request)
    {
        $credentials = $request->validated();

        $username = $credentials['username'];
        $password = $credentials['password'];
        $servers = $request['servers'];

        try {
            DB::beginTransaction();

                $bashScripPath = base_path('Modules/SystemSetting/app/Http/Services/Bash/tshark-control.sh');;
                    $remotePath = '/home/siz-tel/trace/tshark-control.sh';



            $processes = [];
            $outputs = [];

            foreach ($servers as $server) {
                $command = $this->commandHelperStartServer($bashScripPath, $remotePath, $username, $password, $server);
//dd($command);
                try {
//                      mkdir run command
                    $process = Process::fromShellCommandline($command['makeDirCommand']);
                       $processStart = $this->processStarter($process, $server); // process starter

                    $processes[$server['ip']] = [
                        'process' => $process,
                        'output' => $processStart['output'],
                        'makeDirCommand' => $command['makeDirCommand']
                    ];



//                        SCP run command
                    $process = Process::fromShellCommandline($command['commandSCP']);
                        $processStart = $this->processStarter($process, $server); // process starter

                    $processes[$server['ip']] = [
                        'process' => $process,
                        'output' => $processStart['output'],
                        'commandSCP' => $command['commandSCP']
                    ];



//                        run bash command
                    $process = Process::fromShellCommandline($command['permissionCommand']);
                        $processStart = $this->processStarter($process, $server); // process starter

                    $processes[$server['ip']] = [
                        'process' => $process,
                        'output' => $processStart['output'],
                        'permissionCommand' => $command['permissionCommand']
                    ];



//                    permission trace directory and sombolink tshark
                    $process = Process::fromShellCommandline($command['permissionCommand']);
                        $processStart = $this->processStarter($process, $server); // process starter

                    $processes[$server['ip']] = [
                        'process' => $process,
                        'output' => $processStart['output'],
                        'permissionCommand' => $command['permissionCommand']
                    ];

                } catch (ProcessFailedException $e) {
                    $results[$server['ip']] = ['status' => false, 'error' => $e->getMessage()];
                }
            }

            foreach ($processes as $ip => $processe) {
                $processe['process']->wait();
                $results[$ip] = [
                    'status' => true,
                    'output' => $processe['output']
                ];
            }


            DB::commit();
                return response()->json(['status' => true, 'message' => 'Trace server success.'], 200);

        } catch (\Exception $e) {
            DB::rollBack();
                return response()->json(['status' => false, 'message' => $e->getMessage()], 422);
        }
    }





//        stop trace
    private function commandHelperStopServer ($server, $username, $password)
    {
        $localPath = '/home/siz-tel/trace/';
            $setShCommand = $localPath . 'bash ./set.sh ';


        $remotePath = '/home/siz-tel/trace/' . $server['ip'] . '.pcapng';


        $commandStopTshark = "sshpass -p '{$password}' ssh -o StrictHostKeyChecking=no {$username}@{$server['ip']}"
            . " 'echo \"{$password}\" | sudo -S bash /home/siz-tel/trace/tshark-control.sh stop'";


        $commandSCP = "sshpass -p '{$password}' scp -o StrictHostKeyChecking=no " .
            "{$username}@{$server['ip']}:{$remotePath} {$localPath}";


        $commandMergePcap = 'cd ' . $localPath . '&& mergecap -w final.pcapng ' . $server['ip'] . '.pcapng';

        return [
            'localPath' => $localPath,
            'setShCommand' => $setShCommand,
            'remotePath' => $remotePath,
            'commandSCP' => $commandSCP,
            'commandMergePcap' => $commandMergePcap,
            'commandStopTshark' => $commandStopTshark,
        ];
    }
    public function traceServerStop (TraceServerRequest $request)
    {
        $credentials = $request->validated();

        $username = $credentials['username'];
        $password = $credentials['password'];
        $servers = $request['servers'];

        try {
            DB::beginTransaction();


            foreach ($servers as $server) {
                $command = $this->commandHelperStopServer($server, $username, $password);

                try {

//                        stop tshark VMs
                    $process = Process::fromShellCommandline($command['commandStopTshark']);
                        $processStart = $this->processStarter($process, $server); // process starter

                    $processes[$server['ip']] = [
                        'process' => $process,
                        'output' => $processStart['output'],
                        'commandStopTshark' => $command['commandStopTshark']
                    ];



//                        scp .pcapng files VMs
                    $process = Process::fromShellCommandline($command['commandSCP']);
                        $processStart = $this->processRuner($process, $server); // process starter

                    $processes[$server['ip']] = [
                        'process' => $process,
                        'output' => $processStart['output'],
                        'commandSCP' => $command['commandSCP']
                    ];




//                        merge pcap VMS to VM nms
                    $process = Process::fromShellCommandline($command['commandMergePcap']);
                        $processStart = $this->processStarter($process, $server); // process starter

                    $processes[$server['ip']] = [
                        'process' => $process,
                        'output' => $processStart['output'],
                        'commandMergePcap' => $command['commandMergePcap']
                    ];



                } catch (ProcessFailedException $e) {
                    $results[$server['ip']] = ['status' => false, 'error' => $e->getMessage()];
                }
            }


//                merge log command
            foreach ($servers as $server) {

                $mergeLogCommand = 'cat mme1.log mme2.log mme3.log > /home/siz-tel/trace/mme.log';

                $process = Process::fromShellCommandline($mergeLogCommand);
                $process->start();
                $processes[$server['ip']] = $process;

            }


//                wate process
            while (array_filter($processes, fn($p) => $p->isRunning()))
                usleep(100000); // 100ms تاخیر


//                run bash scrript
            $mergeLogCommand = '/home/siz-tel/trace/set.sh ';

            $process = Process::fromShellCommandline($mergeLogCommand);
            $process->start();
            $processes[$server['ip']] = $process;


            DB::commit();
                return response()->json(['status' => true, 'message' => 'Trace server success.'], 200);

        } catch (\Exception $e) {
            DB::rollBack();
                return response()->json(['success' => false, 'message' => $e->getMessage()], 422);
        }
    }
}
