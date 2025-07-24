<?php

namespace Modules\SystemSetting\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Modules\SystemSetting\Http\Requests\DeleteMonitoringAddressReqest;
use Modules\SystemSetting\Http\Requests\SystemSetting\AddAddressRequest;
use Modules\SystemSetting\Models\SystemSettings;
use PharIo\Manifest\Exception;

class MonitoringController extends Controller
{
    public function __construct()
    {}


    public function getAllMonitoringAddress()
    {
        return response()->json(['success' => true, 'data' => SystemSettings::select(['monitoring_attribute'])->get()]);
    }
    public function addMonitoringAddress (AddAddressRequest $request)
    {
        $request->validated();

        try {
            $systemSetting = SystemSettings::first();
            if (!$systemSetting) {
//                dd($request['newMonitoring']);
                SystemSettings::create([
                    'monitoring_attribute' => [
                        'monitoring' => [$request['newMonitoring']]
                    ],
                ]);
            }


            if (! $request['inServiceNameExists'] && $systemSetting) {
//                  update monitoring filde
                $currentServices = $systemSetting->monitoring_attribute['monitoring'] ?? [];
                $updatedServices = array_merge($currentServices, [$request['newMonitoring']]);

                $systemSetting->update([
                    'monitoring_attribute' => [
                        'monitoring' => $updatedServices,
                    ],
                ]);
            }

            return response()->json(['success' => true, 'message' => 'Add Address successfully.'], 200);

        }catch (\Exception $e) {
            throw ValidationException::withMessages(['warning' => $e->getMessage()]);
        }
    }
    public function deleteMonitoringAddress (DeleteMonitoringAddressReqest $request)
    {
        $credentials = $request->validated();

        try {
            DB::beginTransaction();

            $systemSetting = SystemSettings::first();
            $monitoringServices = $systemSetting->monitoring_attribute['monitoring'] ?? [];

//            delete in monitorring service as list
            $filteredServices = array_filter($monitoringServices, function($service) use ($request) {
                return $service['name'] !== $request->name;
            });

            $systemSetting->update([
                'monitoring_attribute' => ['monitoring' => array_values($filteredServices)]
            ]);

            DB::commit();
                return response()->json(['success' => true, 'message' => 'Deleted SuccessFuly', 'data' => $filteredServices], 200);

        } catch (\Exception $e) {
            DB::rollBack();
                throw ValidationException::withMessages(['warning' => $e->getMessage()]);
        }
    }

}
