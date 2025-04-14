<?php

use Modules\Server\Models\Module;
use Modules\Server\Models\Server;
use Illuminate\Support\Facades\Route;
use Modules\Server\Http\Controllers\ModuleController;
use Modules\Server\Http\Controllers\ServerController;
use Modules\Server\Helpers\SshHelper;
use Modules\Server\Http\Controllers\ServiceController;
use Modules\Server\Http\Controllers\SystemSettingsController;
use Modules\Server\Models\SystemSettings;

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

Route::fallback(function(){
    return response()->json(['msg' => 'The address has been entered incorrectly.']);
});


Route::middleware(['auth:sanctum'])->group(function () {

                        // server
    Route::middleware(['permission:VM/read|role:admin|visitor|expert'])->get('show-all-servers', [ServerController::class, 'showAllServers']);
    Route::middleware([ 'permission:VM/create|role:admin|expert'])->post('create-server', [ServerController::class, 'createServer']);
    Route::middleware([ 'permission:VM/update|role:admin|expert'])->put('edit-server', [ServerController::class, 'editServer']);
    Route::middleware([ 'permission:VM/delete|role:admin|expert'])->delete('server-delete', [ServerController::class, 'deleteServer']);
    Route::post('test-connection', [ServerController::class, 'testConnection']);

                        // module
    Route::middleware(['permission:module/read|role:admin|visitor|expert'])->get('show-config-module/{serverID}/{ModuleID}', [ModuleController::class, 'showConfigModule']);
    Route::middleware(['role:admin|visitor|expert'])->get('show-all-servies-and-modules/{serverID}', [ModuleController::class, 'showAllServiseAndModulesInServer']);
    Route::middleware(['permission:module/create|role:admin|expert'])->post('create-module', [ModuleController::class, 'createModule']);
    Route::middleware(['permission:module/update|role:admin|expert'])->post('update-config-module', [ModuleController::class, 'updateConfigModule']);
    Route::middleware(['permission:module/delete|role:admin|expert'])->delete('delete-module', [ModuleController::class, 'deleteModule']);
    Route::middleware(['permission:module/update|role:admin|expert'])->delete('delete-config-module', [ModuleController::class, 'deleteConfigModule']);
    Route::middleware(['permission:module/read|role:admin|expert'])->get('show-all-modules', [ModuleController::class, 'showAllModules']);
    Route::middleware(['permission:module/delete|role:admin|expert'])->post('edit-module', [ModuleController::class, 'editModule']);

    Route::middleware(['permission:module/update|role:admin|expert'])->post('restart-service-config', [ModuleController::class, 'restartServiceModule']);
    Route::middleware(['permission:module/update|role:admin|expert'])->post('start-service-config', [ModuleController::class, 'startServiceModule']);
    Route::middleware(['permission:module/update|role:admin|expert'])->post('stop-service-config', [ModuleController::class, 'stopServiceModule']);
    Route::middleware(['permission:module/update|role:admin|expert'])->post('status-service-config', [ModuleController::class, 'statusServiceModule']);
    Route::middleware(['role:admin|expert'])->post('ping-ssh', [ModuleController::class, 'PingServer']);

    Route::middleware(['permission:module/update|role:admin|expert'])->post('undo-module-config', [ModuleController::class, 'undoConfigModule']);
    Route::middleware(['permission:module/update|role:admin|expert'])->post('undo-to-initial-config-modules', [ModuleController::class, 'undoToInitialConfigModule']);

    Route::middleware(['permission:module/read|role:admin|expert'])->post('export-module-file', [ModuleController::class, 'expertModuleFileIsServer']);

            // power on | off server
    Route::middleware(['permission:VM/status|role:admin|expert'])->post('server-stop', [ServerController::class, 'serverStop']);
    Route::middleware(['permission:VM/status|role:admin|expert'])->post('server-start', [ServerController::class, 'ServerStart']);
    Route::middleware(['role:admin|expert|visitor'])->post('server-status', [ServerController::class, 'serverStatus']);


            // system seting
    Route::middleware(['permission:monitoring|role:admin|expert'])->get('show-address', [SystemSettingsController::class, 'showAllAddress']);
    Route::middleware(['permission:monitoring|role:admin|expert'])->post('add-address', [SystemSettingsController::class,'addOrUpdateAddress']);

    Route::middleware(['role:admin'])->post('set-2FA', [SystemSettingsController::class, 'set2FA']);
    Route::withoutMiddleware(['auth:sanctum'])->get('get-2FA-status', [SystemSettingsController::class, 'getStatus2FA']);

    Route::middleware(['role:admin'])->post('set-login-sms-status', [SystemSettingsController::class, 'setLoginBySMS']);
    Route::withoutMiddleware(['auth:sanctum'])->get('get-login-sms-status', [SystemSettingsController::class, 'getLoginBySMS']);

    Route::middleware(['role:admin'])->post('set-config-connection-sms', [SystemSettingsController::class, 'setConfigConnectionSMS']);
    Route::middleware(['role:admin'])->get('get-config-connection-sms', [SystemSettingsController::class, 'getConfinConnectionSMS']);

        // motherboard
    Route::get('get-motherboard', [SystemSettingsController::class, 'getMotherboard']);

});
