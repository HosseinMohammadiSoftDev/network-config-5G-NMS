<?php

namespace Modules\Backup\Services;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Modules\Backup\Models\BackupConfig;
use Modules\Backup\Models\BackupHistory;
use Modules\Server\Models\Server;
use Symfony\Component\Yaml\Yaml;

class BackupService
{
    public function handle(BackupConfig $backupConfig) : void
    {
        $backupConfig->load('history');

//            backup history
        $backupHistory = BackupHistory::create([
            'start_time'       => now(),
            'status'           => BackupHistory::RUNING,
            'backup_config_id' => $backupConfig['id']
        ]);

        try {

            $storagePath = $backupConfig['destination_path'] . now()->toString();

            if (file_exists($storagePath)) File::deleteDirectory($storagePath);

            File::makeDirectory($storagePath, 0777, true, true); // create backup folder


            $servers = Server::with('modules')->get();
//      create server name folder
            foreach ($servers as $server) {
                $serverFolder = "{$storagePath}/{$server->name}";
                File::makeDirectory($serverFolder);

//      create yaml file to folder server
                foreach ($server->modules as $module) {
                    $configFile = "{$serverFolder}/{$module->name}.yaml";
                    File::put(
                        $configFile,
                        $this->convertJsonToYaml($module->pivot->current_config)
                    );
                }
            }


            activity('backup_modules')
                ->event('schedule')
                ->withProperties([
                    'type-log' => 'schedule',
                    'time'     => now(),
                    'destination_path' => $storagePath,
                    'servers'  => $servers->pluck('name')->toArray(),
                ])
                ->log('run backup module schedule successFul');

            $backupHistory->update([
                'name'        => now()->toString(),
                'destination_path' => $backupConfig->destination_path,
                'message'     => 'backup successfull',
                'status'      => BackupHistory::SUCCESSFULY,
                'servers'     => $servers->pluck('name'),
                'finish_time' => now()
            ]);

        } catch (\Exception $e) {

            activity('backup_modules')
                ->event('schedule')
                ->withProperties([
                    'type-log' => 'schedule',
                    'time'     => now(),
                    'destination_path' => $storagePath,
                    'servers'  => $servers->pluck('name')->toArray(),
                    'errors'   => $e->getMessage()
                ])
                ->log('Problem in process run backup module schedule came into being');


            $backupHistory->update([
                'name'        => now()->toString(),
                'destination_path' => $backupConfig->destination_path,
                'message'     => $e,
                'servers'     => $servers->pluck('name'),
                'status'      => BackupHistory::FAILED,
                'finish_time' => now()
            ]);
        }


    }
    private function convertJsonToYaml($jsonContent)
    {
        $arrayContent = json_decode($jsonContent, true, 512, JSON_BIGINT_AS_STRING | JSON_THROW_ON_ERROR);

        if (json_last_error() !== JSON_ERROR_NONE)
            throw new HttpResponseException(response()->json(['msg' => 'error in convert json to yaml'], 422));


        $yamlContent = yaml::dump($arrayContent, 10,2);

        // $yamlContent = preg_replace('/^(\s*)-\s*/m', '$1', $yamlContent);
        $yamlContent = preg_replace('/^(\s*)-\s*/m', '$1- ', $yamlContent);

        return $yamlContent;

    }
}
