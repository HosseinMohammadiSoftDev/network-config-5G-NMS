<?php

namespace Modules\Server\Http\Controllers;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Modules\Server\Http\Requests\NmsServerDataRequest;
use Modules\Server\Models\SystemSetting;

class SystemSettingController extends Controller
{
    public function __construct()
    {}


    public function getSystemSetting ()
    {
        $systemSetting = SystemSetting::first();

        return response()->json(['success' => true, 'data' => [
            'nms_server_ip' => $systemSetting->nms_server_ip,
            'is_connected' =>  $systemSetting->is_connected,
            'last_connection_nms' => Carbon::parse($systemSetting->last_connection_nms)->toIso8601String(),
            'created_at' => $systemSetting->created_at,
            'updated_at' => $systemSetting->updated_at,
        ]]);
    }
    public function nmsServerData (NmsServerDataRequest $request)
    {
        $credantials = $request->validated();

        $systemSetting = tap(SystemSetting::first(), function ($setting) use ($credantials) {
            if ($setting)
                $setting->update(['nms_server_ip' => $credantials['nms_ip']]);

        }) ?? SystemSetting::create(['nms_server_ip' => $credantials['nms_ip']]);


        return response()->json(['success'=>true, 'msg' => 'saved ip nms server successfully', 'data' => $systemSetting]);
    }
}
