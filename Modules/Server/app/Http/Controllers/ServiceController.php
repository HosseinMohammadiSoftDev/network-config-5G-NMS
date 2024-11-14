<?php

namespace Modules\Server\Http\Controllers;

use App\Http\Controllers\Contract\ApiController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Modules\Server\Http\Requests\Service\CreateServiceRequest;
use Modules\Server\Models\Server;
use Modules\Server\Models\Service;

class ServiceController extends ApiController
{
    public function showAllServicesServer($serverId)
    {
        $services = Server::find($serverId);    
            if (!$services)
                return response()->json(['msg' => 'شناسه سرور شما نامعبتر است'], 404);

        $services = Service::where('server_id', $serverId)->get();

        return $this->respondSuccess('لیست سرویس های سرور شما', $services);
    }

    public function createService(CreateServiceRequest $request)
    {
        $credentials = $request->validated();

        $service = Service::create($credentials);

        Log::channel('daily')->info('سرویس جدیدی به سرور اضافه شد', [
            'route' => request()->fullUrl(),
            'method' => 'createService',
            'service' => $service,
            'credentials' => $credentials,
            'user_id' => Auth::id(),
        ]);

        return $this->respondSuccess('سرویس شما با موفقیت ساخته شد', $service);
    }
}
