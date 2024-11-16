<?php

namespace Modules\Log\Http\Controllers;

use App\Http\Controllers\Contract\ApiController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\User\Services\PaginationService;
use Spatie\Activitylog\Models\Activity;

class LogController extends ApiController
{
    protected $paginationService;
    public function __construct(PaginationService $paginationService)
    {
        $this->paginationService = $paginationService;
    }

    public function showAllLogs (Request $request)
    {
        $logsQuery = Activity::query()
        ->when($request->input('search', ''), function ($query, $search) {
            return $query->where(function ($query) use ($search) {
                $query->where('log_name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        });

        $logs = $this->paginationService->paginate($logsQuery, $request, ['id', 'log_name', 'description', 'created_at', 'updated_at']);

        return $this->respondSuccess('تمام لاگ‌های انتخابی با موفقیت نمایش داده شدند', $logs);
    }
}
