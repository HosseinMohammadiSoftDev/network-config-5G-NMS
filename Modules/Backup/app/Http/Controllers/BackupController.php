<?php

namespace Modules\Backup\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Backup\Http\Requests\ConfigBackup\SetConfigBackupRequest;
use Modules\Backup\Http\Requests\TimeCronJob\SetTimeCronJobAndDestinationPathBackupRequest;
use Modules\Backup\Http\Requests\TimeCronJob\SetTimeCronJobBackupRequest;
use Modules\Backup\Models\BackupConfig;
use Modules\Backup\Models\BackupHistory;
use Modules\Backup\Services\CronTabService;
use Modules\SystemSetting\Models\SystemSettings;

class BackupController extends Controller
{
    public function __construct() {}

    public function getConfigBackup (Request $request)
    {
        return response()->json(['success' => true, 'data' => BackupConfig::cursor()]);
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



//      history backup
    public function getHistoryBackup (Request $request)
    {
        return response()->json(['success' => true, 'data' => BackupHistory::cursor()]);
    }
}
