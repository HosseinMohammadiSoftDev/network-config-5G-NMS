<?php

use Illuminate\Support\Facades\Route;
use Modules\Server\Http\Controllers\ModuleController;
use Modules\Server\Http\Controllers\ServerController;
use Modules\Server\Http\Controllers\ServiceController;

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
Route::middleware(['auth:sanctum', 'permission:server/read|role:admin|visitor|expert'])->get('show-all-servers', [ServerController::class, 'showAllServers']);
Route::middleware(['auth:sanctum', 'permission:server/create|role:admin|expert'])->post('create-server', [ServerController::class, 'createServer']);
Route::middleware(['auth:sanctum', 'permission:server/update|role:admin|expert'])->put('edit-server', [ServerController::class, 'editServer']);
Route::middleware(['auth:sanctum', 'permission:server/delete|role:admin|expert'])->delete('server-delete', [ServerController::class, 'deleteServer']);
Route::middleware(['auth:sanctum', 'role:admin|expert'])->post('test-connection', [ServerController::class, 'testConnection']);

                    // module
Route::middleware(['auth:sanctum', 'permission:module/read|role:admin|visitor|expert'])->get('show-config-module/{serverID}', [ModuleController::class, 'showConfigModule']);
Route::middleware(['auth:sanctum', 'role:admin|visitor|expert'])->get('show-all-servies-and-modules/{serverID}', [ModuleController::class, 'showAllServiseAndModulesInServer']);
Route::middleware(['auth:sanctum', 'permission:module/update|role:admin|expert'])->post('upload-module', [ModuleController::class, 'uploadModule']);
Route::middleware(['auth:sanctum', 'permission:module/create|role:admin|expert'])->post('create-module', [ModuleController::class, 'createModule']);
Route::middleware(['auth:sanctum', 'permission:module/update|role:admin|expert'])->post('update-config-module', [ModuleController::class, 'updateConfigModule']);
Route::middleware(['auth:sanctum', 'permission:module/delete|role:admin|expert'])->delete('delete-module', [ModuleController::class, 'deleteModule']);
Route::middleware(['auth:sanctum', 'permission:module/update|role:admin|expert'])->delete('delete-config-module', [ModuleController::class, 'deleteConfigModule']);
Route::middleware(['auth:sanctum', 'permission:module/update|role:admin|expert'])->get('show-all-modules', [ModuleController::class, 'showAllModules']);
Route::middleware(['auth:sanctum', 'permission:module/delete|role:admin|expert'])->post('edit-module', [ModuleController::class, 'editModule']);

Route::middleware(['auth:sanctum', 'permission:module/update|role:admin|expert'])->post('undo-module-config', [ModuleController::class, 'undoConfigModule']);
Route::middleware(['auth:sanctum', 'permission:module/update|role:admin|expert'])->post('undo-to-initial-config-modules', [ModuleController::class, 'undoToInitialConfigModule']);

        // power on | off server
Route::middleware(['auth:sanctum', 'permission:server/off|role:admin|expert'])->post('server-stop', [ServerController::class, 'serverStop']);
Route::middleware(['auth:sanctum', 'permission:server/off|role:admin|expert'])->post('server-start', [ServerController::class, 'ServerStart']);
Route::middleware(['auth:sanctum', 'role:admin|expert'])->post('server-status', [ServerController::class, 'serverStatus']);
