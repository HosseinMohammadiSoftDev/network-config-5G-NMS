<?php

namespace Modules\Server\Helpers;

use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use phpseclib3\Net\SSH2;
use PHPUnit\Event\Code\Throwable;

class SshHelper
{
    protected $host;
    protected $username;
    protected $password;
    protected $ssh;

    public function __construct($host, $username, $password)
    {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;

        $this->ssh = new SSH2($host);

        if (!$this->ssh->login($username, $password)) {
            $this->logActivity('failed-connection-server', 'constructor');
            throw new Exception('Your server login credentials are incorrect.');
        }
    }

        // log
    protected function logActivity($event, $method, $extra = [])
    {
        activity($event)
            ->causedBy(Auth::user())
            ->event($event)
            ->withProperties(array_merge([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => $method,
                'user' => Auth::user(),
                'host' => $this->host,
                'username' => $this->username,
            ], $extra))
            ->log($event);
    }

    public function runCommand($command)
    {
        try {
            $this->ssh->write("sudo -S su\n");
            $this->ssh->write("{$this->password}\n");
            $this->ssh->read('[prompt]');

            $this->ssh->write("$command\n");
            $output = $this->ssh->read('[prompt]');

            $this->logActivity('run-command', 'runCommand', ['command' => $command]);

            return $output;
        } catch (Exception $e) {
            $this->logActivity('failed-command', 'runCommand', ['command' => $command]);
            throw $e;
        }
    }
    public function restartModule($command)
    {
        $output = $this->runCommand($command);

        if (str_contains($output, 'FATAL') || str_contains($output, 'ERROR'))
            $this->logActivity('module-error', 'restartModule', ['command' => $command, 'output' => $output]);
        else
            $this->logActivity('module-restart', 'restartModule', ['command' => $command]);


        return $output;
    }
    public function getFileContent($command)
    {
        $fileContent = $this->ssh->exec($command);

        $this->logActivity('export-file', 'getFileContent', ['command' => $command]);

        return $fileContent;
    }
    public function testConnection()
    {
        $this->logActivity('connection-test', 'testConnection');
        return true;
    }
}
