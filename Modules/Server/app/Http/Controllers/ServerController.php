<?php

namespace Modules\Server\Http\Controllers;

use App\Http\Controllers\Contract\ApiController;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Modules\Server\Helpers\SshHelper;
use Modules\Server\Http\Requests\Server\CreateServerRequest;
use Modules\Server\Http\Requests\Server\EditServerReqest;
use Modules\Server\Http\Requests\Server\StartStopComandReqest;
use Modules\Server\Http\Requests\Server\UploadModuleRequest;
use Modules\Server\Http\Requests\TestConnectionRequest;
use Modules\Server\Models\Server;
use Modules\User\Services\PaginationService;
use Spyc;
use Symfony\Component\HttpFoundation\File\UploadedFile;


class ServerController extends ApiController
{
    protected $paginationService;
    public function __construct(PaginationService $paginationService)
    {
        $this->paginationService = $paginationService;
    }

    public function showAllServers (Request $request)
    {
        $servers = Server::all();

        return $this->respondSuccess('لیست سرور های شما', $servers);
    }

    public function createServer (CreateServerRequest $request)
    {
        $credentials = $request->validated();

        $server = Server::create($credentials);

        Log::channel('daily')->info('سرور جدید ساخته شد', [
            'type-log' => 'server',
            'route' => request()->fullUrl(),
            'method' => 'createServer',
            'user' => Auth::user(),
            'server' => $server,
        ]);


        activity('create-server')
            ->causedBy(Auth::user())
            ->performedOn($server)
            ->event('create-server')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'createServer',
                'server' => $server,
                'user' => Auth::user(),
            ])
        ->log('سرور جدید ساخته شد');

        return $this->respondCreated('سرور با موفقیت ساخته شد', $server);
    }
    public function editServer (EditServerReqest $request)
    {
        $credentials = $request->validated();

        $server = Server::find($credentials['server_id']);

        $server->update($credentials);

        Log::channel('daily')->info('سرور بهروزرسانی شد', [
            'type-log' => 'server',
            'route' => request()->fullUrl(),
            'method' => 'editServer',
            'user' => Auth::user(),
            'server' => $server,
        ]);


        activity('edit-server')
            ->causedBy(Auth::user())
            ->performedOn($server)
            ->event('create-server')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'editServer',
                'server' => $server,
                'user' => Auth::user(),
            ])
        ->log('سرور بهروزرسانی شد');

        return $this->respondSuccess('سرور بهروزرسانی شد', $server);
    }



    public function serverStart (StartStopComandReqest $request)
    {
        $credentials = $request->validated();

        $server = Server::find($credentials['server_id']);

        if ($server['is_down'] == 1)
            return response()->json(['سرور خاموش میباشد ', 422]);


        $server->update(['is_down' => 1]);
        $server->save();



        Log::channel('daily')->info('سرور خاموش شد', [
            'type-log' => 'server',
            'route' => request()->fullUrl(),
            'method' => 'serverStart',
            'user' => Auth::user(),
            'server' => $server,
        ]);


        activity('server-stop')
            ->causedBy(Auth::user())
            ->performedOn($server)
            ->event('change-status-server')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'serverStart',
                'server' => $server,
                'user' => Auth::user(),
            ])
        ->log('سرور خاموش شد');



        return $this->respondSuccess(' سرور باموفقیت خاموش شد', $server);
    }
    public function serverStop (StartStopComandReqest $request)
    {
        $credentials = $request->validated();

        $server = Server::find($credentials['server_id']);

        if ($server['is_down'] == 0)
            return response()->json(['سرور روشن میباشد ', 422]);


        $server->update(['is_down' => 0]);
        $server->save();




        Log::channel('daily')->info('سرور روشن شد', [
            'type-log' => 'server',
            'route' => request()->fullUrl(),
            'method' => 'serverStart',
            'user' => Auth::user(),
            'server' => $server,
        ]);


        activity('server-start')
            ->causedBy(Auth::user())
            ->performedOn($server)
            ->event('change-server-status')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'serverStart',
                'server' => $server,
                'user' => Auth::user(),
            ])
        ->log('سرور روشن شد');


        return $this->respondSuccess(' سرور باموفقیت روشن شد', $server);
    }
    public function serverStatus (StartStopComandReqest $request)
    {
        $credentials = $request->validated();

        $server = Server::find($credentials['server_id']);
            if (!$server)
                return response()->json(['شناسه سرور معتبر نیست', 404]);


        $status = $server['is_down'] ? 'خاموش' : 'روشن';

        return response()->json([$status]);
    }


    public function testConnection (TestConnectionRequest $request)
    {

        $creadtional = $request->validated();
        $server = Server::find($creadtional['server_id']);


                // پارامترهای اتصال به سرور
        $sshHost = $server['ip'];
        $sshUsername = $creadtional['username'];
        $sshPassword = $creadtional['password'];

                // is stop server
        if ($server['is_down'] == 1)
            return response()->json(['msg' => 'سرور خاموش است'], 403);


            try {
            SshHelper::testConnection($sshHost, $sshUsername, $sshPassword);

            Log::channel('daily')->info('اتصال به سرور موفقیت آمیز بود', [
            'route' => request()->fullUrl(),
            'method' => 'showConfigModule',
            'user' => Auth::user(),
            'server' => $server
            ]);


            activity('server-connection')
            ->causedBy(Auth::user())
            ->event('successful-connection')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'showConfigModule',
                'user' => Auth::user(),
                'server' => $server,
                'host' => $sshHost,
                'userName' => $sshUsername
            ])
            ->log('اتصال به سرور موفقیت آمیز بود');



        } catch (Exception $e) {
            Log::channel('daily')->error('اتصال به سرور ناموفق بود', [
                'route' => request()->fullUrl(),
                'method' => 'showConfigModule',
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
                'host' => $sshHost,
                'userName' => $sshUsername
            ]);

            return response()->json(['msg' => 'اتصال به سرور ناموفق بود: ' . $e->getMessage()], 500);
        }
    }
}

