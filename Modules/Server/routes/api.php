<?php

use Illuminate\Support\Facades\Route;
use Modules\Server\Http\Controllers\ModuleController;
use Modules\Server\Http\Controllers\ServerController;
use Modules\Server\Http\Controllers\ServiceController;
use Modules\Server\Http\Controllers\CommandController;

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
Route::put('edit-server', [ServerController::class, 'editServer']);
Route::post('test-connection', [ServerController::class, 'testConnection']);

                    // module
Route::get('show-config-module/{serverID}/{ModuleID}', [ModuleController::class, 'showConfigModule']);
Route::get('show-all-servies-and-modules/{serverID}', [ModuleController::class, 'showAllServiseAndModulesInServer']);
Route::post('create-module', [ModuleController::class, 'createModule']);
Route::post('update-config-module', [ModuleController::class, 'updateConfigModule']);
Route::delete('delete-module', [ModuleController::class, 'deleteModule']);
Route::delete('delete-config-module', [ModuleController::class, 'deleteConfigMo  dule']);
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
