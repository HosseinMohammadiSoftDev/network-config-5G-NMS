<?php

use Illuminate\Support\Facades\Route;
use Modules\Trace\Http\Controllers\TraceController;

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

Route::post('trace-server-start', [TraceController::class, 'traceServerStart']);
Route::post('trace-server-stop', [TraceController::class, 'traceServerStop']);
