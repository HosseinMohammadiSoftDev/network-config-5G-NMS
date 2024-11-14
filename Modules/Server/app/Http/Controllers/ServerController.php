<?php

namespace Modules\Server\Http\Controllers;

use App\Http\Controllers\Contract\ApiController;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Modules\Server\Http\Requests\Server\CreateServerRequest;
use Modules\Server\Http\Requests\Server\UploadModuleRequest;
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
            'route' => request()->fullUrl(),
            'method' => 'createServer',
            'server' => $server,
            'user_id' => Auth::id(),
        ]);

        return $this->respondCreated('سرور با موفقیت ساخته شد', $server);
    }
}
