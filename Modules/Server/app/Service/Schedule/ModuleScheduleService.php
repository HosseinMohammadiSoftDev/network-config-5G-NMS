<?php

namespace Modules\Server\Service\Schedule;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Modules\Server\Helpers\SshHelper;
use Modules\Server\Models\ModuleSchedule;
use Modules\Server\Models\Server;
use Modules\Server\Utility\CommandOutputAnalyzerService;

class ModuleScheduleService
{
    public function handle (ModuleSchedule $moduleSchedule)
    {
        $moduleSchedule->update(['status' => ModuleSchedule::RUNNING]);

        if ($moduleSchedule['status'] == ModuleSchedule::SUCCESS) return; // EXIT

        try {
            DB::beginTransaction();

                $pivotData = $moduleSchedule->module->servers()->where('server_id', $moduleSchedule['server_id'])->first()->pivot;

                $currentConfig = $pivotData['current_config'];

                $pivotData['previous_config'] = $currentConfig;
                $pivotData['current_config'] = $moduleSchedule['config'];
                $pivotData->save();


                $outputCommand = $this->sendConfigToServer(
                    $moduleSchedule['username_ssh'],
                    $moduleSchedule['password_ssh'],
                    $moduleSchedule->module->name,
                    $moduleSchedule['config'],
                    $moduleSchedule->server,
                    $creadtional['port'] ?? 22,
                    'moduleSchedule',
                    'scheduleService'
                );

                $commandWarning = CommandOutputAnalyzerService::extractErrors($outputCommand);
                if ($commandWarning) throw ValidationException::withMessages($commandWarning);


            DB::commit();

        } catch (\Exception $e) {
            DB::rollBack();
                throw $e;
        }
    }

    /**
     * @throws ValidationException
     */
    private function sendConfigToServer(
        string $username,
        string $password,
        string $moduleName,
        string $yamlContent,
        Server $server,
        int $port = 22,
        string $typeCommand,
        string $method,

    ) {
        if ($server['is_down'] == Server::OFF) throw ValidationException::withMessages(['server.down' => 'this server: ' . $server['name'] .' is off']);

        if (!$server['path_config']) throw ValidationException::withMessages(['server.path_config' => 'You did not specify a configuration address config']);

        if (!$server['path_run_config']) throw ValidationException::withMessages(['server.path_run_config' => 'You did not specify a configuration address run config']);

        $sshHelper = new sshHelper($server, $username, $password, $port);


        $commandUpdateFileModule = 'echo ' . escapeshellarg($yamlContent) . ' > ' . $server['path_config'] . $moduleName . '.yaml';
        return $sshHelper->runCommandModule($commandUpdateFileModule, $typeCommand, $method, $server);
    }
}
