<?php

namespace Modules\Server\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Server\Database\Factories\ServerFactory;

class Server extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [];

    // protected static function newFactory(): ServerFactory
    // {
    //     // return ServerFactory::new();
    // }
}
