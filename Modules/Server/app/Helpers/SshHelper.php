<?php

namespace Modules\Server\Helpers;

use Exception;
use Illuminate\Validation\ValidationException;
use phpseclib3\Net\SSH2;
use InvalidArgumentException;
use Illuminate\Support\Facades\Auth;

class SshHelper
{
    protected $ssh;

    public function __construct(private $server, private $username, private $password)
    {
        $this->ssh = new SSH2($server['ip']);

        if (!$this->ssh->login($username, $password)) {
            $this->logActivity('failed-connection-server', 'constructor');
                throw ValidationException::withMessages(['server-login' => 'Your server login credentials are incorrect.']);
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
                'user_role' =>Auth::user()->roles()->pluck('name')->first(),
                'host' => $this->server['ip'],
                'username' => $this->username,
                'server' => $this->server
            ], $extra))
            ->log($event);
    }

    public function runCommand($command)
    {
        try {
            $this->ssh->setTimeout(1);

            $this->ssh->write("sudo -S su\n");
            $this->ssh->write("{$this->password}\n");
            $this->ssh->read();

            $this->ssh->write("$command\n");
            $output = $this->ssh->read();

            $this->logActivity('run-command', 'runCommand');

            return $output;
        } catch (Exception $e) {
            $this->logActivity('failed-command', 'runCommand', ['Error' => $e, ]);
            throw $e;
        }
    }
    public function getFileContent($command)
    {
        $fileContent = $this->ssh->exec($command);

        $this->logActivity('export-file', 'getFileContent', ['command' => $command]);

        return $fileContent;
    }
    public function testConnection()
    {
        return true;
    }



    public function runCommandModule($command, $typeCommand, $method, $server)
    {
        $output = $this->runCommand($command);

        if (str_contains($output, 'FATAL') || str_contains($output, 'ERROR')) {
            $this->logActivity('module-error', $method,
                ['command' => $command, 'output' => $output, 'server_id' => $server?->id]);
            throw new InvalidArgumentException($output);
        }
        else
            $this->logActivity($typeCommand, $method,
                ['command' => $command, 'output' => $output, 'server_id' => $server?->id]);


        return $output;
    }

}
