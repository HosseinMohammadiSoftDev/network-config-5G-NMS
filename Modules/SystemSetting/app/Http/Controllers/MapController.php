<?php

namespace Modules\SystemSetting\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Modules\SystemSetting\Http\Requests\SetMapAddressRequest;
use Modules\SystemSetting\Models\Map;


class MapController extends Controller
{
    public function __construct()
    {}


    public function getMapAddress ()
    {
        return response()->json(['success' => true, 'data' => Map::all()], 200);
    }

    public function setMapAddress (SetMapAddressRequest $request)
    {
        $credentials = $request->validated();

        try {
            DB::beginTransaction();

                Map::create($credentials);

            DB::commit();
                return response()->json(['success' => true, 'msg' => 'add map address successFull'], 200);

        } catch (\Exception $e) {
            DB::rollback();

        }
    }
}
