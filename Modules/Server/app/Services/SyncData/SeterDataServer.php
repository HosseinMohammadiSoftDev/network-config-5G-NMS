<?php

namespace Modules\Server\Services\SyncData;



use Modules\Server\Models\Module;
use Modules\Server\Models\Server;

class SeterDataServer
{
    public function __construct()
    {}


//    save data to sqlite bbu
    private function saveServerData ($server) : void
    {
        Server::updateOrCreate(
            ['id' => $server['id']],
            ['name' =>  $server['name'],
            'ip'   =>  $server['ip'],
            'is_down' =>  $server['is_down']]
        );
    }
    private function saveModuleData (array $modules) : void
    {
        foreach ($modules[0]['modules'] as $module) {

             Module::updateOrCreate([
                'name' => $module['name'],
                'type' => $module['type'],
                'extension' => $module['extension'],
                'path_config' => $module['path_config'],

//                config content
                'current_config_json' => $module['pivot']['current_config_json'],
                'initial_config_json' => $module['pivot']['initial_config_json'],
                'initial_config_conf' => $module['pivot']['initial_config_conf'],
                'previous_config_conf' => $module['pivot']['previous_config_conf'],
            ]);
        }
    }
    private function saveModuleChanged (array $modules) : void
    {
        foreach ($modules as $module) {

            Module::updateOrCreate([
                'name' => $module['name'],
                'type' => $module['type'],
                'extension' => $module['extension'],
                'path_config' => $module['path_config'],

//                config content
                'current_config_json' => $module['servers']['0']['pivot']['current_config_json'],
                'initial_config_json' => $module['servers']['0']['pivot']['initial_config_json'],
                'initial_config_conf' => $module['servers']['0']['pivot']['initial_config_conf'],
                'previous_config_conf' => $module['servers']['0']['pivot']['previous_config_conf'],
            ]);
        }
    }
    public function syncDataToDatabase ($server, $allModule, $ModuleChanged)
    {
        $this->saveServerData($server);
        $this->saveModuleData($allModule);

//        only save module changed
        $this->saveModuleChanged($ModuleChanged);
    }
}
