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
    public function login (Request $request)
    {
        $response = Http::post(env('NMS_IP') . 'login', [
            'auth_name' => $request['auth_name'],
            'password' => $request['password'],
        ]);

        return response()->json($response->json(), $response->status());
    }
    public function logout(Request $request)
    {
        $response = Http::withHeaders(['Authorization' => 'Bearer ' . $request->header('Authorization')])
            ->post(env('NMS_IP') . 'logout');

        return response()->json($response->json(), $response->status());
    }


    public function validateReCaptchaToken (Request $request)
    {
        $response = Http::asForm()->post(env('RECAPTCHA_VERYFY'), [
            'secret' => env('RECAPTCHA_SECRET_KEY'),
            'response' => $request['response'],
            'remoteip' => request()->ip(),
        ]);

        return $response->json()['success'] == true ?? null
            ? Response::json(['success' => true, 'data' => $response->json()], 200)
            : Response::json(['success' => false, 'data' => $response->json()], 422);
    }
}
