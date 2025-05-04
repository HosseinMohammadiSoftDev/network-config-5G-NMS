<?php


namespace Modules\User\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class SMSService
{

    public function sendMessageAsync(
        string $username,
        string $password,
        array $recipientNumbers,
        string $message,
        string $sender,
        bool $isFlash,
        array $messageIds
    ): bool {
        $params = [
            'service'       => 'SendArray',
            'UserName'      => $username,
            'Password'      => $password,
            'To'            => implode(',', $recipientNumbers),
            'Message'       => $message,
            'From'          => $sender,
            'Flash'         => $isFlash ? 'true' : 'false',
            'chkMessageId'  => implode(',', $messageIds),
        ];

        $query = http_build_query($params);
        $url = env('SUN_WAY_SMS_ADDRESS') . '?' . $query;

        exec("curl -s \"$url\" > /dev/null 2>&1 &");

        return true;
    }
}
