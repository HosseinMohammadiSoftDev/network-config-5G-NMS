<?php

namespace Modules\Server\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;


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
        'is_updated',

//        json fild
        'initial_config_json',
        'previous_config_json',
        'current_config_json',

//        .conf fild
        'initial_config_conf',
        'previous_config_conf',

        'path_config',
        'path_run_config',
    ];

    public function servers()
    {
        return $this->belongsToMany(Server::class)
        ->withPivot(
            'initial_config_json',
            'previous_config_json',
            'current_config_json',
            'initial_config_conf',
            'previous_config_conf',
            'is_updated'
        );
    }
}
