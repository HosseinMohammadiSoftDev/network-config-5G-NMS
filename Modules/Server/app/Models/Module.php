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
        'initial_config',
        'previous_config',
        'current_config'
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults() 
        ->logOnlyDirty()
        ->useLogName('module')
        ->logOnly(['id', 'name', 'type', 'server_id', 'created_at', 'updated_at']);
    }

    public function server()
    {
        return $this->belongsTo(Server::class);
    }
}
