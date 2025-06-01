<?php

namespace Modules\Server\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Http\Controllers\Contract\ApiController;
use Modules\Server\Http\Requests\Modules\CreateModulesRequest;

class ModuleController extends ApiController
{
        // show Config in database
    public function showConfigModule (Request $request, $serverId, $moduleId)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->get(env('NMS_IP') . "show-config-module/{$serverId}/{$moduleId}");
    }
    public function showAllServiseAndModulesInServer (Request $request, $serverId)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->get(env('NMS_IP') . "show-all-servies-and-modules/{$serverId}");
    }

    public function ShowAllModules (Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->get(env('NMS_IP') . "show-all-modules");
    }



        // create New Module And Upload File .Yaml Convert to Json Upload To database
    public function createModule (Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->post(env('NMS_IP') . "create-module", [
                'name' => $request['name'],
                'type' => $request['type'],
                'server_id' => $request['server_id'],
                'config_file' => $request['config_file'],
                'username' => $request['username'],
                'password' => $request['password'],
            ]);
    }
    public function deleteModule (Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->delete(env('NMS_IP') . 'delete-module', [
                'module_id' => $request['module_id'],
            ]);
    }



        // update Config Module
    public function updateConfigModule (Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->post(env('NMS_IP') . 'update-config-module', [
                'server_id' => $request['server_id'],
                'module_id' => $request['module_id'],
                'data' => $request['data'],
                'servers' => $request['servers'],
                'username' => $request['username'],
                'password' => $request['password'],
            ]);
    }


        // delete config module
    public function deleteConfigModule (Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->delete(env('NMS_IP') . 'delete-config-module', [
                'module_id' => $request['module_id'],
                'server_id' => $request['server_id'],
                'path_config' => $request['path_config'],
                'username' => $request['username'],
                'password' => $request['password'],
            ]);
    }



        // edit config module
    public function editModule(Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->post(env('NMS_IP') . 'edit-module', [
                'module_id' => $request['module_id'],
                'name' => $request['name'] ?? null,
                'type' => $request['type'] ?? null,
                'config_file' => $request['config_file'] ?? null,
                'server_ids' => $request['server_ids'] ?? null,
                'username' => $request['username'],
                'password' => $request['password'],
            ]);
    }




        // expert file
    public function expertModuleFileIsServer (Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->post(env('NMS_IP') . 'export-module-file', [
                'module_id' => $request['module_id'],
                'server_id' => $request['server_id'],
                'username' => $request['username'],
                'password' => $request['password'],
            ]);
    }



        // service module
    public function restartServiceModule (Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->post(env('NMS_IP') . 'restart-service-config', [
                'module_id' => $request['module_id'],
                'server_id' => $request['server_id'],
                'username' => $request['username'],
                'password' => $request['password'],
            ]);
    }
    public function startServiceModule (Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->post(env('NMS_IP') . 'start-service-config', [
                'module_id' => $request['module_id'],
                'server_id' => $request['server_id'],
                'username' => $request['username'],
                'password' => $request['password'],
            ]);
    }
    public function stopServiceModule (Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->post(env('NMS_IP') . 'stop-service-config', [
                'module_id' => $request['module_id'],
                'server_id' => $request['server_id'],
                'username' => $request['username'],
                'password' => $request['password'],
            ]);
    }
    public function statusServiceModule (Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->post(env('NMS_IP') . 'status-service-config', [
                'module_id' => $request['module_id'],
                'server_id' => $request['server_id'],
                'username' => $request['username'],
                'password' => $request['password'],
            ]);
    }




        // Undo Config module
    public function undoConfigModule (Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->post(env('NMS_IP') . 'undo-module-config', [
                'module_id' => $request['module_id'],
                'server_id' => $request['server_id'],
                'username' => $request['username'],
                'password' => $request['password'],
            ]);
    }
    public function undoToInitialConfigModule (Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->post(env('NMS_IP') . 'undo-to-initial-config-modules', [
                'module_id' => $request['module_id'],
                'server_id' => $request['server_id'],
                'username' => $request['username'],
                'password' => $request['password'],
            ]);
    }

}
