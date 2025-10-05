<?php

namespace Modules\Server\Http\Controllers;

use App\Http\Controllers\Contract\ApiController;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Modules\Server\Http\Requests\Server\EditServerReqest;
use Modules\Server\Http\Requests\Server\StartStopComandReqest;
use Modules\Server\Models\Server;
use Modules\Server\Services\Paginate\PaginationService;
use Modules\Server\Services\SyncData\GeterDataService;

class ServerController extends ApiController
{
    public function __construct(
        private PaginationService $paginationService,
        private GeterDataService $geterDataService
    ){}

    public function getMyServerData()
    {
        return response()->json([
            'success' => true,
            'data' => Server::exists()
                ? Server::first()
                : $this->geterDataService->getDataServer()['data'],
        ]);
    }

    public function editServer(EditServerReqest $request)
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

            return response()->json(['msg' => $e->getMessage()], 422);
        }
    }

    public function serverStop(StartStopComandReqest $request)
    {
        $credentials = $request->validated();

        $server = Server::find($credentials['server_id']);

        if ($server['is_down'] == Server::OFF) return response()->json(['The server is turned off', 422]);

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
                'server_id' => $server?->id,
            ])
            ->log('The server was turned off');

        return $this->respondSuccess('The server was turned off', $server);
    }

    public function serverStart(StartStopComandReqest $request)
    {
        $credentials = $request->validated();

        $server = Server::find($credentials['server_id']);

        if ($server['is_down'] == Server::ON) return response()->json(['The server is turned on', 422]);


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

    public function serverStatus(StartStopComandReqest $request)
    {
        $credentials = $request->validated();

        $server = Server::find($credentials['server_id']);
        if (! $server) return response()->json(['The server ID is invalid', 404]);

        $status = $server['is_down'] ? 'off' : 'on';

        return response()->json([$status]);
    }

    public function testConnection()
    {
        try {

            $ip = env('NMS_UNIQUE_IP');

            exec("ping -c 1 -W 1 $ip", $output, $result);

            if ($result === 0) return response()->json(['success' => true, 'msg' => 'connection successfuly']);

            return response()->json(['success' => false, 'msg' => 'Connection Failed: '.$result], 422);

        } catch (Exception $e) {
            throw ValidationException::withMessages(['server_conenction' => 'The connection to the server failed:'.$e->getMessage()]);
        }
    }
}
