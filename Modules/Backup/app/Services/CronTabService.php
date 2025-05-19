<?php

namespace Modules\Backup\Services;

class CronTabService
{
    public function __construct()
    {

    }


    public static function handel($runBackupDaily)
    {
        $cronTime = ($runBackupDaily > 1) ? "0 12 */$runBackupDaily * *" : '0 12 * * *';
        $command = $cronTime . ' cd /var/www/html/back-end && php artisan backup:run >> /dev/null 2>&1';

//            run command to system
        exec("(crontab -l 2>/dev/null; echo \"$command\") | crontab -");

    }

}
