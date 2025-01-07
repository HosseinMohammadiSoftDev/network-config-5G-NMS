<?php

namespace Modules\Server\Helpers;

use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use phpseclib3\Net\SSH2;
use PHPUnit\Event\Code\Throwable;

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

            activity('run-ssh-command')
                ->causedBy(Auth::user())
                ->event('run-ssh-command')
                ->withProperties([
                    'type-log' => 'server',
                    'route' => request()->fullUrl(),
                    'method' => 'runSshCommand',
                    'user' => Auth::user(),
                    'host' => $host,
                    'userName' => $username,
                    'password' => $password,
                ])
            ->log('اطلاعات شما برای ورود به سرور اشتباه است');

            throw new Exception('اطلاعات شما برای ورود به سرور اشتباه است');
        }

            try {
                  // sudo su and command
            $ssh->write("sudo -S su\n");
            $ssh->write("$password\n");

            $output = $ssh->read('[prompt]');

            $ssh->write("$command\n");
            $output = $ssh->read('[prompt]');

                Log::channel('daily')->info('کامند با موفقیت اجرا شد', [
                    'route' => request()->fullUrl(),
                    'method' => 'runSshCommand',
                    'user' => Auth::user(),
                    'command' => $command,
                    'host' => $host,
                    'userName' => $username,
                    'password' => $password
                  ]);

                  activity('run-ssh-command')
                      ->causedBy(Auth::user())
                      ->event('run-ssh-command')
                      ->withProperties([
                          'type-log' => 'server',
                          'route' => request()->fullUrl(),
                          'method' => 'runSshCommand',
                          'user' => Auth::user(),
                          'command' => $command,
                          'host' => $host,
                          'userName' => $username,
                          'password' => $password
                      ])
                ->log('کامند با موفقیت اجرا شد');

            } catch (Exception $e) {

                Log::channel('daily')->error('مشکلی در روند اجرای کامند به وجود امد', [
                    'route' => request()->fullUrl(),
                    'method' => 'runSshCommand',
                    'error' => $e->getMessage(),
                    'user' => Auth::user(),
                    'command' => $command,
                    'host' => $host,
                    'userName' => $username,
                    'password' => $password
                  ]);


                activity('run-ssh-command')
                    ->causedBy(Auth::user())
                    ->event('run-ssh-command')
                    ->withProperties([
                        'type-log' => 'server',
                        'route' => request()->fullUrl(),
                        'method' => 'runSshCommand',
                        'user' => Auth::user(),
                        'command' => $command,
                        'host' => $host,
                        'userName' => $username,
                        'password' => $password
                    ])
                ->log('مشکلی در روند اجرای کامند به وجود امد');
            }

        return $output;
    }

    public static function restartModule($host, $username, $password, $command)
    {
        $ssh = new SSH2($host);

        if (!$ssh->login($username, $password)) {
            Log::channel('daily')->error('اطلاعات شما برای ورود به سرور اشتباه است', [
                'route' => request()->fullUrl(),
                'method' => 'restartModule',
                'user' => Auth::id(),
                'host' => $host,
                'userName' => $username,
                'password' => $password,
            ]);

            activity('restart-ssh-module')
                ->causedBy(Auth::user())
                ->event('restart-ssh-module')
                ->withProperties([
                    'type-log' => 'server',
                    'route' => request()->fullUrl(),
                    'method' => 'restartModule',
                    'user' => Auth::user(),
                    'host' => $host,
                    'userName' => $username,
                    'password' => $password,
                ])
                ->log('اطلاعات شما برای ورود به سرور اشتباه است');

            throw new Exception('اطلاعات شما برای ورود به سرور اشتباه است');
        }

        try {

            $ssh->write("sudo -S su\n");
            $ssh->write("$password\n");

            $output = $ssh->read('[prompt]');

            $ssh->write("$command\n");
            $output = $ssh->read('[prompt]');


            if (str_contains($output, 'FATAL') || str_contains($output, 'ERROR')) {
                Log::channel('daily')->error('خطا در اجرای دستور روی سرور', [
                    'route' => request()->fullUrl(),
                    'method' => 'runSshCommand',
                    'user' => Auth::user(),
                    'command' => $command,
                    'host' => $host,
                    'output' => $output,
                ]);

                activity('run-ssh-command')
                    ->causedBy(Auth::user())
                    ->event('run-ssh-command')
                    ->withProperties([
                        'type-log' => 'server',
                        'route' => request()->fullUrl(),
                        'method' => 'runSshCommand',
                        'user' => Auth::user(),
                        'command' => $command,
                        'host' => $host,
                        'output' => $output,
                    ])
                    ->log('خطا در اجرای دستور روی سرور');


                return $output;
            }


            Log::channel('daily')->info('ماژول با موفقیت ریستارت شد', [
                'route' => request()->fullUrl(),
                'method' => 'restartModule',
                'user' => Auth::user(),
                'host' => $host,
                'userName' => $username,
            ]);

            activity('restart-ssh-module')
                ->causedBy(Auth::user())
                ->event('restart-ssh-module')
                ->withProperties([
                    'type-log' => 'server',
                    'route' => request()->fullUrl(),
                    'method' => 'restartModule',
                    'user' => Auth::user(),
                    'host' => $host,
                    'userName' => $username,
                ])
                ->log('ماژول با موفقیت ریستارت شد');

        } catch (Exception $e) {
            Log::channel('daily')->error('مشکلی در روند ریستارت ماژول به وجود آمد', [
                'route' => request()->fullUrl(),
                'method' => 'restartModule',
                'error' => $e->getMessage(),
                'user' => Auth::user(),
                'host' => $host,
                'userName' => $username,
                'password' => $password,
            ]);

            activity('restart-ssh-module')
                ->causedBy(Auth::user())
                ->event('restart-ssh-module')
                ->withProperties([
                    'type-log' => 'server',
                    'route' => request()->fullUrl(),
                    'method' => 'restartModule',
                    'user' => Auth::user(),
                    'host' => $host,
                    'userName' => $username,
                ])
                ->log('مشکلی در روند ریستارت ماژول به وجود آمد');
        }

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
