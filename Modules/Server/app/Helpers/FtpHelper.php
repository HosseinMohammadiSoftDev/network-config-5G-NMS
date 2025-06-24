<?php

namespace Modules\Server\Helpers;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Modules\Server\Models\Module;
use phpseclib3\Net\SSH2;

class FtpHelper
{
    protected $ssh;

    public function __construct(private $server, private $username, private $password)
    {

        if (!$this->ssh || !$this->ssh->isConnected())
            $this->ssh = new SSH2($this->server['ip']);

        if (!$this->ssh->login($username, $password)) {
            $this->logActivity('failed-connection-server', 'constructor');
            throw new HttpResponseException(response()->json(['msg' => 'Your server login credentials are incorrect.'], 422));
        }
    }

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

    public function downloadFile(string $remotePath, string $localPath): void
    {
        $sftp = new \phpseclib3\Net\SFTP($this->server['ip']);

        if (!$sftp->login($this->username, $this->password)) {
            $this->logActivity('failed-sftp-login', 'downloadFile');
            throw new \Illuminate\Http\Exceptions\HttpResponseException(
                response()->json(['msg' => 'SFTP login failed.'], 422)
            );
        }

        $fileContent = $sftp->get($remotePath);
        if ($fileContent === false) {
            $this->logActivity('sftp-download-error', 'downloadFile', ['remotePath' => $remotePath]);
            throw new \RuntimeException("Failed to download remote file: $remotePath");
        }


        $dir = dirname($localPath);
        if (!is_dir($dir))
            mkdir($dir, 0777, true);


        file_put_contents($localPath, $fileContent);

        $this->logActivity('sftp-download-success', 'downloadFile', [
            'remotePath' => $remotePath,
            'localPath' => $localPath,
        ]);
    }
    public function uploadFile (Module $module, string $fileContent): void
    {
        $sftp = new \phpseclib3\Net\SFTP($this->server['ip']);

        if (!$sftp->login($this->username, $this->password)) {
            $this->logActivity('failed-sftp-login', 'uploadFile');
            throw new \Illuminate\Http\Exceptions\HttpResponseException(
                response()->json(['msg' => 'SFTP login failed.'], 422)
            );
        }


        $fullPath = $module['path_config'] . $module['name'] . '.' . $module['extension'];

        $fileContent = $sftp->put($fullPath, $fileContent);
        if ($fileContent === false) {
            $this->logActivity('sftp-upload-error', 'uploadFile', ['remotePath' => $module['path_config']]);
            throw new \RuntimeException("Failed to upload remote file: {$module['path_config']}");
        }


        $dir = dirname($module['path_config']);
        if (!is_dir($dir))
            mkdir($dir, 0777, true);



        $this->logActivity('sftp-upload-success', 'uploadFile', [
            'remotePath' => $module['path_config'],
            'file_name' => $module['name']
        ]);
    }
    public function deleteFile (Module $module): void
    {
        $sftp = new \phpseclib3\Net\SFTP($this->server['ip']);

        if (!$sftp->login($this->username, $this->password)) {
            $this->logActivity('failed-sftp-login', 'deleteFile');
            throw new \Illuminate\Http\Exceptions\HttpResponseException(
                response()->json(['msg' => 'SFTP login failed.'], 422)
            );
        }

        $remotePath = $module['path_config'] . $module['name'] . '.' . $module['extension'];

        $result = $sftp->delete($remotePath);
        if ($result === false) {
            $this->logActivity('sftp-delete-error', 'deleteFile', ['remotePath' => $remotePath]);
            throw new \RuntimeException("Failed to delete remote file: $remotePath");
        }

        $this->logActivity('sftp-delete-success', 'deleteFile', ['remotePath' => $remotePath]);
    }
}
