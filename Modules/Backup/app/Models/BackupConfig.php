<?php

namespace Modules\Backup\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Backup\Database\Factories\BackupConfigFactory;

class BackupConfig extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'destination_path',
        'run_backup_at',
    ];


}
