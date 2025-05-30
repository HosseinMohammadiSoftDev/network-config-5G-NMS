<?php

use Illuminate\Support\Facades\Route;
use Modules\User\Http\Controllers\AuthController;
use Modules\User\Http\Controllers\RoleController;
use Modules\User\Http\Controllers\UserController;


/*
 *--------------------------------------------------------------------------
 * API Routes
 *--------------------------------------------------------------------------
 *
 * Here is where you can register API routes for your application. These
 * routes are loaded by the RouteServiceProvider within a group which
 * is assigned the "api" middleware group. Enjoy building your API!
 *
*/


Route::post('login', [AuthController::class, 'login']);
Route::post('login-2FA', [AuthController::class, 'login2FA']);
Route::middleware(['auth:sanctum'])->post('logout', [AuthController::class, 'logout']);

Route::post('send-login-by-phone', [AuthController::class , 'sendLoginPhone']);
Route::post('login-by-phone', [AuthController::class , 'loginPhone']);

Route::post('validation-reCaptcha', [AuthController::class, 'validateReCaptchaToken']);


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('get-me', [UserController::class, 'getMe']);

});
