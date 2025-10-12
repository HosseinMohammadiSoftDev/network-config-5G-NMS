<?php

namespace Modules\Server\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Modules\Server\Models\Module;
use Modules\Server\Models\SystemSetting;
use Modules\Server\Services\SyncData\AutoSyncData;
use Modules\Server\Services\SyncData\SeterDataServer;

class SyncModuleMiddelware
{
    /**
     * Handle an incoming request.
     */
    public function __construct(private SeterDataServer $seterDataServer){}

    public function handle(Request $request, Closure $next)
    {
        $systemSetting = SystemSetting::first()
            ? SystemSetting::first()
            : SystemSetting::create(['is_connected' => false]); //defalte


//        is not {connected
        if (!$this->isChackeConnection())
            return $next($request);


        if (Carbon::parse($systemSetting['last_connection_nms'])->lt(Carbon::now()->subMinutes(15))) {
            $this->seterDataServer->excludeModuleChangesBBU();
            AutoSyncData::handelChangedModuleThisBBU(Module::all(), 'return-connection-server');
        }


        $systemSetting
            ->update([
                'is_connected' => true,
                'last_connection_nms' => Carbon::now(),
            ]);


        return $next($request);
    }
    private function isChackeConnection  () : bool
    {
        $ip = env('NMS_UNIQUE_IP');
        exec("ping -c 1 -W 1 $ip", $output, $result);

        if ($result === 0) return true;

        return false;
    }
}
