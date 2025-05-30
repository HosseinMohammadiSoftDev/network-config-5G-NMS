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


// auth route
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);


Route::post('validation-reCaptcha', [AuthController::class, 'validateReCaptchaToken']);


// user route
Route::get('get-me', [UserController::class, 'getMe']);


// role, permission routes
Route::get('show-all-permission', [UserController::class, 'showAllPermissions']);
Route::get('show-all-roles', [UserController::class, 'showAllRolesPermissions']);


// log route
Route::post('show-all-logs', [UserController::class, 'showAllLogs']);
