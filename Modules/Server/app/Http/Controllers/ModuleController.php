<?php

namespace Modules\Server\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Spyc;
use Exception;
use RuntimeException;
use phpseclib3\Net\SSH2;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\Yaml\Yaml;
use Illuminate\Http\JsonResponse;
use Modules\Server\Models\Module;
use Modules\Server\Models\Server;
use PHPUnit\Event\Code\Throwable;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Yaml\Dumper;
use Illuminate\Support\Facades\Log;
use Modules\User\Models\Permission;
use App\Http\Controllers\Controller;
use function Laravel\Prompts\select;
use Illuminate\Support\Facades\Auth;
use Modules\Server\Helpers\SshHelper;
use PhpParser\Node\Expr\Cast\Object_;
use Illuminate\Support\Facades\Storage;
use Modules\Server\Helpers\JsonUpdater;
use Spatie\Activitylog\Models\Activity;
use Modules\User\Services\PaginationService;
use Symfony\Component\Serializer\Serializer;
use Illuminate\Routing\Controllers\Middleware;
use App\Http\Controllers\Contract\ApiController;
use Illuminate\Validation\UnauthorizedException;
use Illuminate\Routing\Controllers\HasMiddleware;
use Modules\Server\Http\Requests\EditModuleRequest;
use Symfony\Component\Yaml\Exception\ParseException;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Modules\Server\Http\Requests\Modules\ShowAllModules;
use PharIo\Version\UnsupportedVersionConstraintException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Serializer\Encoder\DecoderInterface;
use Symfony\Component\Serializer\Encoder\EncoderInterface;
use Modules\Server\Http\Requests\Server\UploadModuleRequest;
use Modules\Server\Http\Requests\SshServer\SshServerRequest;
use Modules\Server\Http\Requests\Modules\deleteModuleRequest;
use Modules\Server\Http\Requests\Modules\CreateModulesRequest;
use Modules\Server\Http\Requests\Modules\ShowAllModulesRequest;
use Modules\Server\Http\Requests\Undo\UndoConfigModulesRequest;
use Modules\Server\Http\Requests\Modules\ShowAllModulesRequestt;
use Modules\Server\Http\Requests\Module\DeleteCofigModuleRequest;
use Modules\Server\Http\Requests\Module\ShowConfilgModuleRequest;
use Modules\Server\Http\Requests\Modules\UpdateConfigModulerequest;
use Modules\Server\Http\Requests\Module\restartServiceModuleRequest;
use Modules\Server\Http\Requests\Module\ExpertModuleFileIsServerRequset;
use Modules\Server\Http\Requests\Undo\UndoToInitialConfigModulesRequest;

class ModuleController extends ApiController
{
    public function __construct(private PaginationService $paginationService)
    {

    }

        // show Config in database
    public function showConfigModule ($serverId, $moduleId)
    {
        return Http::get(env('NMS_IP') . "show-config-module/{$serverId}/{$moduleId}");
    }
    public function showAllServiseAndModulesInServer ($serverId)
    {
        return Http::get(env('NMS_IP') . "show-all-servies-and-modules/{$serverId}");
    }

    public function ShowAllModules (Request $request)
    {
        return Http::get(env('NMS_IP') . "show-all-modules");
    }

        // convet format
    private function convertNullKeysToComments(array $array)
    {
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $array[$key] = $this->convertNullKeysToComments($value);
            } elseif ($value === null || $value === "" || $value === '') {
                $array["# $key"] = null;
                unset($array[$key]);
            }
        }

        return $array;
    }



        // create New Module And Upload File .Yaml Convert to Json Upload To database
    public function createModule (CreateModulesRequest $request)
    {
        $creadtional = $request->validated();

        return Http::post(env('NMS_IP') . "create-module", $creadtional);
    }
    public function deleteModule (deleteModuleRequest $request)
    {
        $credentials = $request->validated();

        return Http::delete(env('NMS_IP') . 'delete-module', [
            'module_id' => $credentials['module_id'],
        ]);
    }



        // update Config Module
    public function updateConfigModule(UpdateConfigModuleRequest $request)
    {
        $credentials = $request->validated();

        return Http::post(env('NMS_IP') . '', $credentials);
    }


        // delete config module
    public function deleteConfigModule (DeleteCofigModuleRequest $request)
    {
        $credentials = $request->validated();

        return Http::delete(env('NMS_IP') . 'delete-config-module', [
            'module_id' => $credentials['module_id'],
            'server_id' => $credentials['server_id'],
            'path_config' => $credentials['path_config'],
            'username' => $credentials['username'],
            'password' => $credentials['password'],
        ]);
    }



        // edit config module
    public function editModule(EditModuleRequest $request)
    {
        $credentials = $request->validated();

        return Http::post(env('NMS_IP') . 'edit-module', [
            'module_id' => $credentials['module_id'],
            'name' => $credentials['name'] ?? null,
            'type' => $credentials['type'] ?? null,
            'config_file' => $credentials['config_file'] ?? null,
            'server_ids' => $credentials['server_ids'] ?? null,
            'username' => $credentials['username'],
            'password' => $credentials['password'],
        ]);
    }




        // expert file
    public function expertModuleFileIsServer (ExpertModuleFileIsServerRequset $request)
    {
        $validation = $request->validated();

        return Http::post(env('NMS_IP') . 'export-module-file', [
            'module_id' => $validation['module_id'],
            'server_id' => $validation['server_id'],
            'username' => $validation['username'],
            'password' => $validation['password'],
        ]);
    }



        // service module
    public function restartServiceModule (restartServiceModuleRequest $request)
    {
        $validate = $request->validated();

        return Http::post(env('NMS_IP') . 'restart-service-config', [
            'module_id' => $validate['module_id'],
            'server_id' => $validate['server_id'],
            'username' => $validate['username'],
            'password' => $validate['password'],
        ]);
    }
    public function startServiceModule (restartServiceModuleRequest $request)
    {
        $validate = $request->validated();

        return Http::post(env('NMS_IP') . 'start-service-config', [
            'module_id' => $validate['module_id'],
            'server_id' => $validate['server_id'],
            'username' => $validate['username'],
            'password' => $validate['password'],
        ]);
    }
    public function stopServiceModule (restartServiceModuleRequest $request)
    {
        $validate = $request->validated();

        return Http::post(env('NMS_IP') . 'stop-service-config', [
            'module_id' => $validate['module_id'],
            'server_id' => $validate['server_id'],
            'username' => $validate['username'],
            'password' => $validate['password'],
        ]);
    }
    public function statusServiceModule (restartServiceModuleRequest $request)
    {
        $validate = $request->validated();

        return Http::post(env('NMS_IP') . 'status-service-config', [
            'module_id' => $validate['module_id'],
            'server_id' => $validate['server_id'],
            'username' => $validate['username'],
            'password' => $validate['password'],
        ]);
    }




        // Undo Config module
    public function undoConfigModule (UndoConfigModulesRequest $request)
    {
        $creadtional = $request->validated();

        return Http::post(env('NMS_IP') . 'undo-module-config', [
            'module_id' => $creadtional['module_id'],
            'server_id' => $creadtional['server_id'],
            'username' => $creadtional['username'],
            'password' => $creadtional['password'],
        ]);
    }
    public function undoToInitialConfigModule (UndoToInitialConfigModulesRequest $request)
    {
        $creadtional = $request->validated();

        return Http::post(env('NMS_IP') . 'undo-to-initial-config-modules', [
            'module_id' => $creadtional['module_id'],
            'server_id' => $creadtional['server_id'],
            'username' => $creadtional['username'],
            'password' => $creadtional['password'],
        ]);
    }

}
