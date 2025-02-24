<?php

use Modules\Server\Models\Module;
use Modules\Server\Models\Server;
use Illuminate\Support\Facades\Route;
use Modules\Server\Http\Controllers\ModuleController;
use Modules\Server\Http\Controllers\ServerController;
use Modules\Server\Helpers\SshHelper;
use Modules\Server\Http\Controllers\ServiceController;
use Modules\Server\Http\Controllers\SystemSettingsController;
use Modules\Server\Models\SystemSettings;

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
Route::middleware(['auth:sanctum', 'permission:VM/read|role:admin|visitor|expert'])->get('show-all-servers', [ServerController::class, 'showAllServers']);
Route::middleware(['auth:sanctum', 'permission:VM/create|role:admin|expert'])->post('create-server', [ServerController::class, 'createServer']);
Route::middleware(['auth:sanctum', 'permission:VM/update|role:admin|expert'])->put('edit-server', [ServerController::class, 'editServer']);
Route::middleware(['auth:sanctum', 'permission:VM/delete|role:admin|expert'])->delete('server-delete', [ServerController::class, 'deleteServer']);
Route::middleware(['auth:sanctum'])->post('test-connection', [ServerController::class, 'testConnection']);

                    // module
Route::middleware(['auth:sanctum', 'permission:module/read|role:admin|visitor|expert'])->get('show-config-module/{serverID}/{ModuleID}', [ModuleController::class, 'showConfigModule']);
Route::middleware(['auth:sanctum', 'role:admin|visitor|expert'])->get('show-all-servies-and-modules/{serverID}', [ModuleController::class, 'showAllServiseAndModulesInServer']);
Route::middleware(['auth:sanctum', 'permission:module/create|role:admin|expert'])->post('create-module', [ModuleController::class, 'createModule']);
Route::middleware(['auth:sanctum', 'permission:module/update|role:admin|expert'])->post('update-config-module', [ModuleController::class, 'updateConfigModule']);
Route::middleware(['auth:sanctum', 'permission:module/delete|role:admin|expert'])->delete('delete-module', [ModuleController::class, 'deleteModule']);
Route::middleware(['auth:sanctum', 'permission:module/update|role:admin|expert'])->delete('delete-config-module', [ModuleController::class, 'deleteConfigModule']);
Route::middleware(['auth:sanctum', 'permission:module/read|role:admin|expert'])->get('show-all-modules', [ModuleController::class, 'showAllModules']);
Route::middleware(['auth:sanctum', 'permission:module/delete|role:admin|expert'])->post('edit-module', [ModuleController::class, 'editModule']);

Route::middleware(['auth:sanctum', 'permission:module/update|role:admin|expert'])->post('restart-service-config', [ModuleController::class, 'restartServiceModule']);
Route::middleware(['auth:sanctum', 'permission:module/update|role:admin|expert'])->post('start-service-config', [ModuleController::class, 'startServiceModule']);
Route::middleware(['auth:sanctum', 'permission:module/update|role:admin|expert'])->post('stop-service-config', [ModuleController::class, 'stopServiceModule']);
Route::middleware(['auth:sanctum', 'permission:module/update|role:admin|expert'])->post('status-service-config', [ModuleController::class, 'statusServiceModule']);
// Route::middleware(['auth:sanctum', 'permission:module/update|role:admin|expert'])->post('start-service-config', [ModuleController::class, 'startServiceModule']);

Route::middleware(['auth:sanctum', 'permission:module/update|role:admin|expert'])->post('undo-module-config', [ModuleController::class, 'undoConfigModule']);
Route::middleware(['auth:sanctum', 'permission:module/update|role:admin|expert'])->post('undo-to-initial-config-modules', [ModuleController::class, 'undoToInitialConfigModule']);

Route::middleware(['auth:sanctum', 'permission:module/read|role:admin|expert'])->post('export-module-file', [ModuleController::class, 'expertModuleFileIsServer']);

        // power on | off server
Route::middleware(['auth:sanctum', 'permission:VM/status|role:admin|expert'])->post('server-stop', [ServerController::class, 'serverStop']);
Route::middleware(['auth:sanctum', 'permission:VM/status|role:admin|expert'])->post('server-start', [ServerController::class, 'ServerStart']);
Route::middleware(['auth:sanctum', 'role:admin|expert|visitor'])->post('server-status', [ServerController::class, 'serverStatus']);


Route::middleware(['auth:sanctum', 'permission:monitoring|role:admin|expert'])->get('show-address', [SystemSettingsController::class, 'showAllAddress']);
Route::middleware(['auth:sanctum', 'permission:monitoring|role:admin|expert'])->post('add-address', [SystemSettingsController::class,'addOrUpdateAddress']);



Route::get('download-file', function () {

    $command = 'cat ' . 'bbdh-2.6.6-noCg/install/etc/bbdh/'. 'mme' . '.yaml' ;

        $sshHelper = new sshHelper('192.168.19.81', 'siz-tel', '1');
        $output = $sshHelper->getFileContent($command);


        return response($output, 200, [
            'Content-Type' => 'application/octet-stream',
            'Content-Disposition' => "attachment; filename=mme.yaml",
            'Content-Length' => strlen($output),
        ]);

});
