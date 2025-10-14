<?php

namespace Modules\Server\Services\SyncData;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Modules\Server\Models\Module;
use Modules\Server\Models\Server;
use PHPUnit\Event\RuntimeException;

class AutoSyncData
{
    public function __construct() {}


//          recive change module as bbu
    public static function handelChangeModuleBBU(array $module, string $action, ?array $oldModuleData = null): void
    {
        $seterDataService = new SeterDataService();
        $server = $seterDataService->getDataServer();

        switch ($action) {
            case 'create' :
                $seterDataService->createModule($server, $module);
                    break;

            case 'update' :
               $seterDataService->updateModule($server, $module, $oldModuleData);
                    break;

            case 'update-config' :
                $seterDataService->updateConfigModule($server, $module);
                    break;

            case 'delete' :
                $seterDataService->deleteModule($module);
                    break;

            case 'return-connection-server' :
                $seterDataService->returnConnectionServer($server, $module);
                    break;

            default :
                throw new RuntimeException('undifinde action to save change module bbu');
        }
    }





//          send change module as bbu
    private static function HTTPService (Server $server, $module, string $action, Module $oldModuleData = null)
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json'
        ])->post('http://' . $server['ip'] . env('BBU_PATH') . 'auto-sync/receive-changed-module-rru', [
            'module' => $module,
            'action' => $action,
            'old_module_data' => $oldModuleData ?? null
        ]);

        return $response->json();
    }
    private static function isConnectedRRU (Server $server) : bool
    {
        $connection = @fsockopen($server['ip'], 22, $errno, $errstr, 3);
        if (! $connection)
            return false;


        fclose($connection);
        return true;
    }
    public static function sendModuleChangeToBBU (Server $server, $module, string $action, Module $oldModuleData = null) : void
    {
        if (! self::isConnectedRRU($server)) {
            $module->update(['is_updated' => true]);
            return;  // EXIT
        }


        switch ($action) {
            case 'create' :
                self::HTTPService($server, $module, 'create');
                    break;

            case 'update' :
                self::HTTPService($server, $module, 'update', $oldModuleData);
                    break;

            case 'update-config' :
                self::HTTPService($server, $module, 'update-config', $oldModuleData);
                    break;

            case 'delete' :
                self::HTTPService($server, $module, 'delete');
                    break;

            default :
                throw new \RuntimeException('undifinde action auto sync');
        }
    }
}
