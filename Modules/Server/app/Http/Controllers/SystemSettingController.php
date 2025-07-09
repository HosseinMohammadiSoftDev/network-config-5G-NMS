<?php

namespace Modules\Server\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Server\Http\Requests\NmsServerDataRequest;
use Modules\Server\Models\SystemSetting;

class SystemSettingController extends Controller
{
    public function __construct()
    {}


    public function getSystemSetting ()
    {
//        dd(config('nms_ip'));
        return response()->json(['success' => true, 'data' => SystemSetting::first()]);
    }
    public function nmsServerData (NmsServerDataRequest $request)
    {
        $credantials = $request->validated();

        $systemSetting = SystemSetting::updateOrCreate(['nms_server_ip' => $credantials['nms_ip']]);

        return response()->json(['success'=>true, 'msg' => 'saved ip nms server successfully', 'data' => $systemSetting]);
    }
}
