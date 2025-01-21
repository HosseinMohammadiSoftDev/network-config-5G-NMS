<?php

namespace Modules\Server\Http\Controllers;

use App\Http\Controllers\Contract\ApiController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Server\Http\Requests\SystemStinge\AddAddressRequest;
use Modules\Server\Models\SystemSettings;

class SystemSettingsController extends ApiController
{
    public function __construct()
    {

    }


    public function showAllAddress()
    {
        $address = SystemSettings::all();

        return response()->json( $address);
    }




    public function addAddress(AddAddressRequest $request)
    {
        $creadtioanle = $request->validated();

        $address = SystemSettings::create($creadtioanle);

        return response()->json(['msg' => 'save address successfuly', 'address' => $address], 201);
    }
}
