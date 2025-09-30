<?php

namespace Modules\Backup\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class BackupConfig extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'destination_path',
        'run_backup_at',
    ];

    protected $casts = [
        'run_backup_at' => 'datetime',
    ];


    public function history (): HasOne
    {
        return $this->hasOne(BackupHistory::class);
    }
}
