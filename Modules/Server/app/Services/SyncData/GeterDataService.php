<?php

namespace Modules\Server\Services\SyncData;


use http\Client\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Modules\Server\Models\Module;
use Modules\Server\Models\Server;

class GeterDataService
{
    public function __construct(
        private SeterDataServer $seterDataServer)
    {}

    public function getDataServer ()
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json'
        ])->get(env('NMS_IP') . 'get-data-server');

        if ($response->failed())
            throw ValidationException::withMessages(['server' => $response->json('message')]);


        return $response->json();
    }
    public function getDataModules ($serverId)
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json'
        ])->get(env('NMS_IP') . 'get-data-modules/' .  $serverId);

        if ($response->failed())
            throw ValidationException::withMessages(['module' => $response->json('message')]);

        return $response->json();
    }
    public function getDataModuleChanged ($serverId)
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json'
        ])->get(env('NMS_IP') . 'get-data-module-changed/' .  $serverId);

        if ($response->failed())
            throw ValidationException::withMessages(['module' => $response->json('message')]);


        return $response->json();
    }

//    sync bbu record {server, modules, changeModule}
    public function syncData ()
    {
        try {

            $server = $this->getDataServer();

            $allModule = $this->getDataModules($server['data']['id']);
            $ModuleChanged = $this->getDataModuleChanged($server['data']['id']);

            $this->seterDataServer->syncDataToDatabase($server['data'], $allModule['data'], $ModuleChanged['data']);

            return response()->json(['success' => true, 'msg' => 'sync data successFuly']);

        } catch (\Exception $e) {
            throw $e;
        }
    }
}
