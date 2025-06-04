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
use Modules\User\Http\Requests\Auth\Loginrequest;
use Modules\User\Http\Requests\ReCaptcha\ValidateReCaptchaTokenRequest;
use Modules\User\Models\Role;
use Modules\User\Models\User;
use Modules\User\Transformers\Auth\LoginResource;

class AuthController extends ApiController
{
    public function __construct()
    {}



    private function validateLoginDevice (User $user)
    {
        $server = Server::find($user?->server_id);

            if ($server) {
                if (request()->ip() !== $server['ip'])
                    throw ValidationException::withMessages(['validation' => ['Your IP is different from the server on which your account is registered.']]);

                    if ($server['is_down'])
                    throw ValidationException::withMessages(['validation' => ['server is off']]);

            } else {

                if (request()->ip() !== '127.0.0.1')
                    throw ValidationException::withMessages(['validation' => ['Your IP is different from the orginal server ip on which your account is registered.']]);
            }
    }
    public function login (Loginrequest $request)
    {
        $credentials = $request->validated();

        $user = User::whereRaw('BINARY auth_name = ?', [$credentials['auth_name']])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password))
            return response()->json(['msg' => 'You have entered an incorrect username or password'], 422);

        if (!$user->hasRole(Role::ADMIN))
            $this->validateLoginDevice($user);



//        $user->tokens()->delete();
        $token = $user->createToken('apiToken')->plainTextToken;


            activity('login')
            ->event('login')
                ->causedBy(Auth::user())
                ->withProperties([
                    'route' => request()->fullUrl(),
                    'method' => 'login',
                    'user' => $user,
                ])->log('The user logged in with the username and password.');


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
            return response()->json(['msg' => 'An error occurred while logging out the user']);
        }
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
