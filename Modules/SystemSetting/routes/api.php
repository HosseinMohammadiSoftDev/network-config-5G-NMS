<?php

use Illuminate\Support\Facades\Route;
use Modules\SystemSetting\Http\Controllers\MapController;

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

//          map2
    Route::get('get-map-address', [MapController::class, 'getMapAddress']);
    Route::post('set-map-address', [MapController::class, 'setMapAddress']);
    Route::delete('delete-map', [MapController::class, 'deleteMap']);
});
