<?php

namespace Modules\Server\Services\SyncData;

use http\Exception\RuntimeException;
use Illuminate\Support\Facades\Http;
use Modules\Server\Models\Module;

class AutoSyncData
{
    public function __construct()
    {}



    private static function HTTPService (Module $module, string $action, Module $oldModuleData = null)
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json'
        ])->post(env('NMS_APP_DOMAIN') . 'auto-sync/receive-changed-module-bbu', [
            'module' => $module,
            'action' => $action,
            'old_module_data' => $oldModuleData ?? null
        ]);

//dd($response->json());
        return $response->json();
    }
    private static function isConnectedRRU () : bool
    {
        $connection = @fsockopen(env('NMS_UNIQUE_IP'), 22, $errno, $errstr, 3);
        if (! $connection)
            return false;


        fclose($connection);
            return true;
    }
    public static function handelChangedModuleThisBBU (Module $module, string $action, Module $oldModuleData = null) : void
    {
        if (! self::isConnectedRRU()) {
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

            default :
                throw new \RuntimeException('undifinde action auto sync');
        }
    }





    public static function handelChangedModuleToRRU ()
    {

    }
}
