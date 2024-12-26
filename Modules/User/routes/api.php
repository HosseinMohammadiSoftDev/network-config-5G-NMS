<?php

use Illuminate\Support\Facades\Route;
use Modules\User\Http\Controllers\AuthController;
use Modules\User\Http\Controllers\RoleController;
use Modules\User\Http\Controllers\UserController;


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


Route::post('login', [AuthController::class, 'login']);
Route::middleware(['auth:sanctum'])->post('logout', [AuthController::class, 'logout']);

Route::middleware(['auth:sanctum'])->get('get-me', [UserController::class, 'getMe']);
Route::middleware(['auth:sanctum', 'role:admin|permission:user/read'])->get('show-all-users', [UserController::class, 'showAllUsers']);
Route::middleware(['auth:sanctum', 'role:admin|permission:user/read'])->get('get-deleted-accounts', [UserController::class, 'getDeletedAccounts']);

Route::middleware(['auth:sanctum', 'role:admin|permission:user/create'])->post('add-member', [UserController::class, 'addMember']);
Route::middleware(['auth:sanctum', 'role:admin|permission:user/update'])->put('reset-password-and-auth-name', [UserController::class, 'resetPsswordAndAuthName']);
Route::middleware(['auth:sanctum', 'role:admin|permission:user/delete'])->delete('delete-member-Account/{UserID}', [UserController::class, 'deleteAccountMember']);

Route::middleware(['auth:sanctum', 'role:admin'])->get('show-all-roles', [RoleController::class, 'showAllRolesPermissions']);
