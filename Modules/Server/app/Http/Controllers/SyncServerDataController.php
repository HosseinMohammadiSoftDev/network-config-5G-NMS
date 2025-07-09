<?php

namespace Modules\Server\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Server\Models\Server;
use Modules\Server\Services\SyncData\GeterDataService;

class SyncServerDataController extends Controller
{
    public function __construct(
        private GeterDataService $geterDataService
    ){}

//    RRU geter data
    public function syncData ()
    {
        try {

            return $this->geterDataService->syncData();

        } catch (\Exception $e) {
            throw $e;
        }
    }

}
