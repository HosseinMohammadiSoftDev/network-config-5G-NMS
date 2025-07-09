<?php

use Illuminate\Support\Facades\Route;
use Modules\Server\Http\Controllers\ModuleController;
use Modules\Server\Http\Controllers\ServerController;
use Modules\Server\Http\Controllers\ServiceController;
use Modules\Server\Http\Controllers\CommandController;
use \Modules\Server\Services\SyncData\SyncService;
use \Modules\Server\Http\Controllers\SyncServerDataController;
use \Modules\Server\Http\Controllers\SystemSettingController;

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


                    // server
Route::get('get-my-server-data', [ServerController::class, 'getMyServerData']);
Route::put('edit-server', [ServerController::class, 'editServer']);
Route::post('test-connection', [ServerController::class, 'testConnection']);

                    // moduled
Route::get('show-config-module/{ModuleID}', [ModuleController::class, 'showConfigModule']);
Route::get('show-all-servies-and-modules', [ModuleController::class, 'showAllServiseAndModulesInServer']);
Route::post('create-module', [ModuleController::class, 'createModule']);
Route::post('update-config-module', [ModuleController::class, 'updateConfigModule']);
Route::delete('delete-module', [ModuleController::class, 'deleteModule']);
Route::delete('delete-config-module', [ModuleController::class, 'deleteConfigModule']);
Route::get('show-all-modules', [ModuleController::class, 'showAllModules']);
Route::post('edit-module', [ModuleController::class, 'editModule']);

Route::post('run-service-lte', [CommandController::class, 'runServiceLTE']);
Route::post('run-service-gsm', [CommandController::class, 'runServiceGSM']);

Route::post('undo-module-config', [ModuleController::class, 'undoConfigModule']);
Route::post('undo-to-initial-config-modules', [ModuleController::class, 'undoToInitialConfigModule']);

Route::post('export-module-file', [ModuleController::class, 'expertModuleFileIsServer']);

        // power on | off server
Route::post('server-stop', [ServerController::class, 'serverStop']);
Route::post('server-start', [ServerController::class, 'ServerStart']);
Route::post('server-status', [ServerController::class, 'serverStatus']);



//    systemSetting route
Route::get('get-system-setting', [SystemSettingController::class, 'getSystemSetting']);
Route::post('nms-server-data', [SystemSettingController::class, 'nmsServerData']);


//      sync data
//    get and set to sqlite as server RRU
Route::get('sync-data', [SyncServerDataController::class, 'syncData']);
