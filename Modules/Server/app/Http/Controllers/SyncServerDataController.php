<?php

namespace Modules\Server\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Server\Services\SyncData\GeterDataService;
use Modules\Server\Services\SyncData\SeterDataServer;

class SyncServerDataController extends Controller
{
    public function __construct(
        private GeterDataService $geterDataService,
        private SeterDataServer  $seterDataServer
    ){}

//    RRU geter data
    public function syncData ()
    {
        try {

            return $this->geterDataService->syncData();

        } catch (\Exception $e) {
            throw $e;
        }
    }

//      send data to RRU
    public function getDataModulesNameBBU ()
    {
        try {

            return response()->json([
                'success' => true,
                'data' => $this->geterDataService->getModuleNameBBU()
            ]);
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function getDataModules ()
    {
        try {

            return response()->json([
                'success' => true,
                'data' => $this->geterDataService->getAllModulesBBU()
            ]);
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function getDataModuleChangedBBU ()
    {
        try {

            return response()->json([
                'success' => true,
                'data' => $this->geterDataService->getDataModuleChangrdBBU()
            ]);
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function excludeModuleChangesBBU ()
    {
        $this->seterDataServer->excludeModuleChangesBBU();
    }
}
