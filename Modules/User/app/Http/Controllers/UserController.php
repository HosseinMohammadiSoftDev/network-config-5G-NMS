<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Modules\User\Models\User;
use function PHPSTORM_META\map;
use Modules\Server\Models\Server;
use Illuminate\Support\Facades\DB;
use Modules\User\Models\Permission;
use Illuminate\Support\Facades\Auth;
use Modules\User\Services\PaginationService;
use App\Http\Controllers\Contract\ApiController;
use Modules\User\Http\Requests\User\AddMemberRequest;
use Modules\User\Http\Requests\User\EditMemberRequest;
use Modules\User\Http\Requests\User\resetPasswordRequest;
use function PHPUnit\Framework\isEmpty;

class UserController extends ApiController
{
    public function getMe ()
    {
        return Http::get(env('NMS_IP') . 'get-me');
    }

}
