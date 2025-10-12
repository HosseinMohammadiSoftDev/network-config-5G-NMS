<?php

namespace Modules\Server\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

// use Modules\Server\Database\Factories\ModuleFactory;

class Module extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'type',
        'extension',
        'server_id',

//        json fild
        'initial_config_json',
        'previous_config_json',
        'current_config_json',

        'is_updated',

//        .conf fild
        'initial_config_conf',
        'previous_config_conf',

        'path_config',
        'path_run_config',
    ];

//     public function getActivitylogOptions(): LogOptions
//     {
//         return LogOptions::defaults()
//         ->logOnlyDirty()
//         ->useLogName('module')
//         ->logOnly(['id', 'name', 'type', 'server_id', 'created_at', 'updated_at']);
//     }

        // oen to mony
    // public function server()
    // {
    //     return $this->belongsTo(Server::class);
    // }

    public function servers()
    {
        return $this->belongsToMany(Server::class)
        ->withPivot(
            'initial_config_json',
            'previous_config_json',
            'current_config_json',
            'initial_config_conf',
            'previous_config_conf'
        );
    }
}
