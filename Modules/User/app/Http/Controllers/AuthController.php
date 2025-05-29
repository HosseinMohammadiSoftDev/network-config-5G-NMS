<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Contract\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Response;
use Illuminate\Validation\ValidationException;
use Modules\Server\Models\Server;
use Modules\SystemSetting\Models\SystemSettings;
use Modules\User\Http\Requests\Auth\Login2FARequest;
use Modules\User\Http\Requests\Auth\Loginrequest;
use Modules\User\Http\Requests\Phone\LoginPhoneRequest;
use Modules\User\Http\Requests\Phone\SendLoginPhoneRequest;
use Modules\User\Http\Requests\ReCaptcha\ValidateReCaptchaTokenRequest;
use Modules\User\Models\PhoneLogin;
use Modules\User\Models\Role;
use Modules\User\Models\User;
use Modules\User\Services\PhoneVerificationService;
use Modules\User\Transformers\Auth\LoginResource;

class AuthController extends ApiController
{
    public function __construct(private PhoneVerificationService $phoneService)
    {

    }


    public function login (Loginrequest $request)
    {
        $credentials = $request->validated();

        return Http::post(env('NMS_IP') . 'login',[
            'auth_name' => $credentials['auth_name'],
            'password' => $credentials['password'],
        ]);

    }
    public function logout(Request $request)
    {
        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->post(env('NMS_IP') . 'logout');
    }
    public function login2FA (Login2FARequest $request)
    {
        $credentials = $request->validated();

        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->post(env('NMS_IP') . 'logout', [
                'user_id' => $credentials['user_id'],
                'code' => $credentials['code']
            ]);

    }





        // Phone
    public function sendLoginPhone(SendLoginPhoneRequest $request)
    {
        $credentials = $request->validated();

        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->post(env('NMS_IP') . 'login',[
                'phone' => $credentials['phone'],
            ]);
    }
    public function loginPhone(LoginPhoneRequest $request)
    {
        $credentials = $request->validated();

        return Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->post(env('NMS_IP') . 'login',[
                'phone' => $credentials['phone'],
                'code' =>  $credentials['code']
            ]);
    }



    public function validateReCaptchaToken (ValidateReCaptchaTokenRequest $request)
    {
        $credentials = $request->validated();

        $response = Http::asForm()->post(env('RECAPTCHA_VERYFY'), [
            'secret' => env('RECAPTCHA_SECRET_KEY'),
            'response' => $credentials['response'],
            'remoteip' => request()->ip(),
        ]);

        return $response->json()['success'] == true ?? null
            ? Response::json(['success' => true, 'data' => $response->json()], 200)
            : Response::json(['success' => false, 'data' => $response->json()], 422);
    }
}
