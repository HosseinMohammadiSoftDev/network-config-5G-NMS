<?php

namespace Modules\Server\Services\SyncData;

use http\Exception\RuntimeException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Modules\Server\Models\Module;

class AutoSyncData
{
    public function __construct(){}

//      auto sync data
//          send change module to rru
    private static function HTTPService (mixed $module, string $action, ?Module $oldModuleData = null)
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json'
        ])->post(env('NMS_APP_DOMAIN') . 'auto-sync/receive-changed-module-bbu', [
            'module' => $module ?? null,
            'action' => $action,
            'old_module_data' => $oldModuleData ?? null
        ]);

//    dd($response->json());
        return $response->json();
    }
    private static function isConnectedRRU () : bool
    {
        $ip = env('NMS_UNIQUE_IP');
        exec("ping -c 1 -W 1 $ip", $output, $result);

        if ($result === 0)
            return true;

        return false;
    }
    public static function isExistsThisServerToRRU ()
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json'
        ])->get(env('NMS_APP_DOMAIN') . 'get-data-server');

        if ($response->failed())
            throw ValidationException::withMessages(['server' => 'RRU server Warning: ' . $response->json('message')]);

        return true;
    }
    public static function handelChangedModuleThisBBU (mixed $module, string $action, ?Module $oldModuleData = null) : void
    {
        try {

            if (!self::isConnectedRRU() && !$action === 'retunr-connection-server') {
                self::isExistsThisServerToRRU();

                $module->update(['is_updated' => true]);
                return;  // break as mothod
            }

            switch ($action) {
                case 'create' :
                    self::HTTPService($module, 'create');
                    break;

                case 'update' :
                    self::HTTPService($module, 'update', $oldModuleData);
                    break;

                case 'update-config' :
                    self::HTTPService($module, 'update-config', $oldModuleData);
                    break;

                case 'delete' :
                    self::HTTPService($module, 'delete');
                    break;

                case 'retunr-connection-server' :
                    self::HTTPService($module, 'retunr-connection-server');
                    break;

                default :
                    throw new \RuntimeException('undifinde action auto sync');
            }
        } catch (\Exception $e) {
            throw $e;
        }
    }




//      recive change module as rru
    public static function handelChangedModuleToRRU (array $module, string $action, ?array $oldModuleData = null)
    {
        $seterDataService = new SeterDataServer();

        switch ($action) {
            case 'create' :
                $seterDataService->createModule($module);
                    break;

            case 'update' :
                $seterDataService->updateModule($module, $oldModuleData);
                    break;

            case 'update-config' :
                $seterDataService->updateConfigModule($module);
                    break;

            case 'delete' :
                $seterDataService->deleteModule($module);
                    break;

            default :
                throw new \RuntimeException('undifinde action auto sync');
        }
    }
}
