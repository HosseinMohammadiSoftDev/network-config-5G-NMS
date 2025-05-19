<?php

use Illuminate\Support\Facades\Route;
use Modules\Backup\Http\Controllers\BackupController;

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

Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('set-config-backup', [BackupController::class, 'setConfigBackup']);
    Route::get('get-config-backup', [BackupController::class, 'getConfigBackup']);

    Route::get('get-history-backup', [BackupController::class, 'getHistoryBackup']);
});
