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
    return response()->json(['msg' => 'ادرس درست وارد نشده است']);
});

Route::middleware(['auth:sanctum', 'role:admin|visitor|expert|permission:server/read'])->get('show-all-servers', [ServerController::class, 'showAllServers']);
Route::middleware(['auth:sanctum', 'role:admin|expert|permission:server/create'])->post('create-server', [ServerController::class, 'createServer']);
Route::middleware(['auth:sanctum', 'role:admin|expert|permission:server/update'])->put('edit-server', [ServerController::class, 'editServer']);
Route::middleware(['auth:sanctum', 'role:admin|expert|permission:server/delete'])->delete('server-delete', [ServerController::class, 'deleteServer']);

Route::middleware(['auth:sanctum', 'role:admin|visitor|expert|permission:module/read'])->get('show-config-module/{serverID}', [ModuleController::class, 'showConfigModule']);
Route::middleware(['auth:sanctum', 'role:admin|expert'])->post('test-connection', [ServerController::class, 'testConnection']);
Route::middleware(['auth:sanctum', 'role:admin|visitor|expert'])->get('show-all-servies-and-modules/{serverID}', [ModuleController::class, 'showAllServiseAndModulesInServer']);
Route::middleware(['auth:sanctum', 'role:admin|expert|permission:module/update'])->post('upload-module', [ModuleController::class, 'uploadModule']);
Route::middleware(['auth:sanctum', 'role:admin|expert|permission:module/create'])->post('create-module', [ModuleController::class, 'createModule']);
Route::middleware(['auth:sanctum', 'role:admin|expert|permission:module/update'])->post('update-config-module', [ModuleController::class, 'updateConfigModule']);
Route::middleware(['auth:sanctum', 'role:admin|expert|permission:module/delete'])->delete('delete-module', [ModuleController::class, 'deleteModule']);

Route::middleware(['auth:sanctum', 'role:admin|expert|permission:module/update'])->post('undo-module-config', [ModuleController::class, 'undoConfigModule']);
Route::middleware(['auth:sanctum', 'role:admin|expert|permission:module/update'])->post('undo-to-initial-config-modules', [ModuleController::class, 'undoToInitialConfigModule']);

        // power on | off server
Route::middleware(['auth:sanctum', 'role:admin|expert|permission:server/off'])->post('server-stop', [ServerController::class, 'serverStop']);
Route::middleware(['auth:sanctum', 'role:admin|expert|permission:server/on'])->post('server-start', [ServerController::class, 'ServerStart']);
Route::middleware(['auth:sanctum', 'role:admin|expert'])->post('server-status', [ServerController::class, 'serverStatus']);
