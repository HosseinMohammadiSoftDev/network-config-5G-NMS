<?php

use Illuminate\Support\Facades\Route;
use Modules\Server\Http\Controllers\SystemSettingsController;
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
Route::post('login-2FA', [AuthController::class, 'login2FA']);
Route::middleware(['auth:sanctum'])->post('logout', [AuthController::class, 'logout']);

Route::post('send-login-by-phone', [AuthController::class , 'sendLoginPhone']);
Route::post('login-by-phone', [AuthController::class , 'loginPhone']);



Route::middleware(['auth:sanctum'])->get('get-me', [UserController::class, 'getMe']);
Route::middleware(['auth:sanctum', 'permission:user|role:admin'])->get('show-all-users', [UserController::class, 'showAllUsers']);
Route::middleware(['auth:sanctum', 'permission:user|role:admin'])->get('get-deleted-accounts', [UserController::class, 'getDeletedAccounts']);

Route::middleware(['auth:sanctum', 'permission:user|role:admin'])->post('add-member', [UserController::class, 'addMember']);
Route::middleware(['auth:sanctum', 'permission:user|role:admin'])->post('edit_member', [UserController::class, 'editMember']);
Route::middleware(['auth:sanctum', 'permission:user|role:admin'])->delete('delete-member-Account/{UserID}', [UserController::class, 'deleteAccountMember']);

Route::middleware(['auth:sanctum', 'role:admin|visitor|expert'])->get('show-all-roles', [RoleController::class, 'showAllRolesPermissions']);
Route::middleware(['auth:sanctum', 'role:admin|visitor|expert'])->get('show-all-permission', [RoleController::class, 'showAllPermissions']);
Route::middleware(['auth:sanctum', 'role:admin'])->post('add-permission-to-user', [RoleController::class,'addPermissionToUser']);
Route::middleware(['auth:sanctum', 'role:admin'])->post('remove-permission-to-user', [RoleController::class,'removePermissionFromUser']);
