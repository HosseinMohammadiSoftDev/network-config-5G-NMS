<?php

namespace Modules\Server\Services\SyncData;

use Carbon\Carbon;
use http\Exception\RuntimeException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Modules\Server\Models\Module;
use Modules\Server\Models\SystemSetting;

class AutoSyncData
{
    private static $appDomainNMS;
    private static $ipNMS;

    private static function init ()
    {
        $systemSetting = SystemSetting::first()
            ? SystemSetting::first()
            : SystemSetting::create([
                'nms_server_ip' => env('NMS_UNIQUE_IP'),
                'is_connected' => true,
                'last_connection_nms' => Carbon::now()->subMinutes(15)
            ]);

        self::$appDomainNMS = env('NMS_APP_DOMAIN');
        self::$ipNMS =  env('NMS_UNIQUE_IP');
    }


    /**
     * @descreption :
     *      send module changes (if connect by nms server )
     *
     * @param mixed $module
     * @param string $action
     * @param Module|null $oldModuleData
     * @return array|mixed
     * @throws \Illuminate\Http\Client\ConnectionException
     */
    private static function HTTPService (mixed $module, string $action, ?Module $oldModuleData = null)
    {
        self::init();

        $response = Http::withHeaders([
            'Accept' => 'application/json'
        ])->post(self::$appDomainNMS . env('NMS_END_POINT'), [
            'module' => $module ?? null,
            'action' => $action,
            'old_module_data' => $oldModuleData ?? null
        ]);

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

            if (!self::isConnectedRRU() && !$action === 'return-connection-server') {
                self::isExistsThisServerToRRU();

                $module->update(['is_updated' => true]);
                return;  // EXIT
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

                case 'return-connection-server' :
                    self::HTTPService($module, 'return-connection-server');
                    break;

                default :
                    throw new \RuntimeException('undefined action auto sync');
            }
        } catch (\Exception $e) {
            throw $e;
        }
    }




//      recive change module as rru (save shcanges module this server as rru)
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
