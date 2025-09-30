<?php

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schedule;
use Modules\Backup\Models\BackupConfig;
use Modules\Backup\Services\BackupService;

Schedule::call(function () {

    $backupService = new BackupService();

    $backupConfig = BackupConfig::query()
        ->whereTime('run_backup_at', '>=', now())
        ->first();


    if ($backupConfig) $backupService->handle($backupConfig);

})->everyMinute();
