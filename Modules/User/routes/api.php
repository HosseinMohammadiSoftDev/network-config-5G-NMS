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
Route::middleware(['auth:sanctum', 'permission:user/read|role:admin'])->get('show-all-users', [UserController::class, 'showAllUsers']);
Route::middleware(['auth:sanctum', 'permission:user/read|role:admin'])->get('get-deleted-accounts', [UserController::class, 'getDeletedAccounts']);

Route::middleware(['auth:sanctum', 'permission:user/create|role:admin'])->post('add-member', [UserController::class, 'addMember']);
Route::middleware(['auth:sanctum', 'permission:user/update|role:admin'])->put('reset-password-and-auth-name', [UserController::class, 'resetPsswordAndAuthName']);
Route::middleware(['auth:sanctum', 'permission:user/delete|role:admin'])->delete('delete-member-Account/{UserID}', [UserController::class, 'deleteAccountMember']);

Route::middleware(['auth:sanctum', 'role:admin'])->get('show-all-roles', [RoleController::class, 'showAllRolesPermissions']);
Route::middleware(['auth:sanctum', 'role:admin|visitor|expert'])->get('show-all-permission', [RoleController::class, 'showAllPermissions']);
Route::middleware(['auth:sanctum', 'role:admin'])->post('add-permission-to-user', [RoleController::class,'addPermissionToUser']);
Route::middleware(['auth:sanctum', 'role:admin'])->post('remove-permission-to-user', [RoleController::class,'removePermissionFromUser']);
