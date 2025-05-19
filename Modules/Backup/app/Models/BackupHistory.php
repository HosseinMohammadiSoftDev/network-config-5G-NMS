<?php

namespace Modules\Backup\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Backup\Database\Factories\BackupHistoryFactory;

class BackupHistory extends Model
{
    use HasFactory;

    const RUNING = 0;
    const SUCCESSFULY = 1;
    const FAILED = 2;


    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'servers',
        'destination_path',
        'status',
        'message',
        'start_time',
        'finish_time',
    ];


}
