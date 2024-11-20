<?php

namespace Modules\Server\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

// use Modules\Server\Database\Factories\ModuleFactory;

class Module extends Model
{
    use HasFactory, LogsActivity;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'type',
        'server_id',
        'config'
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults() 
            ->logAll()
            ->logOnlyDirty()
            ->useLogName('role');
    }

    public function server()
    {
        return $this->belongsTo(Server::class);
    }
}
