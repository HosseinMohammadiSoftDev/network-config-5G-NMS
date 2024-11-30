<?php 

namespace Modules\Server\Helpers;

use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use phpseclib3\Net\SSH2;

class SshHelper
{

    public static function runSshCommand($host, $username, $password, $command)
    {
        $ssh = new SSH2($host);

        if (!$ssh->login($username, $password)) {

            Log::channel('daily')->error('اطلاعات شما برای ورود به سرور اشتباه است', [
                'route' => request()->fullUrl(),
                'method' => 'runSshCommand',
                'user' => Auth::id(),
                'host' => $host,
                'userName' => $username,
                'password' => $password,
            ]);

            throw new Exception('اطلاعات شما برای ورود به سرور اشتباه است');
        }

            try {
                $output = $ssh->exec($command);
                
                Log::channel('daily')->info('کامند با موفقیت اجرا شد', [
                    'route' => request()->fullUrl(),
                    'method' => 'runSshCommand',
                    'user_id' => Auth::id(),
                    'command' => $command,
                    'host' => $host,
                    'userName' => $username,
                    'password' => $password
                  ]); 

            } catch (Exception $e) {

                Log::channel('daily')->error('مشکلی در روند اجرای کامند به وجود امد', [
                    'route' => request()->fullUrl(),
                    'method' => 'runSshCommand',
                    'error' => $e->getMessage(),
                    'user_id' => Auth::id(),
                    'command' => $command,
                    'host' => $host,
                    'userName' => $username,
                    'password' => $password
                  ]);
            }

        return $output;
    }



    public static function testConnection($host, $username, $password)
    {
        $ssh = new SSH2($host);

        if (!$ssh->login($username, $password)) {
            Log::channel('daily')->error('اطلاعات شما برای ورود به سرور اشتباه است', [
                'route' => request()->fullUrl(),
                'method' => 'testConnection',
                'user' => Auth::user(),
                'host' => $host,
                'userName' => $username,
                'password' => $password,
            ]);


            activity('ssh-connection')
                ->causedBy(Auth::user())
                ->event('failed-connection')
                ->withProperties([
                    'type-log' => 'server',
                    'route' => request()->fullUrl(),
                    'method' => 'testConnection',
                    'host' => $host,
                    'userName' => $username,
                    'password' => $password,
                ])
            ->log('اطلاعات شما برای ورود به سرور اشتباه است');

            throw new Exception('اطلاعات شما برای ورود به سرور اشتباه است');
        }

        return true;
    }
}