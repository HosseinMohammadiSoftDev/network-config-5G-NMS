<?php

namespace Modules\Backup\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Backup\Http\Requests\ConfigBackup\EditBackupConfigRequest;
use Modules\Backup\Http\Requests\ConfigBackup\SetConfigBackupRequest;
use Modules\Backup\Http\Requests\TimeCronJob\SetTimeCronJobAndDestinationPathBackupRequest;
use Modules\Backup\Http\Requests\TimeCronJob\SetTimeCronJobBackupRequest;
use Modules\Backup\Models\BackupConfig;
use Modules\Backup\Models\BackupHistory;
use Modules\Backup\Services\BackupService;
use Modules\Backup\Services\CronTabService;

class BackupController extends Controller
{
    public function __construct() {}

    public function index (Request $request): JsonResponse
    {
        $backupConfig = BackupConfig::when($request->input('take'),
            fn ($query) => $query->orderBy('run_backup_at', $request->input('order', 'desc'))
            ->take($request->input('take'))
        )->get();

        return response()->json(['success' => true, 'data' => $backupConfig]);
    }
    public function create (SetConfigBackupRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        try {
            DB::beginTransaction();

            $backupConfig = BackupConfig::create($credentials);

//                    set cron job
            $cronTabService = new CronTabService($credentials['password']);
            $cronTabService->set();

            DB::commit();
            return response()->json(['success' => true, 'msg' => 'set config backup successFully', 'data' => $backupConfig], 200);

        } catch (\RuntimeException $e) {
            throw $e;
        } catch (\Exception $e) {
            DB::rollback();
                return response()->json(['success' => false, 'msg' => $e->getMessage()], 500);
        }
    }
    public function edit (EditBackupConfigRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        try {
            DB::beginTransaction();

                $backupConfig = tap(BackupConfig::find($credentials['id']))
                    ->update($credentials);

            DB::commit();
                return response()->json(['success' => true, 'msg' => 'edit config backup successFully', 'data' => $backupConfig], 200);

        } catch (\Exception $e) {
            DB::rollback();
                throw $e;
        }
    }
    public function destroy (BackupConfig $backupConfig): JsonResponse
    {
        try {
            DB::beginTransaction();

                tap($backupConfig->delete());

            DB::commit();
                return response()->json(['success' => true, 'msg' => 'deleted backup config successFul', 'data' => $backupConfig], 200);

        } catch (\Exception $e) {
            DB::rollback();
                throw $e;
        }
    }



    public function getHistoryBackup (Request $request): JsonResponse
    {
        return response()->json(['success' => true, 'data' => BackupHistory::cursor()]);
    }
}
