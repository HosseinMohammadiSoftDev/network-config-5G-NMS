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

Route::middleware(['auth:sanctum', 'role:admin|visitor|expert'])->get('show-all-servers', [ServerController::class, 'showAllServers']);
Route::middleware(['auth:sanctum', 'role:admin|expert'])->post('create-server', [ServerController::class, 'createServer']);

Route::middleware(['auth:sanctum', 'role:admin|visitor|expert'])->get('show-config-module/{serverID}', [ModuleController::class, 'showConfigModule']);
Route::middleware(['auth:sanctum', 'role:admin|visitor|expert'])->post('show-all-modules', [ModuleController::class, 'showAllModules']);
Route::middleware(['auth:sanctum', 'role:admin|expert'])->post('upload-module', [ModuleController::class, 'uploadModule']);
Route::middleware(['auth:sanctum', 'role:admin|expert'])->post('create-module', [ModuleController::class, 'createModule']);
Route::middleware(['auth:sanctum', 'role:admin|expert'])->post('update-config-module', [ModuleController::class, 'updateConfigModule']);

