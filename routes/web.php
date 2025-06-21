<?php

use Modules\Server\Http\Controllers\ModuleController;
use Modules\Server\Http\Controllers\ServerController;
use Modules\User\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

Route::get('/', function () {
    return view('welcome');
//    return response()->file(public_path('views/login.html'));
});


Route::get('/assets/{path}', function ($path) {
    $filePath = resource_path("dist/assets/{$path}");
    if (File::exists($filePath)) {
        return Response::file($filePath);
    }
    abort(404);
})->where('path', '.*');

Route::get('recaptcha', fn () => view('recaptcha'));

Route::get('fetch', fn () => view('fetch'));
