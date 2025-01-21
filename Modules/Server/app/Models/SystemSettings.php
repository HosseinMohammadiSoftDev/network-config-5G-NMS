<?php

namespace Modules\Server\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Server\Database\Factories\SystemSettingsFactory;

class SystemSettings extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'elk_address',
        'zabbix_address'
    ];

    // protected static function newFactory(): SystemSettingsFactory
    // {
    //     // return SystemSettingsFactory::new();
    // }
}
