<?php

namespace Modules\Server\Services\SyncData;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Modules\Server\Models\Module;
use Modules\Server\Models\Server;
use phpseclib3\File\ASN1\Maps\EncryptedData;

class SeterDataService
{
    public function __construct()
    {}

//    send data to BBU
    public function getDataServer ()
    {
        return Server::where('ip', request()->ip())->first()
            ?? throw ValidationException::withMessages(['server' => 'No server found witn your IP address.']);
    }
    public function getDataServerModule ($serverIp)
    {
        return Server::with(['modules'])->where('ip', $serverIp)->get();
    }
    public function getDataModuleChangrd ($serverIp)
    {
        return Module::with(['servers'])
            ->whereHas('servers', function ($query) use ($serverIp) {
                return $query->where('servers.ip',  $serverIp)->where('is_updated', true);
            })->get()
            ->values();
    }






//      save auto sync data
    public function createModule (Server $server, array $module)
    {
        $moduleUpdated = Module::create([
            'name' => $module['name'],
            'type' => $module['type'],
            'extension' => $module['extension'],
            'path_config' => $module['path_config'],
        ]);


        $configData = [
            'initial_config_json' => $module['initial_config_json'],
            'previous_config_json' => $module['previous_config_json'] ?? null,
            'current_config_json' => $module['current_config_json'],
            'initial_config_conf' => $module['initial_config_conf'],
            'previous_config_conf' => $module['previous_config_conf']
        ];


//            update config module
        $exists = $moduleUpdated->servers()
            ->wherePivot('server_id', $server->id)
            ->exists();

        if ($exists)
            $moduleUpdated->servers()->updateExistingPivot($server->id, $configData, false);
        else
            $moduleUpdated->servers()->attach($server->id, $configData);
    }
    public function updateModule (Server $server, array $module, array $oldModuleData)
    {
        $moduleServer = Module::with('servers')
            ->where('name', $oldModuleData['name'])
            ->whereHas('servers', function ($servers) use ($server) {
                $servers->where('servers.id', $server['id']);
            })
            ->first();


//        update config module
        if ($moduleServer) {
            $moduleServer->servers()
                ->where('servers.id', $server['id'])
                ->update([
                    'initial_config_json' => $module['initial_config_json'],
                    'previous_config_json' => $module['previous_config_json'] ?? null,
                    'current_config_json' => $module['current_config_json'],
                    'initial_config_conf' => $module['initial_config_conf'],
                    'previous_config_conf' => $module['previous_config_conf'],
                ]);
        }


//        update module
        $moduleServer
            ->update([
                'name' => $module['name'],
                'type' => $module['type'],
                'extension' => $module['extension'],
                'path_config' => $module['path_config'],
            ]);
    }
    public function updateConfigModule (Server $server, array $module)
    {
        $moduleUpdated = Module::with('servers')
            ->where('name', $module['name'])
                ->whereHas('servers', function ($servers) use ($server) {
                $servers->where('servers.id', $server['id']);
            })
            ->first();


        $configData = [
            'initial_config_json' => $module['initial_config_json'],
            'previous_config_json' => $module['previous_config_json'] ?? null,
            'current_config_json' => $module['current_config_json'],
            'initial_config_conf' => $module['initial_config_conf'],
            'previous_config_conf' => $module['previous_config_conf']
        ];

//            update config module
        $moduleUpdated->servers()->updateExistingPivot($server->id, $configData, false); // update pivot
    }
    public function deleteModule  (array $module)
    {
        Module::where('name', $module['name'])
            ->delete();
    }

//    return Connection
    public function defrenModulesAndDeletedAdditionalModuleToRRU (array $BBUModulesNmae, Server $server) : void
    {
        $RRUModule = Module::pluck('name')->toArray();

        $additionalRRUModuleNmae = array_diff($RRUModule, $BBUModulesNmae);

        Module::with(['servers'])
            ->whereIn('name', $additionalRRUModuleNmae)
            ->delete();
    }
    private function saveModuleChanged (Server $server, array $modules) : void
    {
        foreach ($modules as $module) {
            $moduleUpdated = Module::updateOrCreate([
                'name' => $module['name'],
            ],[
                'name' => $module['name'],
                'type' => $module['type'],
                'extension' => $module['extension'],
                'path_config' => $module['path_config'],
            ]);


            $configData = [
                'initial_config_json' => $module['initial_config_json'],
                'previous_config_json' => $module['previous_config_json'] ?? null,
                'current_config_json' => $module['current_config_json'],
                'initial_config_conf' => $module['initial_config_conf'],
                'previous_config_conf' => $module['previous_config_conf']
            ];




//            update config module
            $exists = $moduleUpdated->servers()
                ->wherePivot('server_id', $server->id)
                ->exists();

            if ($exists)
                $moduleUpdated->servers()->updateExistingPivot($server->id, $configData, false);
            else
                $moduleUpdated->servers()->attach($server->id, $configData);
        }
    }
    public function returnConnectionServer (Server $server, array $modules)
    {
        $this->saveModuleChanged($server, $modules);

        $this->defrenModulesAndDeletedAdditionalModuleToRRU(collect($modules)->pluck('name')->toArray(), $server);
    }
}
