<?php

namespace Modules\SystemSetting\Http\Controllers;

use App\Http\Controllers\Contract\ApiController;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Modules\Server\Models\Server;
use Modules\SystemSetting\Http\Requests\Capcha\SetReCaptchaDataRequest;
use Modules\SystemSetting\Http\Requests\Capcha\SetStatusReCapchaRequest;
use Modules\SystemSetting\Http\Requests\FA2\Set2FAReqest;
use Modules\SystemSetting\Http\Requests\Merged\MergeAllConfigSystemRequest;
use Modules\SystemSetting\Http\Requests\SystemSetting\AddAddressRequest;
use Modules\SystemSetting\Http\Requests\SystemSetting\SetConfigConnectionSMSRequest;
use Modules\SystemSetting\Http\Requests\SystemSetting\SetLoginBySMSRequest;
use Modules\SystemSetting\Http\Requests\SystemSetting\SetOrgainalVMIpRequest;
use Modules\SystemSetting\Http\Requests\TestConfigConnectionSMSRequest;
use Modules\SystemSetting\Models\SystemSettings;
use Modules\User\Services\PhoneVerificationService;

class SystemSettingsController extends ApiController
{
    public function __construct(private PhoneVerificationService $phoneService)
    {}

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
    public function getStatus2FA ()
    {
        return response()->json(SystemSettings::select(['is_login_2FA'])->get()->toArray());
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
                return response()->json(['success' => true, 'msg' => 'Settings have been successfully applied.',
                    'data' => $systemSetting->is_login_2FA], 200);

        } catch (Exception $e) {
            DB::rollBack();
                return response()->json(['success' => false, 'msg' => 'An issue occurred in the application process.'], 422);
        }
    }



        // SMS settinge
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

            activity('login-by-sms')
                ->causedBy(Auth::user())
                ->event('update')
                ->withProperties([
                    'type-log' => 'server',
                    'route' => request()->fullUrl(),
                    'method' => 'setLoginBySMS',
                    'user' =>  Auth::user()->makeHidden(['roles', 'permissions'])->toArray(),
                    'user_role' =>Auth::user()->roles()->pluck('name')->first(),
                ])
                ->log('change User login policy with contact phone number');

            DB::commit();
                return response()->json(['success' => true, 'msg' => 'Settings have been successfull applied.',
                    'data' => $systemSetting->is_login_sms], 200);

        } catch (\Exception $e) {
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


            activity('login-by-sms')
                ->causedBy(Auth::user())
                ->event('update')
                ->withProperties([
                    'type-log' => 'server',
                    'route' => request()->fullUrl(),
                    'method' => 'setLoginBySMS',
                    'user' =>  Auth::user()->makeHidden(['roles', 'permissions'])->toArray(),
                    'user_role' =>Auth::user()->roles()->pluck('name')->first(),
                    'config-connection-panel-sms' => [
                        'new-config' => $systemSetting->config_connection_sms
                    ]
                ])
                ->log('change User login policy with contact phone number');

            DB::commit();
                return response()->json([
                    'success' => true,
                    'msg' => 'Settings have been successfully applied.',
                    'data' => Crypt::decrypt(SystemSettings::first()->config_connection_sms)
                ], 200);

        } catch (Exception $e) {
            DB::rollBack();
                return response()->json(['success' => false, 'msg' => 'An issue occurred in the application process.'], 422);
        }
    }
    public function testConfigConnectionSMS (TestConfigConnectionSMSRequest $request)
    {
        $credentials = $request->validated();

        $template = 'testConnection';
        $code = rand(100000, 999999); // random code
        $message = "5G Application : Test connection panel sms successful.";

        try {

            $this->phoneService->sendVerificationCode($template, $code, $credentials['phone_number'], $message);

            return response()->json(['success' => true, 'msg' => 'The SMS has been sent successfully.'], 200);

        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function getUserInfoSMSPanel ()
    {
        try {

            return response()->json(['success' => true, 'data' => $this->phoneService->getUserAccountInfo()], 200);

        } catch (\Exception $e) {
            throw $e;
        }
    }
    public function getConfinConnectionSMS ()
    {
        return SystemSettings::first()->config_connection_sms ?? null
            ? response()->json(['success' => true, 'data' => Crypt::decrypt(SystemSettings::first()->config_connection_sms)], 200)
            : response()->json(['success' => true, 'msg' => 'no content']);
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
                return response()->json(['success' => true, 'msg' => 'Settings have been successfully applied.',
                    'data' => $systemSetting->orginal_vm_ip], 200);

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



//    merge routes
    public function getAllConfigSystem ()
    {
        return SystemSettings::first()
            ? response()->json(['success' => true, 'data' => SystemSettings::first()], 200)
            : response()->json(['success' => true, 'msg' => 'no content']);
    }
    public function setAllConfigSystem (MergeAllConfigSystemRequest $request)
    {
        $creadtioanle = $request->validated();

        try {
            DB::beginTransaction();

                $systemSetting = SystemSettings::first();

                !$systemSetting
                    ? $systemSetting = SystemSettings::create($creadtioanle)
                    : $systemSetting->update([
                        'zabbix_address' => $creadtioanle['zabbix_address'] ?? $systemSetting['zabbix_address'],
                        'elk_address' => $creadtioanle['elk_address'] ?? $systemSetting['elk_address'],
                        'is_login_2FA' => $creadtioanle['is_login_2FA'] ?? $systemSetting['is_login_2FA'],
                        'is_login_sms' => $creadtioanle['is_login_sms'] ?? $systemSetting['is_login_sms'],
                        'orginal_vm_ip' => $creadtioanle['orginal_vm_ip'] ?? $systemSetting['orginal_vm_ip']
                    ]);


            DB::commit();
                return response()->json(['success' => true, 'msg' => 'set config system successFully', 'data' => $creadtioanle], 200);

        } catch (\Exception $e) {
            DB::rollBack();
                return response()->json(['success' => false, 'msg' => 'An issue occurred in the application process.'], 422);
        }
    }
}
