<?php

namespace Modules\Server\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Modules\Server\Http\Requests\AutoSync\ReceiveChangeModuleBBURequest;
use Modules\Server\Models\Module;
use Modules\Server\Models\Server;
use Modules\Server\Services\SyncData\AutoSyncData;
use Modules\Server\Services\SyncData\GeterDataService;
use Modules\Server\Services\SyncData\SeterDataService;

class SyncServerDataController extends Controller
{
    public function __construct(
        private SeterDataService $seterDataService,
        private GeterDataService  $geterDataService
    ){}


//    BBU geter data (get data as BBU)
    public function syncData ($serverId)
    {
        $server = Server::find($serverId);
            if (! $server)
                throw ValidationException::withMessages(['server' => 'server id not invalid']);

        try {

            return $this->geterDataService->syncData($server);

        } catch (\Exception $e) {
            throw $e;
        }
    }


//      send data to BBU server endPoint
    public function getDataServer ()
    {
        try {

            return response()->json(['success' => true, 'data' => $this->seterDataService->getDataServer()]);

        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function getDataModules ($serverIp)
    {
        try {

            return response()->json([
                'success' => true,
                'data' => $this->seterDataService->getDataServerModule($serverIp)
            ]);
        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function getDataModuleChanged ($serverIp)
    {
        return response()->json([
            'success' => true,
            'data' => $this->seterDataService->getDataModuleChangrd($serverIp)
        ]);
    }


    public function excludeModuleChangesNMS ()
    {
        return Module::where('is_updated', true)->update(['is_updated' => false]);
    }





//    auto sync data
    public function receiveChangeModuleBBU (ReceiveChangeModuleBBURequest $request)
    {
        $credentials = $request->validated();

        return AutoSyncData::handelChangeModuleBBU($credentials['module'],  $credentials['action'], $credentials['old_module_data'] ?? null);
    }
}
