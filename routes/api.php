<?php

use Illuminate\Http\Request;
use Modules\User\Models\User;
use Illuminate\Support\Facades\Route;



Route::get('/test', function () {
    User::create([
        'first_name' => 'reza-2',
        'last_name' => 'test',
        'auth_name' => 'test/111',
        'password' => 'password',
    ]);

    return response()->json(['msg' => 'مشکل از فرانت است.']);
});
