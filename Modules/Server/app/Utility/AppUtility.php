<?php

namespace Modules\Server\Utility;

use Illuminate\Validation\ValidationException;

class AppUtility
{
    public static function validatePasswordCurrentServer(string $password): bool
    {
        $password = escapeshellarg($password);
        $command  = "sshpass -p {$password} ssh -T -o StrictHostKeyChecking=no -o ConnectTimeout=5 root@127.0.0.1 'echo success' 2>&1";

        $output = [];
        $returnCode = 0;
        exec($command, $output, $returnCode);

        if (!$returnCode === 0 && !in_array('success', $output))
            return false;


        return true;
    }
}
