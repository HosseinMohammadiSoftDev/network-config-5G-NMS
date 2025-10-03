<?php

use Modules\Server\Models\ModuleSchedule;
use Illuminate\Support\Facades\Schedule;
use Modules\Backup\Models\BackupConfig;
use Modules\Backup\Services\BackupService;
use Modules\Server\Service\Schedule\ModuleScheduleService;

Schedule::call(function () {

    $backupService  = new BackupService();
    $moduleScheduleService = new ModuleScheduleService();

    $backupConfig = BackupConfig::query()
        ->whereTime('run_backup_at', '>=', now())
        ->first();

    if ($backupConfig) $backupService->handle($backupConfig);


    $moduleSchedule = ModuleSchedule::query()
        ->whereTime('run_scheduled_at', '>=', now())
        ->find();

    if ($moduleSchedule) $moduleScheduleService->handle($moduleSchedule);

})->everyMinute();
