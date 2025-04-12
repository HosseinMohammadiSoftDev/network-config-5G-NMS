<?php

namespace Modules\Server\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Modules\Server\Http\Requests\SystemSetig\SetConfigConnectionSMSRequest;
use Modules\Server\Models\SystemSettings;
use App\Http\Controllers\Contract\ApiController;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Modules\Server\Http\Requests\FA2\Set2FAReqest;
use Modules\Server\Http\Requests\SystemStinge\AddAddressRequest;
use Modules\Server\Http\Requests\SystemStinge\SetLoginBySMSRequest;

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



        // SMS setinge
    public function setLoginBySMS (SetLoginBySMSRequest $request)
    {
        $creadtioanle = $request->validated();

        try {
            DB::beginTransaction();

            $systemSetting = SystemSettings::first();

                if (!$systemSetting)
                    $systemSetting = SystemSettings::create($creadtioanle);
                else
                    $systemSetting->update([
                        'is_login_sms' => $creadtioanle['is_login_sms'] ?? $systemSetting['is_login_sms'],
                    ]);

            DB::commit();
                return response()->json(['success' => true, 'msg' => 'Settings have been successfully applied.'], 200);

        } catch (Exception $e) {
            DB::rollBack();
                return response()->json(['success' => false, 'msg' => 'An issue occurred in the application process.'], 422);
        }
    }
    public function getLoginBySMS ()
    {
        return response()->json(SystemSettings::select(['is_login_sms'])->get()->toArray());
    }


    public function setConfigConnectionSMS (SetConfigConnectionSMSRequest $request)
    {
        $creadtioanle = $request->validated();

        try {
            DB::beginTransaction();

            $systemSetting = SystemSettings::first();

                if (!$systemSetting)
                    $systemSetting = SystemSettings::create($creadtioanle);
                else
                    $systemSetting->update([
                        'config_connection_sms' => Crypt::encrypt($creadtioanle['connection-data']) ?? $systemSetting['config_connection_sms'],
                    ]);

            DB::commit();
                return response()->json(['success' => true, 'msg' => 'Settings have been successfully applied.'], 200);

        } catch (Exception $e) {
            DB::rollBack();
                return response()->json(['success' => false, 'msg' => 'An issue occurred in the application process.'], 422);
        }
    }
    public function getConfinConnectionSMS ()
    {
        $systemSeting = SystemSettings::first();
            return response()->json(['success' => true, 'data' => Crypt::decrypt($systemSeting['config_connection_sms'])], 200);
    }
}
