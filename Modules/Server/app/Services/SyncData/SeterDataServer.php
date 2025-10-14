<?php

namespace Modules\Server\Services\SyncData;



use Modules\Server\Models\Module;
use Modules\Server\Models\Server;

class SeterDataServer
{
    public function __construct()
    {}


//    exclude module
    public function excludeModuleChangesBBU () : void
    {
        Module::where('is_updated', false)->update(['is_updated' => true]);
    }


//      defrent additional bbu module deleted
    private function deletedBBUModules(array $additionalBBuModuleName) : void
    {
        Module::whereIn('name', $additionalBBuModuleName)->delete();
    }
    public function defModule ($RRUModule) : void
    {
        $filteredModules = collect($RRUModule)
            ->pluck('modules')
            ->flatten(1)
            ->map(function ($module) {
                return $module['name'];
            })
            ->all();

        $BBUModules = Module::pluck('name')->toArray();

        $deletedModuleAsBBU = array_diff($BBUModules, $filteredModules);

        $this->deletedBBUModules($deletedModuleAsBBU);
    }


//    save data to sqlite bbu
    private function saveServerData ($server) : void
    {
        Server::updateOrCreate(
            ['ip' => $server['ip']],
            ['name' =>  $server['name'],
            'ip'   =>  $server['ip'],
            'is_down' =>  $server['is_down']]
        );
    }
    private function saveModuleData (array $modules) : void
    {
        foreach ($modules[0]['modules'] as $module) {

             Module::updateOrCreate([
                 'name' => $module['name']
             ],[
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
            ],[
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









//      save auto sync data
    public function createModule (array $module)
    {
        Module::updateOrCreate([
            'name'        => $module['name']
        ],[
            'name'        => $module['name'],
            'type'        => $module['type'],
            'extension'   => $module['extension'],
            'path_config' => $module['path_config'],

//                config content
            'current_config_json'  => $module['servers'][0]['pivot']['current_config_json'],
            'initial_config_json'  => $module['servers'][0]['pivot']['initial_config_json'],
            'initial_config_conf'  => $module['servers'][0]['pivot']['initial_config_conf'],
            'previous_config_conf' => $module['servers'][0]['pivot']['previous_config_conf'],
        ]);
    }
    public function updateModule (array $module, array $oldModuleData)
    {
        Module::where('name', $oldModuleData['name'])
            ->update([
//                update module data
                'name'        => $module['name'],
                'type'        => $module['type'],
                'extension'   => $module['extension'],
                'path_config' => $module['path_config'],

//                  update config module
                'initial_config_json'  => $module['servers'][0]['pivot']['initial_config_json'],
                'previous_config_json' => $module['servers'][0]['pivot']['previous_config_json'] ?? null,
                'current_config_json'  => $module['servers'][0]['pivot']['current_config_json'],
                'initial_config_conf'  => $module['servers'][0]['pivot']['initial_config_conf'],
                'previous_config_conf' => $module['servers'][0]['pivot']['previous_config_conf'],
            ]);

    }
    public function updateConfigModule (array $module)
    {
        Module::where('name', $module['name'])
            ->update([

//                update config module
                'initial_config_json'  => $module['servers'][0]['pivot']['initial_config_json'],
                'previous_config_json' => $module['servers'][0]['pivot']['previous_config_json'] ?? null,
                'current_config_json'  => $module['servers'][0]['pivot']['current_config_json'],
                'initial_config_conf'  => $module['servers'][0]['pivot']['initial_config_conf'],
                'previous_config_conf' => $module['servers'][0]['pivot']['previous_config_conf']
            ]);
    }
    public function deleteModule (array $module)
    {
        Module::where('name', $module['name'])
            ->delete();
    }
}
