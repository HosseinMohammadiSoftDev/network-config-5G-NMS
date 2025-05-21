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

//                   read content bash script
            $scriptContent = file_get_contents($bashScripPath);

            $command =
                <<<EOT
                    cat > {$remotePath}
                    {$scriptContent}
                EOT
            ;


            $processes = [];
            $results = [];

            foreach ($servers as $server) {

                $commandTemplate = <<<EOT
                    sshpass -p '{$password}' ssh -o StrictHostKeyChecking=no {$username}@{$server['ip']}
                            'echo {$command} > {$remotePath} && chmod +x {$remotePath} && {$remotePath} start'
                EOT;

                $commandSCP = "sshpass -p '{$password}' scp -o StrictHostKeyChecking=no " .
                    "{$bashScripPath} {$username}@{$server['ip']}:{$remotePath}";

                try {

                    $process = Process::fromShellCommandline($commandSCP);

                    $process->start();
                    $processes[$server['ip']] = $process;

                    $results[$server['ip']] = ['status' => true];

                } catch (ProcessFailedException $e) {
                    $results[$server['ip']] = ['status' => false, 'error' => $e->getMessage()];
                }
            }


            DB::commit();
                return response()->json(['status' => true, 'message' => 'Trace server success.'], 200);

        } catch (\Exception $e) {
            DB::rollBack();
                return response()->json(['status' => false, 'message' => $e->getMessage()], 422);
        }
    }

    public function traceServerStop (TraceServerRequest $request)
    {
        $credentials = $request->validated();

        $username = $credentials['username'];
        $password = $credentials['password'];
        $servers = $request['servers'];

        try {
            DB::beginTransaction();

            $localPath = '/home/mohammadi/trace/';
                $setShCommand = $localPath . 'bash ./set.sh ';


            foreach ($servers as $server) {

                $remotePath = '/tmp/' . $server['ip'] . '.pcapng';

                $commandSCP = "sshpass -p '{$password}' scp -o StrictHostKeyChecking=no " .
                    "{$username}@{$server['ip']}:{$remotePath} {$localPath}";

                try {

                    $process = Process::fromShellCommandline($commandSCP);

                    $process->start();
                    $processes[$server['ip']] = $process;
                    $results[$server['ip']] = ['status' => true];

                } catch (ProcessFailedException $e) {
                    $results[$server['ip']] = ['status' => false, 'error' => $e->getMessage()];
                }
            }

//                wate process
            while (array_filter($processes, fn($p) => $p->isRunning()))
                usleep(100000); // 100ms تاخیر


            foreach ($servers as $server) {

                $commandMergePcap = 'cd ' . $localPath . '&& mergecap -w final.pcapng ' . $server['ip'] . '.pcapng';

                $process = Process::fromShellCommandline($commandMergePcap);
                $process->start();
                $processes[$server['ip']] = $process;

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
