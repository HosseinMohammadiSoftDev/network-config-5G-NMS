<?php 

namespace Modules\Server\Helpers;

use Exception;
use phpseclib3\Net\SSH2;

class SshHelper
{

    public static function runSshCommand($host, $username, $password, $command)
    {
        $ssh = new SSH2($host);

        if (!$ssh->login($username, $password)) 
            throw new Exception('اطلاعات شما اشتباه است');

        $output = $ssh->exec($command);

        return $output;
    }
}