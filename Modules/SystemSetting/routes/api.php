<?php

use Illuminate\Support\Facades\Route;
use Modules\Server\Http\Controllers\CommandController;
use Modules\SystemSetting\Http\Controllers\SystemSettingsController;
use Modules\SystemSetting\Http\Controllers\TraceController;
use Modules\SystemSetting\Http\Controllers\RouteController;
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

Route::get('get-status-reCapcha', [SystemSettingsController::class, 'getStatusReCapcha']);

Route::middleware(['auth:sanctum'])->group(function () {

    Route::middleware(['permission:monitoring|role:admin|expert'])->get('show-address', [SystemSettingsController::class, 'showAllAddress']);
    Route::middleware(['permission:monitoring|role:admin|expert'])->post('add-address', [SystemSettingsController::class,'addOrUpdateAddress']);

    Route::middleware(['role:admin'])->post('set-2FA', [SystemSettingsController::class, 'set2FA']);
    Route::withoutMiddleware(['auth:sanctum'])->get('get-2FA-status', [SystemSettingsController::class, 'getStatus2FA']);

    Route::middleware(['role:admin'])->post('set-login-sms-status', [SystemSettingsController::class, 'setLoginBySMS']);
    Route::withoutMiddleware(['auth:sanctum'])->get('get-login-sms-status', [SystemSettingsController::class, 'getLoginBySMS']);

    Route::middleware(['role:admin'])->post('set-config-connection-sms', [SystemSettingsController::class, 'setConfigConnectionSMS']);
    Route::middleware(['role:admin'])->get('get-config-connection-sms', [SystemSettingsController::class, 'getConfinConnectionSMS']);

    Route::post('set-status-reCapcha', [SystemSettingsController::class, 'setStatusReCapcha']);

    Route::post('set-recapcha-data', [SystemSettingsController::class, 'setRecatpchaData']);
    Route::get('get-recapcha-data', [SystemSettingsController::class, 'getRecaptchaData']);

    // motherboard
    Route::get('get-motherboard', [SystemSettingsController::class, 'getMotherboard']);

    Route::middleware(['role:admin'])->post('set-orginal-VM-ip',[SystemSettingsController::class, 'setOrginalVMIp']);
    Route::get('get-orginal-vm-ip', [SystemSettingsController::class, 'getOrginalVMIp']);


//      merge all routes
    Route::get('get-all-config-system', [SystemSettingsController::class, 'getAllConfigSystem']);
    Route::post('set-all-config-system', [SystemSettingsController::class, 'setAllConfigSystem']);


//    show vm interface
    Route::post('show-interface-vm', [CommandController::class, 'showInterfaceVm']);


//        trace server
    Route::post('trace-server-start', [TraceController::class, 'traceServerStart']);
    Route::post('trace-server-stop', [TraceController::class, 'traceServerStop']);


//        route server
    Route::post('show-route-server', [RouteController::class, 'showRouteServer']);
    Route::post('add-route-server', [RouteController::class, 'addRouteServer']);
    Route::post('delete-route-server', [RouteController::class, 'deleteRouteServer']);
});
