<?php

namespace Modules\User\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Modules\User\Http\Requests\Auth\Loginrequest;
use Modules\User\Models\User;

class AuthController extends Controller
{
    public function login (Loginrequest $request)
    {
        $credentials = $request->validated();

        $user = User::where('auth_name', $credentials['auth_name'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            
            // activity('login')
            //     ->causedBy(Auth::user())
            //     ->event('login')
            //     ->withProperties([
            //         'code' => '5',
            //         'route' => request()->fullUrl(),
            //         'method' => 'login',
            //         'email' => $credentials['email'],
            //         'password' => $credentials['password']
            //     ])
            // ->log('کاربر زمان ورود ایمیل یا کلمه عبور اشتباه وارد کرده است'); 

            return response()->json(['msg' => 'نام کاربری یا رمز عبور را اشتباه وارد کردید'], 422);
        }


        $user->tokens()->delete();
        $token = $user->createToken('apiToken')->plainTextToken;

            // activity('email-or-passord-wrong')
            //     ->causedBy(Auth::user())
            //     ->event('login')
            //     ->withProperties([
            //         'route' => request()->fullUrl(),
            //         'method' => 'login',
            //         'user' => $user,
            //         'token' => $token,
            //     ])
            // ->log('کار با ایمیل و پسورد وارد شد'); 

        return response()->json(['msg' => 'کاربر با موفقیت ورود کرد', 'user' => $user, 'token' => $token]);
    } 
    public function logout(Request $request)
    {
        try {

            $user = $request->user();
            $user->tokens()->delete();

            // activity('logout')
            //     ->causedBy(Auth::user())
            //     ->event('louot')
            //     ->withProperties([
            //         'route' => request()->fullUrl(),
            //         'method' => 'login',
            //         'user' => $user
            //     ])
            // ->log('کاربر از حساب کاربری خود خارج شد'); 

            
            return response()->json(['msg' => 'کاربر از حساب کاربری خود خارج شد', 'user' => $user]);
        } catch (\Exception $e) {
            // Log::error('User logout failed', ['error' => $e->getMessage(), 'user' => $request->user()]);
            return response()->json(['msg' => 'مشکلی در خروج کاربر به وجود امد']);
        }
    }
}
