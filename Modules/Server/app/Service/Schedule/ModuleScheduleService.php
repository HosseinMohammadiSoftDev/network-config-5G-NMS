<?php

namespace Modules\Server\Service\Schedule;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Modules\Server\Helpers\SshHelper;
use Modules\Server\Models\ModuleSchedule;
use Modules\Server\Models\Server;
use Modules\Server\Utility\CommandOutputAnalyzerService;
use Symfony\Component\Yaml\Yaml;

class ModuleScheduleService
{
    public function handle (ModuleSchedule $moduleSchedule)
    {
        $moduleSchedule->update(['status' => ModuleSchedule::RUNNING]);

        if ($moduleSchedule['status'] == ModuleSchedule::SUCCESS) return; // EXIT

        try {
            $pivotData = $moduleSchedule->module->servers()->where('server_id', $moduleSchedule['server_id'])->first()->pivot;

            $jsonConfig = json_encode(Yaml::parse($moduleSchedule->config), JSON_PRETTY_PRINT);

            DB::transaction(function () use ($moduleSchedule, $jsonConfig, $pivotData) {
                DB::table('module_server')
                    ->where('module_id', $moduleSchedule->module_id)
                    ->where('server_id', $moduleSchedule->server_id)
                    ->update([
                        'previous_config' => $pivotData->current_config,
                        'current_config' => $jsonConfig,
                    ]);
            });

           $outputCommand = $this->sendConfigToServer(
                $moduleSchedule['password_ssh'],
                $moduleSchedule['username_ssh'],
                $moduleSchedule->module->name,
                $moduleSchedule['config'],
                $moduleSchedule->server,
                'moduleSchedule',
                'scheduleService'
            );

           $commandWarning = ! empty($outputCommand) ? CommandOutputAnalyzerService::extractErrors($outputCommand) : null;
           if ($commandWarning) throw ValidationException::withMessages($commandWarning);

            activity('module schedule')
                ->event('schedule')
                ->withProperties([
                    'type-log' => 'schedule',
                    'time'     => now(),
                    'module_schedule' => $moduleSchedule,
                ])
            ->log('run module schedule schedule successfully');


        } catch (\Exception $e) {

            activity('module schedule')
                ->event('schedule')
                ->withProperties([
                    'type-log' => 'schedule',
                    'time'     => now(),
                    'module_schedule' => $moduleSchedule,
                    'errors'   => $e->getMessage()
                ])
                ->log('Problem in process run module schedule schedule came into being');

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
