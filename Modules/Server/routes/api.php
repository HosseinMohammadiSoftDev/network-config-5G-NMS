<?php

use Illuminate\Support\Facades\Route;
use Modules\Server\Http\Controllers\ModuleController;
use Modules\Server\Http\Controllers\ServerController;
use Modules\Server\Http\Controllers\ServiceController;
use Modules\Server\Http\Controllers\CommandController;
use Modules\Server\Http\Controllers\SyncServerDataController;

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
    Route::middleware([ 'permission:VM/read|role:admin|visitor|expert'])->get('show-all-servers', [ServerController::class, 'showAllServers']);
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
    Route::middleware(['permission:module/read|role:admin|expert'])->get('show-all-modules', [ModuleController::class, 'showAllModules']);
    Route::middleware(['permission:module/delete|role:admin|expert'])->post('edit-module', [ModuleController::class, 'editModule']);

    Route::middleware(['permission:module/update|role:admin|expert'])->post('run-service-lte', [CommandController::class, 'runServiceLTE']);
    Route::middleware(['permission:module/update|role:admin|expert'])->post('run-service-gsm', [CommandController::class, 'runServiceGSM']);

    Route::middleware(['permission:module/update|role:admin|expert'])->post('undo-module-config', [ModuleController::class, 'undoConfigModule']);
    Route::middleware(['permission:module/update|role:admin|expert'])->post('undo-to-initial-config-modules', [ModuleController::class, 'undoToInitialConfigModule']);

    Route::middleware(['permission:module/read|role:admin|expert'])->post('export-module-file', [ModuleController::class, 'expertModuleFileIsServer']);

            // power on | off server
    Route::middleware(['permission:VM/status|role:admin|expert'])->post('server-stop', [ServerController::class, 'serverStop']);
    Route::middleware(['permission:VM/status|role:admin|expert'])->post('server-start', [ServerController::class, 'ServerStart']);
    Route::middleware(['role:admin|expert|visitor'])->post('server-status', [ServerController::class, 'serverStatus']);
});


Route::get('get-data-server', [SyncServerDataController::class, 'getDataServer']);
Route::get('get-data-modules/{serverIP}', [SyncServerDataController::class, 'getDataModules']);
Route::get('get-data-module-changed/{serverIP}', [SyncServerDataController::class, 'getDataModuleChanged']);

Route::prefix('auto-sync/')->group(function () {
    Route::post('receive-changed-module-bbu', [SyncServerDataController::class, 'receiveChangeModuleBBU']);
    Route::get('send-module-change-to-buu', [SyncServerDataController::class, 'sendModuleChangeToBBU']);
});
