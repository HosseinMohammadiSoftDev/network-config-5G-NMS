<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Modules\Backup\Models\BackupConfig;
use Modules\Backup\Models\BackupHistory;
use Modules\Server\Models\Server;
use Illuminate\Support\Facades\File;
use Symfony\Component\Yaml\Yaml;


class backup extends Command
{
    protected $signature = 'backup:run';

    protected $description = 'run backup as servers save to system detination path.';

    public function handle()
    {
//            backup history
        $backupHistory = BackupHistory::create(['started_at' => now(), 'status' => BackupHistory::RUNING]);

        try {

            $backupConfig = BackupConfig::first();
                if (!$backupConfig)
                    throw ValidationException::withMessages(['validation' => ['not set config backup.']]);

            $storagePath = $backupConfig['destination_path'] . now()->toString();

            if (file_exists($storagePath))
                File::deleteDirectory($storagePath);

//            create backup folder
            File::makeDirectory($storagePath, 0777, true, true);


            $servers = Server::with('modules')->get();
//                create server name folder
            foreach ($servers as $server) {
                $serverFolder = "{$storagePath}/{$server->name}";
                File::makeDirectory($serverFolder);

//         create yaml file to folder server
                foreach ($server->modules as $module) {
                    $configFile = "{$serverFolder}/{$module->name}.yaml";
                    File::put(
                        $configFile,
                        $this->convertJsonToYaml($module->pivot->current_config)
                    );
                }
            }
                $this->info('The command was successful!');

            $backupHistory->update([
                'name' => now()->toString(),
                'destination_path' => $backupConfig->destination_path,
                'message' => 'backup successfull',
                'status' => BackupHistory::SUCCESSFULY,
                'servers' => $servers->pluck('name'),
                'finished_at' => now()
            ]);

        } catch (\Exception $e) {

            $backupHistory->update([
               'name' => now()->toString(),
               'destination_path' => $backupConfig->destination_path,
               'message' => $e->getMessage(),
               'servers' => $servers->pluck('name'),
               'status' => BackupHistory::FAILED,
               'finished_at' => now()
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
