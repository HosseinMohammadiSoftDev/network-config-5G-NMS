<?php

namespace Modules\Server\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

// use Modules\Server\Database\Factories\ServerFactory;

class Server extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'ip',
        'path_config',
        'path_run_config',
        'is_down',
        'config'
    ];


    // public function getActivitylogOptions(): LogOptions
    // {
    //     return LogOptions::defaults()
    //         ->logAll()
    //         ->logOnlyDirty()
    //         ->useLogName('server');
    // }


        // oen to many
    // public function modules()
    // {
    //     return $this->hasMany(Module::class);
    // }

    public function modules ()
    {
        return $this->belongsToMany(Module::class)
        ->withPivot('initial_config', 'previous_config', 'current_config');
    }

}
