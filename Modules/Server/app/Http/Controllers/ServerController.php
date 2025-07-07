<?php

namespace Modules\Server\Http\Controllers;

use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Http\Request;
use Modules\Server\Models\Server;
use Illuminate\Support\Facades\DB;;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Modules\Server\Helpers\SshHelper;
use App\Http\Controllers\Contract\ApiController;
use Modules\Server\Http\Requests\TestConnectionRequest;
use Modules\Server\Http\Requests\Server\EditServerReqest;
use Modules\Server\Http\Requests\Server\DeleteServerReqest;
use Modules\Server\Http\Requests\Server\CreateServerRequest;
use Modules\Server\Http\Requests\Server\StartStopComandReqest;
use Modules\Server\Services\Paginate\PaginationService;


class ServerController extends ApiController
{
    protected $paginationService;
    public function __construct(PaginationService $paginationService)
    {
        $this->paginationService = $paginationService;
    }

    public function editServer (EditServerReqest $request)
    {
        $credentials = $request->validated();

        try {
            DB::beginTransaction();

            $server = Server::find($credentials['server_id']);
            $serverOldName = $server['name'];


        $server->update($credentials);

        activity('edit-server')
            ->causedBy(null)
            ->performedOn($server)
            ->event('edit-server')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'editServer',
                'server' => $server,
                'server_id' => $server?->id,
            ])
        ->log('this server edited');


            DB::commit();
                return response()->json(['msg' => 'this server updated', 'server' => $server, 'oldNameServer' => $serverOldName]);

        } catch (\Exception $e) {
            DB::rollBack();
                return response()->json(['msg' => $e->getMessage()],422);
        }
    }


    public function serverStop (StartStopComandReqest $request)
    {
        $credentials = $request->validated();

        $server = Server::find($credentials['server_id']);

        if ($server['is_down'] == Server::OFF)
            return response()->json(['The server is turned off', 422]);


        $server->update(['is_down' => Server::OFF]);
        $server->save();


        activity('server-stop')
            ->causedBy(null)
            ->performedOn($server)
            ->event('change-status-server')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'serverStart',
                'server' => $server,
                'server_id' => $server?->id
            ])
        ->log('The server was turned off');



        return $this->respondSuccess('The server was turned off', $server);
    }
    public function serverStart (StartStopComandReqest $request)
    {
        $credentials = $request->validated();

        $server = Server::find($credentials['server_id']);

        if ($server['is_down'] == Server::ON)
            return response()->json(['The server is turned on', 422]);


        $server->update(['is_down' => Server::ON]);
        $server->save();


        activity('server-start')
            ->causedBy(null)
            ->performedOn($server)
            ->event('change-server-status')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'serverStart',
                'server' => $server,
                'server_id' => $server?->id,
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
        if ($server['is_down'] == Server::OFF)
            throw ValidationException::withMessages(['server' => 'this off server']);


            try {

                 $sshHelper = new sshHelper($server, $creadtional['username'], $creadtional['password']);
                 $sshHelper->testConnection();


            activity('test-connection')
            ->causedBy(null)
            ->event('test-connection')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'showConfigModule',
                'server' => $server,
                'server_id' => $server?->id
            ])
            ->log('The connection to the server was successful');

            return response()->json(['success' => true, 'msg'=> 'connect successful.'], 200);

        } catch (Exception $e) {
                throw ValidationException::withMessages(['server_conenction' => 'The connection to the server failed:' . $e->getMessage()]);
        }
    }
}

