<?php

namespace Modules\User\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class PhoneLogin extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'expired_at',
        'token',
        'phone',
    ];


    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()
            ->useLogName('login-phone')
            ->logOnlyDirty();
    }
}
