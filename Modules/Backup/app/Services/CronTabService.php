<?php

namespace Modules\Backup\Services;

use Illuminate\Support\Facades\Process;

class CronTabService
{
    private $cronTime = '* * * * *';
    private $cronCommand;
    private $password;

    public function __construct(string $password)
    {
        $this->cronCommand = $this->cronTime . ' cd /home/mohammadi/Desktop/5G-back && php artisan schedule:run >> /dev/null 2>&1';
        $this->password = $password;
    }


    public function set() : void
    {
//        validate to not respite crontab record
        $listCommand  = "echo " . escapeshellarg($this->password) . " | sudo -S crontab -l 2>/dev/null";
        $currentCrons = Process::run($listCommand)->output() ?? '';

        if (str_contains($currentCrons, $this->cronCommand)) return; // EXIT



//            run command to system unix
        $execCommand = "echo '{$this->password}' | sudo -S sh -c '(crontab -l 2>/dev/null; echo \"{$this->cronCommand}\") | sudo crontab -'";

        $commandResult = Process::run($execCommand . ' 2>&1');

        if (! empty($commandResult->errorOutput()))
            throw new \RuntimeException('Crontab Error:' .  implode("\n", $commandResult->errorOutput()));
    }

}
