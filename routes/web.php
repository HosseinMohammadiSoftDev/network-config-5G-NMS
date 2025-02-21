<?php

use Modules\User\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

Route::get('/', function () {
    return response()->file(public_path('views/login.html'));
});


Route::get('/assets/{path}', function ($path) {
    $filePath = resource_path("dist/assets/{$path}");
    if (File::exists($filePath)) {
        return Response::file($filePath);
    }
    abort(404);
})->where('path', '.*');
