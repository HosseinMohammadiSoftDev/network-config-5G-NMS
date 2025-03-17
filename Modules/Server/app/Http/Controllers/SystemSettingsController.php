<?php

namespace Modules\Server\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Modules\Server\Models\SystemSettings;
use App\Http\Controllers\Contract\ApiController;
use Illuminate\Support\Facades\Hash;
use Modules\Server\Http\Requests\FA2\Set2FAReqest;
use Modules\Server\Http\Requests\SystemStinge\AddAddressRequest;

class SystemSettingsController extends ApiController
{
    public function __construct()
    {

    }


    public function showAllAddress()
    {
        return response()->json(SystemSettings::select(['elk_address', 'zabbix_address'])->get()->toArray());
    }
    public function getStatus2FA ()
    {
        return response()->json(SystemSettings::select(['is_login_2FA'])->get()->toArray());
    }



    public function addOrUpdateAddress(AddAddressRequest $request)
    {
        $creadtioanle = $request->validated();

        $address = SystemSettings::first();

            if (!$address)
                $address = SystemSettings::create($creadtioanle);
            else
                $address->update($creadtioanle);

        return response()->json(['msg' => 'save address successfuly', 'address' => $address], 200);
    }
    public function set2FA (Set2FAReqest $request)
    {
        $creadtioanle = $request->validated();

        try {
            DB::beginTransaction();

            $systemSetting = SystemSettings::first();

                if (!$systemSetting)
                    $systemSetting = SystemSettings::create($creadtioanle);
                else
                    $systemSetting->update([
                        'is_login_2FA' => $creadtioanle['is_login_2FA'] ?? $systemSetting['is_login_2FA'],
                    ]);

            DB::commit();
                return response()->json(['success' => true, 'msg' => 'Settings have been successfully applied.'], 200);

        } catch (Exception $e) {
            DB::rollBack();
                return response()->json(['success' => false, 'msg' => 'An issue occurred in the application process.'], 422);
        }
    }
}
