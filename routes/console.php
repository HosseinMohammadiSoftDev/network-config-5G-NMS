<?php

use Modules\Server\Models\ModuleSchedule;
use Illuminate\Support\Facades\Schedule;
use Modules\Backup\Models\BackupConfig;
use Modules\Backup\Services\BackupService;
use Modules\Server\Service\Schedule\ModuleScheduleService;

Schedule::call(function () {

    $backupService         = new BackupService();
    $runBackup             = new \Modules\Backup\Services\RunBackupDueLastRun();
    $moduleScheduleService = new ModuleScheduleService();
    $backupConfigs         = BackupConfig::get();

    foreach ($backupConfigs as $backupConfig) {

        if ($runBackup->handel($backupConfig->last_run_backup_at ?? $backupConfig->created_at, $backupConfig->run_backup_at))
            $backupService->handle($backupConfig);
    }


    $moduleSchedule = ModuleSchedule::query()
        ->whereTime('run_scheduled_at', '>=', now())
        ->find();

    if ($moduleSchedule) $moduleScheduleService->handle($moduleSchedule);

})->everyMinute();
