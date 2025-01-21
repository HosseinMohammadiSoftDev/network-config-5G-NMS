<?php

namespace Modules\Server\Http\Controllers;

use Spyc;
use Exception;
use Illuminate\Http\Request;
use Modules\User\Models\User;
use Modules\Server\Models\Server;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Modules\Server\Helpers\SshHelper;
use Modules\User\Services\PaginationService;
use phpseclib3\Crypt\EC\Formats\Signature\SSH2;
use App\Http\Controllers\Contract\ApiController;
use Modules\Server\Http\Requests\TestConnectionRequest;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Modules\Server\Http\Requests\Server\EditServerReqest;
use Modules\Server\Http\Requests\Server\DeleteServerReqest;
use Modules\Server\Http\Requests\Server\CreateServerRequest;
use Modules\Server\Http\Requests\Server\UploadModuleRequest;
use Modules\Server\Http\Requests\Server\StartStopComandReqest;


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

        return $this->respondSuccess('Your server list', $servers);
    }

    public function createServer (CreateServerRequest $request)
    {
        $credentials = $request->validated();

        $server = Server::create($credentials);

        Log::channel('daily')->info('A new server has been created', [
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
        ->log('A new server has been created'
        );

        return $this->respondCreated('A new server has been created', $server);
    }
    public function editServer (EditServerReqest $request)
    {
        $credentials = $request->validated();

        $server = Server::find($credentials['server_id']);

        $server->update($credentials);

        Log::channel('daily')->info('this server edited', [
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
        ->log('this server edited');

        return $this->respondSuccess('this server updated', $server);
    }


    public function deleteAllModuleServer ($server, $host,$username, $password, $path)
    {
        $moduleNames = $server->modules->pluck('name');



                // ssh connection
        $command = 'rm -f' . $path . $module['name'] . '.yaml';
        SshHelper::runSshCommand($host, $username, $password, $command);


        foreach ($moduleNames as $moduleName)
        {
            $command = 'echo "' . addslashes($yamlContent) . '" > ' . $path . $module['name'] . '.yaml';
            SshHelper::runSshCommand($host, $username, $password, $command);
        }

    }
    public function deleteServer (DeleteServerReqest $request)
    {
        $credentials = $request->validated();

        $server = Server::find($credentials['server_id']);

        $host = $server['ip'];
        $username = $request->input('auth_name');
        $password = $request->input('password');
        $path = $request->input('path') ?? 'bbdh-2.6.6-noCg/install/etc/bbdh/';


        try {
                DB::beginTransaction();

                // delete all module server in VPS
            // $this->deleteAllModuleServer($server, $host, $username, $password, $path);

                // validate user authName and Password in delete server
            $user = User::whereRaw('BINARY auth_name = ?', [$credentials['auth_name']])->first();
            if (!$user || !Hash::check($credentials['password'], $user->password)) {

                activity('auth-name-or-passord-wrong')
                    ->causedBy(Auth::user())
                    ->event('login')
                    ->withProperties([
                        'type-log' => 'app',
                        'route' => request()->fullUrl(),
                        'method' => 'login',
                        'auth-name' => $credentials['auth_name'],
                        'password' => $credentials['password']
                    ])
                    ->log('The user entered an incorrect email or password during login.');

                    return response()->json(['msg' => 'You have entered an incorrect username or password'], 422);

            }

            $server->delete();

                DB::commit();
        } catch (Exception $e) {
                DB::rollBack();

            activity('exption-delete-all-module-server')
            ->causedBy(Auth::user())
            ->performedOn($server)
            ->event('delete')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'deleteServer',
                'server' => $server,
                'user' => Auth::user(),
            ])
            ->log('An issue occurred while deleting all server modules');
        }



        Log::channel('daily')->info('The server was successfully deleted', [
            'type-log' => 'server',
            'route' => request()->fullUrl(),
            'method' => 'deleteServer',
            'user' => Auth::user(),
            'server' => $server,
        ]);

        activity('delete-server')
            ->causedBy(Auth::user())
            ->performedOn($server)
            ->event('delete')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'deleteServer',
                'server' => $server,
                'user' => Auth::user(),
            ])
        ->log('The server was successfully deleted');

        return $this->respondSuccess('The server was successfully deleted', $server);
    }



    public function serverStop (StartStopComandReqest $request)
    {
        $credentials = $request->validated();

        $server = Server::find($credentials['server_id']);

        if ($server['is_down'] == 1)
            return response()->json(['The server is turned off', 422]);


        $server->update(['is_down' => 1]);
        $server->save();



        Log::channel('daily')->info('The server has been turned off', [
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
        ->log('The server was turned off');



        return $this->respondSuccess('The server was turned off', $server);
    }
    public function serverStart (StartStopComandReqest $request)
    {
        $credentials = $request->validated();

        $server = Server::find($credentials['server_id']);

        if ($server['is_down'] == 0)
            return response()->json(['The server is turned on', 422]);


        $server->update(['is_down' => 0]);
        $server->save();




        Log::channel('daily')->info('The server has been turned on', [
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
        ->log('The server has been turned on');


        return $this->respondSuccess('The server has been turned on', $server);
    }
    public function serverStatus (StartStopComandReqest $request)
    {
        $credentials = $request->validated();

        $server = Server::find($credentials['server_id']);
            if (!$server)
                return response()->json(['The server ID is invalid', 404]);


        $status = $server['is_down'] ? 'off' : 'on';

        return response()->json([$status]);
    }


    public function testConnection (TestConnectionRequest $request)
    {

        $creadtional = $request->validated();
        $server = Server::find($creadtional['server_id']);


                // is stop server
        if ($server['is_down'] == 1)
            return response()->json(['msg' => 'this off server'], 403);


            try {

                // $sshHelper = new sshHelper($server, $creadtional['username'], $creadtional['password']);
                // $sshHelper->testConnection();

            activity('server-connection')
            ->causedBy(Auth::user())
            ->event('successful-connection')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'showConfigModule',
                'user' => Auth::user(),
                'server' => $server,
            ])
            ->log('The connection to the server was successful');

            return response()->json(['msg'=> 'connect successful.'], 200);

        } catch (Exception $e) {
            return response()->json(['msg' => 'The connection to the server failed:' . $e->getMessage()], 500);
        }
    }
}

