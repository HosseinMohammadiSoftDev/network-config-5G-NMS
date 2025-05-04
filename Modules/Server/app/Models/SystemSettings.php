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
        'zabbix_address',
        'is_login_2FA',
        'is_login_sms',
        'config_connection_sms',
        'orginal_vm_ip',
        'active_online_capcha',
        'recaptcha_secret_key',
        'recaptcha_site_name',
    ];

}
