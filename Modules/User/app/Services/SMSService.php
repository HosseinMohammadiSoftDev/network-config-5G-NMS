<?php


namespace Modules\User\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class SMSService
{
    private const BASE_URL = 'https://sms.sunwaysms.com/smsws/HttpService.ashx';

    private Client $http;

    public function __construct(Client $client = null)
    {
        $this->http = $client ?? new Client([
            'base_uri' => self::BASE_URL,
            'timeout' => 30,
        ]);
    }


    public function sendMessage(
        string $username,
        string $password,
        array $recipientNumbers,
        string $message,
        string $sender,
        bool $isFlash,
        array $messageIds
    ): ?string {
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

        try {
            $response = $this->http->get('', [
                'query' => $params,
            ]);

            return $response->getBody()->getContents();
        } catch (GuzzleException $e) {
            return $e->getMessage();
        }
    }
}
