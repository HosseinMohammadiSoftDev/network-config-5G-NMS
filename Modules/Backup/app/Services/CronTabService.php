<?php

namespace Modules\Backup\Services;

class CronTabService
{
    public function __construct()
    {

    }


    public static function handel($runBackupDaily, string $password)
    {
        $cronTime = ($runBackupDaily > 1) ? "0 12 */$runBackupDaily * *" : '0 12 * * *';
        $cronCommand = $cronTime . ' cd /var/www/html/back-end && php artisan backup:run >> /dev/null 2>&1';

//            run command to system
        $execCommand = "echo '{$password}' | sudo -S sh -c '(crontab -l 2>/dev/null; echo \"{$cronCommand}\") | sudo crontab -'";

        exec($execCommand . ' 2>&1', $output, $returnVar);

//        error to run exec command
        if ($returnVar !== 0)
            throw new \RuntimeException('Crontab Error:' .  implode("\n", $output));

    }

}
