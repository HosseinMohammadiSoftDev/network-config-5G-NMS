<?php

namespace Modules\Server\Helpers;

use Exception;
use Illuminate\Http\Exceptions\HttpResponseException;
use phpseclib3\Net\SSH2;
use InvalidArgumentException;
use PHPUnit\Event\Code\Throwable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class SshHelper
{
    protected $ssh;

    public function __construct(private $server, private $username, private $password)
    {
        $this->ssh = new SSH2($server['ip']);

        if (!$this->ssh->login($username, $password)) {
            $this->logActivity('failed-connection-server', 'constructor');
            throw new HttpResponseException(response()->json(['msg' => 'Your server login credentials are incorrect.'], 422));
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
                'user' =>  Auth::user()->makeHidden(['roles', 'permissions'])->toArray(),
                'user_role' =>Auth::user()->roles()->pluck('name')->first(),                'host' => $this->server['ip'],
                'username' => $this->username,
                'server' => $this->server
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

            $this->logActivity('run-command', 'runCommand');

            return $output;
        } catch (Exception $e) {
            $this->logActivity('failed-command', 'runCommand', ['Error' => $e, ]);
            throw $e;
        }
    }
    public function restartModule($command)
    {
        $output = $this->runCommand($command);

        if (str_contains($output, 'FATAL') || str_contains($output, 'ERROR')) {
            $this->logActivity('module-error', 'restartModule', ['command' => $command, 'output' => $output]);
            throw new InvalidArgumentException($output);
        }
        else
            $this->logActivity('module-restart', 'restartModule');


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
