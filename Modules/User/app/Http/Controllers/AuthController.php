<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Modules\User\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Contract\ApiController;
use Modules\User\Http\Requests\Auth\Loginrequest;
use Modules\User\Services\PhoneVerificationService;
use Modules\User\Http\Requests\Phone\LoginPhoneRequest;
use Modules\User\Http\Requests\Phone\SendLoginPhoneRequest;
use Modules\User\Http\Requests\Phone\VerifyUserPhoneRequest;


class AuthController extends ApiController
{
    public function __construct(private PhoneVerificationService $phoneService)
    {

    }


    public function login (Loginrequest $request)
    {
        $credentials = $request->validated();

        $user = User::whereRaw('BINARY auth_name = ?', [$credentials['auth_name']])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {

            activity('auth-name-or-passord-wrong')
                ->causedBy(Auth::user())
                ->event('login')
                ->withProperties([
                    'type-log' => 'app',
                    'route' => request()->fullUrl(),
                    'method' => 'login',
                    'auth-name' => $credentials['auth_name'],
                    'password' => $credentials['password']
                ])
                ->log('The user entered an incorrect email or password during login.');

                return response()->json(['msg' => 'You have entered an incorrect username or password'], 422);

        }


        $user->tokens()->delete();
        $token = $user->createToken('apiToken')->plainTextToken;

            activity('login')
                ->causedBy(Auth::user())
                ->event('login')
                ->withProperties([
                    'route' => request()->fullUrl(),
                    'method' => 'login',
                    'user' => $user,
                ])
                ->log('The user logged in with the username and password.');

        return $this->respondSuccess('The user has logged in', [
            'user' => [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'auth_name' => $user->auth_name,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
            ],
            'token' => $token,
        ]);
    }
    public function logout(Request $request)
    {
        try {

            $user = $request->user();
            $user->tokens()->delete();

            activity('logout')
                ->causedBy(Auth::user())
                ->event('logout')
                ->withProperties([
                    'type-log' => 'app',
                    'route' => request()->fullUrl(),
                    'method' => 'logout',
                    'user' => $user
                ])
            ->log('The user has logged out of their account');

            return $this->respondSuccess('The user has logged out of their account', ['user' => $user]);
        } catch (\Exception $e) {

            activity('logout')
                ->causedBy(Auth::user())
                ->event('logout')
                ->withProperties([
                    'route' => request()->fullUrl(),
                    'method' => 'logout',
                    'error' => $e->getMessage()
                ])
            ->log('An error occurred while logging out the user');

            return response()->json(['msg' => 'An error occurred while logging out the user']);
        }
    }





        // Phone
    public function sendLoginPhone(SendLoginPhoneRequest $request)
    {
        $credentials = $request->validated();

        $this->phoneService->checkPhoneIsVerified($credentials['phone']);
        $this->phoneService->isLoginSent($credentials['phone']);


        $template = "PhoneLogin";
        $param1 = rand(100000, 999999); // random code

        return $this->phoneService->sendVerificationCode($template, $param1, $credentials['phone']);
    }
    public function loginPhone(LoginPhoneRequest $request)
    {
        $credentials = $request->validated();

        $this->phoneService->checkLoginCode($credentials['phone']);

        return $this->phoneService->login($request->phone, $request->code);

    }

}
