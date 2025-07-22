<?php

namespace Modules\Server\Services\SyncData;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use Modules\Server\Models\Module;
use Modules\Server\Models\Server;

class ChackeSyncModule
{
    public function __construct()
    {}



    private static function HTTPService (Server $server) : void
    {
        Http::withHeaders([
            'Accept' => 'application/json'
        ])->post('http://' . $server['ip'] . ':8000/api/' . 'auto-sync/send-module-change-to-rru');
    }
    private static function isChackeConnection  (Server $server) : bool
    {
        $ip = $server['ip'];
        exec("ping -c 1 -W 1 $ip", $output, $result);

        if ($result === 0)
            return true;

        return false;
    }
    public static function Validate (Server $server)
    {
//        is not connected
        if (!self::isChackeConnection($server))
            return; // exit in class


        if (\Carbon\Carbon::createFromTimestamp($server['last_connection_nms'])->lt(Carbon::now()->subMinutes(15)))
            self::HTTPService($server);


//        update time connection
        $server->update(['last_connection' => Carbon::now()]);
        return; //exit in class
    }
}
