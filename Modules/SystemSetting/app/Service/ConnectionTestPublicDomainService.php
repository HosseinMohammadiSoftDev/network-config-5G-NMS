<?php

namespace Modules\SystemSetting\Service;

use Illuminate\Validation\ValidationException;

class ConnectionTestPublicDomainService
{
    public static function testConnection (string $ip)
    {
        try {

            exec("ping -c 1 -W 1 $ip", $output, $result);

            if ($result === 0)
                return true;

            return false;

        } catch (\Exception $e) {
            throw ValidationException::withMessages(['server_conenction' => 'The connection to the server failed:' . $e->getMessage()]);
        }
    }
}
