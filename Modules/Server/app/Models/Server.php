<?php

namespace Modules\Server\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

// use Modules\Server\Database\Factories\ServerFactory;

class Server extends Model
{
    use HasFactory, LogsActivity;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'ip',
        'is_down',
        'config'
    ];

  
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults() 
            ->logAll()
            ->logOnlyDirty()
            ->useLogName('server');
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }
}
