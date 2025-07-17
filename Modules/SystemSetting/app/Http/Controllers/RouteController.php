<?php

namespace Modules\SystemSetting\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Modules\Server\Helpers\SshHelper;
use Modules\SystemSetting\Http\Requests\Route\AddRouteServerRequest;
use Modules\SystemSetting\Http\Requests\Route\DeleteRouteServerRequest;
use Modules\SystemSetting\Http\Requests\Route\RouteServerRequest;

class RouteController extends Controller
{
    public function __construct()
    {

    }


    public function showRouteServer(RouteServerRequest $request)
    {
        $credentials = $request->validated();

        $server = $request['server'];
        $username = $credentials['username'];
        $password = $credentials['password'];

        try {
            DB::beginTransaction();



            $command = 'ip route show';
                $ssh = new SshHelper($server, $username, $password);
                   $output = $ssh->runCommand($command);


            DB::commit();
                return response()->json(['success' => true, 'msg' => 'show route server successFuly', 'output' => $output], 200);

        } catch (\Exception $e) {
            DB::rollback();
                throw $e;
        }
    }
    public function addRouteServer(AddRouteServerRequest $request)
    {
        $credentials = $request->validated();

        $server = $request['server'];
        $username = $credentials['username'];
        $password = $credentials['password'];

        try {
            DB::beginTransaction();

            isset($credentials['interface'])
                ? $command = 'ip route add ' . $credentials['destination_ip'] . ' via ' . $credentials['geteway_ip'] . ' dev ' . $credentials['interface_route']
                : $command = 'ip route add ' . $credentials['destination_ip'] . ' via ' . $credentials['geteway_ip'];


                $ssh = new SshHelper($server, $username, $password);
                    $output = $ssh->runCommand($command);



            DB::commit();
            return response()->json(['success' => true, 'msg' => 'add route server successFuly', 'output' => $output], 200);

        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
    public function deleteRouteServer(DeleteRouteServerRequest $request)
    {
        $credentials = $request->validated();

        $server = $request['server'];
        $username = $credentials['username'];
        $password = $credentials['password'];

        try {
            DB::beginTransaction();

            isset($credentials['interface'])
                ? $command = 'ip route del ' . $credentials['destination_ip'] . ' via ' . $credentials['geteway_ip'] . ' dev ' . $credentials['interface_route']
                : $command = 'ip route del ' . $credentials['destination_ip'] . ' via ' . $credentials['geteway_ip'];


            $ssh = new SshHelper($server, $username, $password);
                $output = $ssh->runCommand($command);


            DB::commit();
            return response()->json(['success' => true, 'msg' => 'show route server successFuly', 'output' => $output], 200);

        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
}
