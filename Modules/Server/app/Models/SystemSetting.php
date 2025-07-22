<?php

namespace Modules\Server\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Server\Database\Factories\SystemSettingFactory;

class SystemSetting extends Model
{
    use HasFactory;


    protected $fillable = [
        'nms_server_ip',
        'is_connected',
        'last_connection_nms'
    ];

    protected $casts = [
        'last_connection_nms' => 'timestamp',
    ];
}
