<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Contract\ApiController;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Modules\User\Http\Requests\Auth\Loginrequest;
use Modules\User\Models\User;

class AuthController extends ApiController
{
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
                    'code' => '5',
                    'route' => request()->fullUrl(),
                    'method' => 'login',
                    'auth-name' => $credentials['auth_name'],
                    'password' => $credentials['password']
                ])
            ->log('کاربر زمان ورود ایمیل یا کلمه عبور اشتباه وارد کرده است'); 

            return response()->json(['msg' => 'نام کاربری یا رمز عبور را اشتباه وارد کردید'], 422);
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
                    'token' => $token,
                ])
            ->log('کار با نام کاربری و پسورد وارد شد'); 

        return $this->respondSuccess('کاربر ورود پیدا کرد', [
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
            ->log('کاربر از حساب کاربری خود خارج شد'); 

            return $this->respondSuccess('کاربر از حساب  خود خارج شد', ['user' => $user]);            
        } catch (\Exception $e) {

            activity('logout')
                ->causedBy(Auth::user())
                ->event('logout')
                ->withProperties([
                    'route' => request()->fullUrl(),
                    'method' => 'logout',
                    'error' => $e->getMessage()
                ])
            ->log('مشکلی در خروج کاربر رخ داد'); 

            return response()->json(['msg' => 'مشکلی در خروج کاربر به وجود امد']);
        }
    }
}
