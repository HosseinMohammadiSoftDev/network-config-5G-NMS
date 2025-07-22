<?php

namespace Modules\Server\Services\SyncData;

use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Modules\Server\Models\Server;

class GeterDataService
{
    public function __construct(
        private SeterDataService $seterDataService,
    ){}


    public function getDataAllModulesBBU (string $bbuAppDomain)
    {
        $response = Http::withHeaders([
            'accept' => 'application/json',
        ])->get($bbuAppDomain . 'get-data-modules-bbu');

        if ($response->failed())
            throw ValidationException::withMessages(['module' => $response->json('message')]);

        return $response->json('data');
    }
    public function getDataModuleChangedBBU (string $bbuAppDomain)
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json'
        ])->get($bbuAppDomain . 'get-data-module-changed-bbu');

        if ($response->failed())
            throw ValidationException::withMessages(['module' => $response->json('message')]);


        return $response->json('data');
    }
    public function callExcludeModuleChangesBBU (string $bbuAppDomain) : void
    {
        Http::withHeaders([
            'Accept' => 'application/json'
        ])->get($bbuAppDomain . 'exclude-module-changes-bbu');
    }


//    sync bbu record {server, modules, changeModule}
    public function syncData (Server $server)
    {
        $bbuAppDomain = 'http://'. $server['ip'] . ':8000/api/';

        $allModulesBBU = $this->getDataAllModulesBBU($bbuAppDomain);

        $moduleChangedBBU = $this->getDataModuleChangedBBU($bbuAppDomain);

        $this->seterDataService->syncDataToDatabase($server, $moduleChangedBBU, $allModulesBBU);

        $this->callExcludeModuleChangesBBU($bbuAppDomain);

        return response()->json(['success' => true, 'msg' => 'sync data successFuly']);

    }
}
