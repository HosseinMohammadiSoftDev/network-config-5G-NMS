<?php

namespace Modules\Server\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Validation\ValidationException;
use Modules\Server\Http\Requests\Capcha\SetStatusReCapchaRequest;
use Modules\Server\Models\Server;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use Modules\Server\Models\SystemSettings;
use App\Http\Controllers\Contract\ApiController;
use Modules\Server\Http\Requests\FA2\Set2FAReqest;
use Modules\Server\Http\Requests\SystemStinge\AddAddressRequest;
use Modules\Server\Http\Requests\SystemStinge\SetLoginBySMSRequest;
use Modules\Server\Http\Requests\SystemSetig\SetConfigConnectionSMSRequest;
use Modules\Server\Http\Requests\SystemSettinge\SetOrgainalVMIpRequest;

class SystemSettingsController extends ApiController
{
    public function __construct()
    {

    }

    public function getMotherboard ()
    {
        $serverIds = Server::whereIn(
            'name',
            Auth::user()->serverPermission()
                ->map(fn($name) => str_replace('server/', '', $name))
        )->pluck('id');



        return response()->json([
            'success' => true,
            'data' => [
                'ip_address' => request()->ip(),
                'this_motherboard' => [
                    'id' => Auth::user()->server?->id,
                    'name' => Auth::user()->server?->name,
                    'ip' => Auth::user()->server?->ip,
                    'is_down' => Auth::user()->server?->is_down
                ],
                'this_motherboard_permissions' => [
                    'permission_name' => Auth::user()->serverPermission(),
                    'permission_server_ids' => $serverIds
                ]
            ]
        ], 200);
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

            !$address
                ? $address = SystemSettings::create($creadtioanle)
                : $address->update($creadtioanle);


        return response()->json(['msg' => 'save address successfuly', 'address' => $address], 200);
    }
    public function set2FA (Set2FAReqest $request)
    {
        $creadtioanle = $request->validated();

        try {
            DB::beginTransaction();

            $systemSetting = SystemSettings::first();

                !$systemSetting
                    ? $systemSetting = SystemSettings::create($creadtioanle)
                    : $systemSetting->update(['is_login_2FA'
                        => $creadtioanle['is_login_2FA'] ?? $systemSetting['is_login_2FA']]);


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

                !$systemSetting
                    ? $systemSetting = SystemSettings::create($creadtioanle)
                    : $systemSetting->update(['is_login_sms'
                        => $creadtioanle['is_login_sms'] ?? $systemSetting['is_login_sms']]);


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

                !$systemSetting
                    ? $systemSetting = SystemSettings::create($creadtioanle)
                    : $systemSetting->update(['config_connection_sms'
                        => Crypt::encrypt($creadtioanle['connection-data']) ?? $systemSetting['config_connection_sms']]);


            DB::commit();
                return response()->json(['success' => true, 'msg' => 'Settings have been successfully applied.'], 200);

        } catch (Exception $e) {
            DB::rollBack();
                return response()->json(['success' => false, 'msg' => 'An issue occurred in the application process.'], 422);
        }
    }
    public function getConfinConnectionSMS ()
    {
        return SystemSettings::first()->config_connection_sms ?? null
            ? response()->json(['success' => true, 'data' => Crypt::decrypt(SystemSettings::first()->config_connection_sms)], 200)
            : response()->json(['success' => true, 'msg' => 'no content']);
    }


//    online capcha
    public function setStatusReCapcha (SetStatusReCapchaRequest $request)
    {
        $creadtioanle = $request->validated();

        try {
            DB::beginTransaction();

                $systemSetting = SystemSettings::first();

                !$systemSetting
                    ? $systemSetting = $systemSetting->create($creadtioanle)
                    : $systemSetting->update(['active_online_capcha'
                        => $creadtioanle['active_online_capcha'] ?? $systemSetting['active_online_capcha']]);

            DB::commit();
                return response()->json(['success' => true, 'msg' => 'Settings have been successfully applied.'], 200);

        } catch (\Exception $e) {
            DB::rollBack();
                return response()->json(['success' => false, 'msg' => 'An issue occurred in the application process.'], 500);
        }
    }
    public function getStatusReCapcha ()
    {
        return response()->json(['success' => true, 'data' => SystemSettings::first()->active_online_capcha], 200);
    }




        // motherboard method
    public function setOrginalVMIp (SetOrgainalVMIpRequest $request)
    {
        $creadtioanle = $request->validated();

        try {
            DB::beginTransaction();

            $systemSetting = SystemSettings::first();

                !$systemSetting
                    ? $systemSetting = SystemSettings::create($creadtioanle)
                    : $systemSetting->update(['orginal_vm_ip'
                        => $creadtioanle['orginal_vm_ip'] ?? $systemSetting['orginal_vm_ip']]);


            DB::commit();
                return response()->json(['success' => true, 'msg' => 'Settings have been successfully applied.'], 200);

        } catch (Exception $e) {
            DB::rollBack();
                return response()->json(['success' => false, 'msg' => 'An issue occurred in the application process.'], 422);
        }
    }
    public function getOrginalVMIp ()
    {
        return SystemSettings::first()->orginal_vm_ip ?? null
            ? response()->json(['success' => true, 'data' => SystemSettings::first()->orginal_vm_ip], 200)
            : response()->json(['success' => true, 'msg' => 'no content']);
    }
}
