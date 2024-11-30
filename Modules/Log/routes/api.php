<?php

use Illuminate\Support\Facades\Route;
use Modules\Log\Http\Controllers\LogController;

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

Route::middleware(['auth:sanctum', 'role:admin'])->post('show-all-logs', [LogController::class, 'showAllLogs']);