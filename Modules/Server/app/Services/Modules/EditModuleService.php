<?php

namespace Modules\Server\Services\Modules;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Modules\Server\Helpers\SshHelper;
use Modules\Server\Models\Module;
use Modules\Server\Models\Server;

class EditModuleService
{
    public function updateConfigModules (Module $module, array $serverIds, $jsonConfig, string $confContent, Request $request)
    {
        $moduleConfig  = json_decode($jsonConfig, true);
        $encodedConfig = json_encode($moduleConfig, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        foreach ($serverIds as $serverId) {
            $server       = Server::find($serverId);
            $serverModule = $module->servers()->where('server_id', $serverId)->first();

            if ($serverModule) {

                $pivotData = $serverModule->pivot;
                $pivotData->previous_config_json = $pivotData->current_config_json;
                $pivotData->initial_config_json  = $encodedConfig;
                $pivotData->current_config_json  = $encodedConfig;

                $pivotData->initial_config_conf  = $confContent;
                $pivotData->previous_config_conf = $confContent;

                $pivotData->save();
            }

            $this->sendConfigToServer($request['username'], $request['password'],
                $module, $confContent, $server);
        }
    }
    private function addModules(Module $module, array $serverIds, Request $request, $configContent)
    {
        $pivotData = $module->servers()->first()->pivot;

        foreach ($serverIds as $serverId) {
            $server = Server::find($serverId);

            if (!$module->servers->contains($serverId)) {
                $module->servers()->attach($serverId, [
                    'initial_configـjson' => $pivotData->initial_config_json,
                    'current_config_json' => $pivotData->initial_config_json,
                ]);
            }

//      conf updator
            $this->sendConfigToServer( $request['username'], $request['password'],
                $module, $configContent, $server);

        }
    }
    private function deleteModules(array $serverIds, Module $module, $request, $configContent)
    {
        foreach ($serverIds as $serverId) {

            $server = Server::find($serverId);

            $this->sendConfigToServer( $request['username'], $request['password'],
                $module, $configContent, $server);

            $module->servers()->detach($serverId);

        }
    }
    public function syncModuleWithServers(Module $module, array $serverIds, $request)
    {
        if ($request->file('config_file'))
            $configContent = file_get_contents($request->file('config_file'));
        else
            $configContent = $module['previous_config_conf'];


        $existingServerIds = $module->servers->pluck('id')->toArray();

        $serversToDelete = array_diff($existingServerIds, $serverIds);
        $serversToAdd = array_diff($serverIds, $existingServerIds);


        $this->addModules($module, $serversToAdd, $request, $configContent);
        $this->deleteModules($serversToDelete, $module, $request, $configContent);

    }


    private function sendConfigToServer(string $username, string $password, Module $module, string $confContent, Server $server)
    {
        if ($server['is_down'] == Server::OFF) throw ValidationException::withMessages(['server' => 'this server: ' . $server['name'] .' is off']);

        if (!$module['path_config']) throw ValidationException::withMessages(['path_config' => 'You did not specify a configuration address config']);


        $sshHelper = new sshHelper($server, $username, $password);

        // update module command
        $commandUpdateFileModule = 'echo ' . escapeshellarg($confContent)
            . ' > ' . $module['path_config'] . $module['name'] . '.' . $module['extension'];

        return $sshHelper->runCommand($commandUpdateFileModule);
    }


    /**
     * @param string $username
     * @param string $password
     * @param Server $server
     * @return void
     */
    public function updateConfigNameAsServer (string $username, string $password, Server $server)
    {

    }
    public function updateConfigPathAsServer (string $username, string $pasword, Server $server)
    {

    }
}
