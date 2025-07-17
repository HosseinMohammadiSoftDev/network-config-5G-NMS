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


//    get data as RRU
    public function getDataServer ()
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json'
        ])->get(env('NMS_APP_DOMAIN') . 'get-data-server');

        if ($response->failed())
            throw ValidationException::withMessages(['server' => $response->json('message')]);


        return $response->json();
    }
    public function getDataModules ($serverIp)
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json'
        ])->get(env('NMS_APP_DOMAIN') . 'get-data-modules/' .  $serverIp);

        if ($response->failed())
            throw ValidationException::withMessages(['module' => $response->json('message')]);

        return $response->json();
    }
    public function getDataModuleChanged ($serverIp)
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json'
        ])->get(env('NMS_APP_DOMAIN') . 'get-data-module-changed/' .  $serverIp);

        if ($response->failed())
            throw ValidationException::withMessages(['module' => $response->json('message')]);


        return $response->json();
    }
    public function callExcludeModuleChangesNMS () : void
    {
        Http::withHeaders([
            'Accept' => 'application/json'
        ])->get(env('NMS_APP_DOMAIN') . 'exclude-module-changes-nms');
    }

//    sync bbu record {server, modules, changeModule}
    public function syncData ()
    {
        try {

            $server = $this->getDataServer();

            $allModule = $this->getDataModules($server['data']['ip']);
            $ModuleChanged = $this->getDataModuleChanged($server['data']['ip']);

            $this->seterDataServer->syncDataToDatabase($server['data'], $allModule['data'], $ModuleChanged['data']);

//             defrent module
            $this->seterDataServer->defModule($allModule['data']);

            $this->callExcludeModuleChangesNMS();

            return response()->json(['success' => true, 'msg' => 'sync data successFuly']);

        } catch (\Exception $e) {
            throw $e;
        }
    }



//   send data to RRU
    public function getModuleNameBBU ()
    {
        return Module::pluck('name');
    }
    public function getAllModulesBBU ()
    {
        return Module::all();
    }
    public function getDataModuleChangrdBBU ()
    {
        return Module::where('is_updated', true)
            ->get()
            ->values();
    }

}
