<?php

namespace Modules\Server\Http\Controllers;

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
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use function Laravel\Prompts\select;
use Illuminate\Support\Facades\Auth;
use Modules\Server\Helpers\SshHelper;
use Illuminate\Support\Facades\Storage;
use Modules\Server\Helpers\JsonUpdater;
use Spatie\Activitylog\Models\Activity;
use Modules\User\Services\PaginationService;
use Illuminate\Routing\Controllers\Middleware;
use App\Http\Controllers\Contract\ApiController;
use Illuminate\Validation\UnauthorizedException;
use Illuminate\Routing\Controllers\HasMiddleware;
use Modules\Server\Http\Requests\EditModuleRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Modules\Server\Http\Requests\Modules\ShowAllModules;
use PharIo\Version\UnsupportedVersionConstraintException;
use Modules\Server\Http\Requests\Server\UploadModuleRequest;
use Modules\Server\Http\Requests\Modules\DeleteModuleRequest;
use Modules\Server\Http\Requests\Modules\CreateModulesRequest;
use Modules\Server\Http\Requests\Modules\ShowAllModulesRequest;
use Modules\Server\Http\Requests\Undo\UndoConfigModulesRequest;
use Modules\Server\Http\Requests\Modules\ShowAllModulesRequestt;
use Modules\Server\Http\Requests\Module\DeleteCofigModuleRequest;
use Modules\Server\Http\Requests\Module\ShowConfilgModuleRequest;
use Modules\Server\Http\Requests\Modules\UpdateConfigModulerequest;
use Modules\Server\Http\Requests\Module\ExpertModuleFileIsServerRequset;
use Modules\Server\Http\Requests\Undo\UndoToInitialConfigModulesRequest;
use PhpParser\Node\Expr\Cast\Object_;

class ModuleController extends ApiController
{
    public function __construct(private PaginationService $paginationService)
    {

    }

        // show Config in database
  public function showConfigModule ($moduleId)
  {
      $module = Module::find($moduleId);
        if (!$module)
            return response()->json(['msg' => 'The module ID is invalid'], 404);

                // show servers in module name
        $serverIdsInModuleName = Module::where('name', $module['name'])->pluck('server_id');


      return response()->json([
        'config' => json_decode($module->current_config, true),
        'serversIdInModuleName' => $serverIdsInModuleName
      ]);
  }
  public function showAllServiseAndModulesInServer ($serverId)
  {
    $server = Server::with(['modules' => function ($query) {
      $query->select('id', 'server_id', 'name', 'type');
    }])->find($serverId);

      if(!$server)
        return response()->json(['msg' => 'invalide server id'], 404);

    $modulesGroupedByType = $server->modules->groupBy('type');

    $response = [
        'Epc' => $modulesGroupedByType->get('Epc', []),
        '5gc' => $modulesGroupedByType->get('5gc', []),
        'allModules' => $server->modules
    ];

    return $this->respondSuccess('List of server services and their modules', $response);
  }

  public function ShowAllModules (Request $request)
   {
        $modules = Module::all();

        $result = [];
        $processedModules = [];

        foreach ($modules as $module) {
            if (in_array($module->name, $processedModules)) {
                continue;
            }

            $serverIdsInModuleName = Module::where('name', $module->name)->pluck('server_id')->toArray();

            $result[] = [
                'module_id' => $module->id,
                'module_name' => $module->name,
                'module_type' => $module->type,
                'module_server_id' => $module->server_id,
                'server_ids' => $serverIdsInModuleName
            ];

            $processedModules[] = $module->name;
        }

        return response()->json(['msg' => 'The list of modules was successfully retrieved', 'module' => $result]);
  }


        // convet format
  private function parseYamlWithSpyc(UploadedFile $file)
  {
      $filePath = $file->getPathname();
      $jsonContent = Spyc::YAMLLoad($filePath);

      return $jsonContent;
  }
  private function convertJsonToYaml($jsonContent)
  {
      $arrayContent = json_decode($jsonContent, true);

      if (json_last_error() !== JSON_ERROR_NONE)
     throw new Exception('error in convert json to yaml');

      $arrayContent = $this->convertNullKeysToComments($arrayContent);

      $yamlContent = Yaml::dump($arrayContent, 4, 2, Yaml::DUMP_OBJECT);

      $yamlContent = preg_replace('/^(  - .+?):\s*$/m', "$1:", $yamlContent);

      $yamlContent = preg_replace('/[\'\"\/\\\]/', '', $yamlContent);
      return $yamlContent;
  }
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
  public function uploadModule(UploadModuleRequest $request)
  {
      $credentials = $request->validated();
      $file = $request->file('config_file');

      try {
          $yamlContent = $this->parseYamlWithSpyc($file);
      } catch (Exception $e) {

        Log::channel('daily')->error('An issue occurred while converting the YAML file to JSON', [
          'route' => request()->fullUrl(),
          'method' => 'uploadModule',
          'error' => $e->getMessage(),
          'user' => Auth::user(),
        ]);

        activity('yaml-to-json-error')
          ->causedBy(Auth::user())
          ->event('upload-module')
          ->withProperties([
              'type-log' => 'server',
              'route' => request()->fullUrl(),
              'method' => 'uploadModule',
              'error' => $e->getMessage(),
              'user' => Auth::user(),
          ])
        ->log('An issue occurred while converting the YAML file to JSON');


          return response()->json(['msg' => 'An issue occurred while converting the YAML file to JSON: ' . $e->getMessage()], 400);
      }

      $jsonContent = json_encode($yamlContent, JSON_PRETTY_PRINT);

      $module = Module::find($credentials['module_id']);
        if (!$module)
            return response()->json(['msg' => 'server id is invalide'], 404);


      $module->config = $jsonContent;
      $module->save();

      Log::channel('daily')->info('The config file was placed in the specified module', [
        'route' => request()->fullUrl(),
        'method' => 'uploadModule',
        'module' => $module,
        'user' => Auth::user(),
      ]);

      activity('upload-module-config')
        ->causedBy(Auth::user())
        ->performedOn($module)
        ->event('upload-module')
        ->withProperties([
            'type-log' => 'server',
            'route' => request()->fullUrl(),
            'method' => 'uploadModule',
            'module' => $module,
            'user' => Auth::user(),
        ])
      ->log('The config file has been placed in the specified module');


      return $this->respondSuccess('The config file has been placed in the specified module', []);
  }

  private function uploadModuleFile ($file)
  {

    try {
      $yamlContent = $this->parseYamlWithSpyc($file);
    } catch (Exception $e) {

      Log::channel('daily')->error('An issue occurred while converting the file format to JSON', [
        'route' => request()->fullUrl(),
        'method' => 'uploadModuleFile',
        'error' => $e->getMessage(),
        'user_id' => Auth::id(),
      ]);

        activity('file-format-to-json-error')
          ->causedBy(Auth::user())
          ->event('upload-module-file')
          ->withProperties([
              'type-log' => 'server',
              'route' => request()->fullUrl(),
              'method' => 'uploadModuleFile',
              'error' => $e->getMessage(),
              'user_id' => Auth::id(),
          ])
        ->log('An issue occurred while converting the file format to JSON');

        return response()->json(['msg' => 'An issue occurred while converting the file format to JSON: ' . $e->getMessage()], 400);
    }

    $jsonContent = json_encode($yamlContent, JSON_PRETTY_PRINT);

    return $jsonContent;

  }
  public function createModule (CreateModulesRequest $request)
  {
    $creadtional = $request->validated();
    $serverIds = $creadtional['server_id'];

    $jsonContent = $this->uploadModuleFile($request->file('config_file'));
    $yamlContent = $this->convertJsonToYaml($jsonContent);


    if (is_array($jsonContent) || is_object($jsonContent))
        return $jsonContent;

    $failedServers = [];

    foreach ($serverIds as $serverId) {
        $server = Server::find($serverId);

        if (!$server) {
            $failedServers[] = $serverId;
            return response()->json(['msg' => 'this server id invalid']);
        }


        try {

            $this->sendConfigToServer( $creadtional['username'], $creadtional['password'],
                $creadtional['name'], $yamlContent, $server);

        } catch (Exception $e) {

            activity('error-create-module')
            ->causedBy(Auth::user())
            ->event('create-module')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'user' => Auth::user(),
                'method' => 'createModule',
                'error' => $e->getMessage(),
                'module' => [
                    'name' => $creadtional['name'],
                    'type' => $creadtional['type'],
                    'server_id' => $serverId,
                ],
            ])
            ->log('An issue occurred while sending the file to the server.');

            return response()->json(['msg' => ['error' => $e->getMessage()]]);
        }

        $module = Module::create([
            'name' => $creadtional['name'],
            'type' => $creadtional['type'],
            'server_id' => $serverId,
            'initial_config' => $jsonContent,
            'current_config' => $jsonContent,
        ]);

        $createdModules[] = [
            'server' => [
                'server_id' => $server['id'],
                'server_name' => $server['name'],
                'server_ip' => $server['ip']
            ],
            'module' => [
                'module_id' => $module['id'],
                'module_name' => $module['name'],
                'module_type' => $module['type']
            ]
        ];

        activity('create-module')
            ->causedBy(Auth::user())
            ->performedOn(Module::latest()->first())
            ->event('create-module')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'user' => Auth::user(),
                'method' => 'createModule',
                'module' => [
                    'name' => $creadtional['name'],
                    'type' => $creadtional['type'],
                    'server_id' => $serverId,
                ],
                'server' => $server
            ])
            ->log('A new module has been created');
    }

    if (!empty($failedServers))
        return response()->json(['msg' => 'An issue occurred while adding the module to the server', 'server-faild' => $failedServers]);


    return $this->respondCreated('The module was successfully created on the servers',  [
        'created_modules' => $createdModules
      ]);
  }


        // update Config Module
    public function chackPermissionModule($module, $server)
    {
        $user = Auth::user();

        if ($user->hasRole('admin'))
            return true;

        $moduleTypePermissions = [
            'Epc' => 'server/epc',
            '5gc' => 'server/5gc',
        ];

        $serverPermissions = [
            1 => 'server/1',
            2 => 'server/2',
            3 => 'server/3',
            4 => 'server/4',
            5 => 'server/5',
        ];

        $moduleType = $module['type'];
        $serverId = $server['id'];

        if (isset($moduleTypePermissions[$moduleType]) && isset($serverPermissions[$serverId])) {
            $hasModuleTypePermission = $user->hasPermissionTo($moduleTypePermissions[$moduleType]);
            $hasServerPermission = $user->hasPermissionTo($serverPermissions[$serverId]);

            if ($hasModuleTypePermission && $hasServerPermission) {
                return true;
            }
        }

        throw new HttpResponseException(response()->json(['msg' => 'You do not have the required access to use this module and server.',
                'yer-permission' => $user->getAllPermissions()->pluck('name')], 403));
    }
    private function logModuleUpdate($module, $server, $data)
    {
        Log::channel('daily')->info('The configuration values have been changed', [
            'route' => request()->fullUrl(),
            'method' => 'updateConfigModule',
            'user' => Auth::user(),
            'data' => $data,
            'module_id' => $module['id'],
            'module_name' => $module['name'],
            'module_type' => $module['type'],
        ]);

        activity('update-module-config')
            ->causedBy(Auth::user())
            ->event('update-config-module')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'updateConfigModule',
                'user' => Auth::user(),
                'data' => $data,
                'server' => $server,
                'module_id' => $module['id'],
                'module_name' => $module['name'],
                'module_type' => $module['type'],
            ])
            ->log('The configuration values have been changed');
    }
    private function updateSingleModule ($request)
    {
        $module = Module::find($request['module_id']);
        $server = Server::find($module['server_id']);

        $serverIdsInModuleName = Module::where('name', $module['name'])->pluck('server_id')->toArray();
        $data = $request->input('data', []);


        DB::beginTransaction();

        try {
            $this->chackPermissionModule($module, $server);

            $module = $this->updateModuleConfigInDatabase($module['id'], $data);

            $yamlContent = $this->convertJsonToYaml($module->current_config);

            $this->sendConfigToServer($request['username'], $request['password'],
                         $module['name'], $yamlContent, $server);

            $this->logModuleUpdate($module, $server, $data);

            DB::commit();

            return response()->json([
                'config' => json_decode($module->current_config, true),
                'serverIdsInModuleName' => $serverIdsInModuleName
            ]);
        } catch (InvalidArgumentException $e) {
                DB::rollBack();

                $message = $e->getMessage();
                $message = preg_replace('/\x1b\[[0-9;]*m/', '', $message); // حذف کدهای ANSI
                $message = preg_replace('/\r?\n.*?\[root@localhost.*?$/', '', $message); // حذف اطلاعات اضافی مربوط به خط فرمان

                preg_match_all('/\b(FATAL|ERROR):\s.*?(?=\s\(.*?\)|$)/m', $message, $matches);

                $formattedMessages = $matches[0] ?? [];

                $separatedMessages = [];
                foreach ($formattedMessages as $index => $msg) {
                    $separatedMessages["Error-" . ($index + 1)] = $msg;
                }

            throw new HttpResponseException(response()->json([
                'msg' => 'server error!',
                'error' => [
                    'type' => 'restart-service-error',
                    'message' => $separatedMessages
                ]
            ], 500));
        } catch (\Exception $e) {
            DB::rollBack();

            $message = $e->getMessage();

            throw new HttpResponseException(response()->json([
                'msg' => 'خطای سرور!',
                'error' => [
                    'type' => 'server-error',
                    'message' => $message
                ]
            ], 500));
        }
    }
    private function updateMultipleModules($serverIds, $request)
    {
        $module = Module::find($request['module_id']);
        $server = Server::find($module['server_id']);
        $data = $request->input('data', []);

            // validate
        $serverIdsInModuleName = Module::where('name', $module['name'])->pluck('server_id')->toArray();

        foreach ($serverIds as $serverId) {
            if (!in_array($serverId, $serverIdsInModuleName))
                throw new Exception('An invalid server ID has been sent among the server IDs');
        }


        $modules = Module::whereIn('server_id', $serverIds)
                    ->where('name', $module['name'])
                    ->get();


        $firstModule = null;
        DB::beginTransaction();
        try {
            foreach ($modules as $module) {
                $server = Server::find($module['server_id']);

                $this->chackPermissionModule($module, $server);

                $updatedModule = $this->updateModuleConfigInDatabase($module['id'], $data);

                if ($firstModule === null)
                    $firstModule = Module::find($module['id']);

                $yamlContent = $this->convertJsonToYaml($updatedModule->current_config);

                $this->sendConfigToServer( $request['username'], $request['password'],
                     $updatedModule['name'], $yamlContent, $server);


                $this->logModuleUpdate($updatedModule, $server, $data);
            }

            DB::commit();

            return response()->json([
                'config' => json_decode($firstModule->current_config, true),
                'serverIdsInModuleName' => $serverIdsInModuleName
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    private function sendConfigToServer($username, $password, $moduleName, $yamlContent, $server)
    {
        // is down server
            if ($server['is_down'] == 1)
                throw new Exception('this server off');

        if (!$server['path_config'])
            throw new Exception('You did not specify a configuration address');

        $sshHelper = new sshHelper($server, $username, $password);

            // update module
        $commandUpdateFileModule = 'echo ' . escapeshellarg($yamlContent) . ' > ' . $server['path_config'] . $moduleName . '.yaml';
        $sshHelper->runCommand($commandUpdateFileModule );

            // restart module
        $commandRestart = $server['path_run_config'] . 'bbdh-' . $moduleName . 'd' . ' restart';
        // $output = $sshHelper->restartModule($commandRestart );

    }
    private function updateModuleConfigInDatabase($moduleId, $data)
    {
        $module = Module::find($moduleId);

        if (!$module)
            throw new Exception('module is notfund');

            // example value in data user
        foreach ($data as $key => $value) {
            if (is_null($value))
                $data[$key] = "";
        }

        $moduleConfig = json_decode($module->current_config, true);
        $moduleCurrentConfig = $module['current_config'];
        $module['previous_config'] = $moduleCurrentConfig;

        foreach ($data as $key => $value) {
            $moduleConfig = JsonUpdater::updateJsonValue($moduleConfig, $key, $value);
        }

        $module->current_config = json_encode($moduleConfig, JSON_PRETTY_PRINT);
        $module->save();

        return $module;
    }
    public function updateConfigModule(UpdateConfigModuleRequest $request)
    {
        $request->validated();

        $serverIds = $request->input('servers', []);

        if (!empty($serverIds))
            return $this->updateMultipleModules($serverIds, $request);
        else
            return $this->updateSingleModule($request);
    }


        // delete config module
    private function deleteConfigInDatabase ($moduleId, $pathConfig)
    {
        $module = Module::find($moduleId);

        if (!$module)
            throw new Exception('module is not fuond');


        $moduleConfig = json_decode($module->current_config, true);
        $moduleCurrentConfig = $module['current_config'];
        $module['previous_config'] = $moduleCurrentConfig;

        foreach ($pathConfig as $path) {
            $moduleConfig = JsonUpdater::deleteConfigInModule($moduleConfig, $path);
        }

        $module->current_config = json_encode($moduleConfig, JSON_PRETTY_PRINT);
        $module->save();

        return $module;
    }
    public function deleteConfigModule (DeleteCofigModuleRequest $request)
    {
        $request = $request->validated();

        $module = Module::find($request['module_id']);
        $server = Server::find($module['server_id']);
        $pathConfig = $request['path_config'];


        DB::beginTransaction();

        try {
            $this->chackPermissionModule($module, $server);

            $module = $this->deleteConfigInDatabase($module['id'], $pathConfig);

            $yamlContent = $this->convertJsonToYaml($module->current_config);

            $this->sendConfigToServer( $request['username'], $request['password'],
                     $module['name'], $yamlContent, $server);

            DB::commit();

            return response()->json([
                'config' => json_decode($module->current_config, true),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            $message = $e->getMessage();

            if (str_contains($message, 'ERROR') || str_contains($message, 'FATAL')) {
                $message = preg_replace('/\e\[[\d;]*m/', '', $message);
                $message = preg_replace('/\r|\n|\[?.*?h/', '', $message);
                preg_match_all('/(ERROR|FATAL): ([^\r\n]+)/', $message, $matches);

                if (!empty($matches[0])) {
                    $filteredMessages = implode("\n", $matches[0]);
                    return response()->json(['error' => $filteredMessages], 500);
                }

                return response()->json(['error' => $message], 500);
            }

            return response()->json(['error' => $message], 500);
        }
    }



        // edit config module
    private function updateConfigForDB(Module $module, array $serverIds, $jsonConfig, Request $request)
    {
            // if is null $serverIds
        if (!$serverIds) {
            $server = Server::find($module['server_id']);
            $serverIds['0'] = [$server['id']];
        }

        foreach ($serverIds as $serverId) {
            $server = Server::find($serverId);
            $serverModule = Module::where('server_id', $serverId)->where('name', $module->name)->first();

            if ($serverModule) {
                $moduleConfig = json_decode($jsonConfig, true);

                $moduleCurrentConfig = $serverModule['current_config'];
                $serverModule['previous_config'] = $moduleCurrentConfig;

                $serverModule['initial_config'] = json_encode($moduleConfig, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
                $serverModule['current_config'] = json_encode($moduleConfig, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);


                $yamlContent = $this->convertJsonToYaml($serverModule['current_config']);

                $this->sendConfigToServer( $request['username'], $request['password'],
                    $serverModule['name'], $yamlContent, $server);

                $serverModule->save();
            }
        }
    }
    private function addModules(Module $module, array $serverIds, Request $request)
    {
        foreach ($serverIds as $serverId) {
            $server = Server::find($serverId);
            $serverModule = Module::firstOrNew([
                'server_id' => $serverId,
                'name' => $module->name,
            ]);

            $serverModule->type = $module->type;
            $serverModule->initial_config = $module->initial_config;
            $serverModule->current_config = $module->current_config;


            $yamlContent = $this->convertJsonToYaml($serverModule['current_config']);
            $this->sendConfigToServer( $request['username'], $request['password'],
                 $serverModule['name'], $yamlContent, $server);

            $serverModule->save();
        }
    }
    private function deleteModules(array $serverIds, Module $module, $request)
    {
        foreach ($serverIds as $serverId) {
            $serverModule = Module::where('name', $module->name)
                        ->where('server_id',    $serverId)
                        ->first();

                // ssh server
            if ($serverModule) {
                $server = Server::find($serverId);
                $path = $request->input('path') ?? 'bbdh-2.6.6-noCg/install/etc/bbdh/';

                $this->sendConfigToServer( $request['username'], $request['password'],
                     $serverModule['name'], null, $server);

                $serverModule->delete();
            }
        }
    }
    private function syncModuleWithServers(Module $module, array $serverIds, $request)
    {
        $existingServerIds = Module::where('name', $module['name'])->pluck('server_id')->toArray();

        $serversToDelete = array_diff($existingServerIds, $serverIds);
        $serversToAdd = array_diff($serverIds, $existingServerIds);

        try {

            $this->deleteModules($serversToDelete, $module, $request);
            $this->addModules($module, $serversToAdd, $request);

        } catch (\Exception $e) {
            throw new HttpResponseException(response()->json(['error' => $e->getMessage()], 500));
        }
    }
    public function editModule(EditModuleRequest $request)
    {
        $validated = $request->validated();

        $module = Module::find($validated['module_id']);
        $serverIds = $validated['server_ids'] ?? [];
        $configFile = $request->file('config_file');

        if ($serverIds) {

            $this->syncModuleWithServers($module, $serverIds, $request);

                    // update file
                if ($configFile) {
                    $jsonConfig = $this->uploadModuleFile($configFile);
                    $this->updateConfigForDB($module, $serverIds, $jsonConfig, $request);
                }

        } else
            $this->syncModuleWithServers($module, $serverIds, $request);



        $module->update([
            'name' => $validated['name'] ?? $module->name,
            'type' => $validated['type'] ?? $module->type,
        ]);

        return response()->json(['message' => 'Module updated successfully'], 200);
    }




        // expert file
    public function expertModuleFileIsServer (ExpertModuleFileIsServerRequset $request)
    {
        $validation = $request->validated();
        $module = Module::find($validation['module_id']);
        $server = Server::find($module['server_id']);

        $command = 'cat ' . $server['path_config'] . $module['name'] . '.yaml' ;


        try {
                // download file
            $sshHelper = new sshHelper($server, $validation['username'], $validation['password']);
            $output = $sshHelper->getFileContent($command);

                    // هدر های ارسال فایل به عنوان فایل دانلودی برای مرورگر
            return response($output, 200, [
                'Content-Type' => 'application/octet-stream',
                'Content-Disposition' => "attachment; filename={$module->name}.yaml",
                'Content-Length' => strlen($output),
            ]);

        } catch (Exception $e) {

            activity('not-export-file-error')
            ->causedBy(Auth::user())
            ->event('expertModuleFileIsServer')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'expertModuleFileIsServer',
                'user' => Auth::user(),
                'module' => $module,
                'command' => $command
            ])
            ->log('The configuration values have been changed');

            return response()->json(['message'=> $e->getMessage()],500);
        }
    }





        // Undo Config module
  public function undoConfigModule (UndoConfigModulesRequest $request)
  {
    $creadtional = $request->validated();

    $module = Module::find($creadtional['module_id']);
    $server = Server::find($module['server_id']);

    if ($server['is_down'] == 1)
        return response()->json(['msg' => 'server is off'], 403);


    $module = Module::find($creadtional['module_id']);
    $modulePreviousConfig = $module['previous_config'];

    if ($modulePreviousConfig == null)
        return response()->json(['msg' => 'The module does not have a previous value, you cannot revert it to the previous value']);

    try {
            // ssh to server format yaml
            $yamlContent = $this->convertJsonToYaml($modulePreviousConfig);
            $this->sendConfigToServer( $creadtional['username'], $creadtional['password'],
                 $module['name'], $yamlContent, $server);


                // save to datebase format json
            $module['current_config'] = $modulePreviousConfig;
            $module->save();



            activity('undo-config-module')
                ->causedBy(Auth::user())
                ->performedOn($module)
                ->event('undo-config-module')
                ->withProperties([
                    'type-log' => 'server',
                    'route' => request()->fullUrl(),
                    'method' => 'undoConfigModule',
                    'user' => Auth::user(),
                    'module_id' => $module['id'],
                    'module_name' => $module['name'],
                    'module_type'=> $module['type'],
                ])
            ->log('The module configuration has been reverted to the previous step');


            Log::channel('daily')->info('The module configuration has been reverted to the previous step', [
            'type-log' => 'server',
            'route' => request()->fullUrl(),
            'method' => 'undoConfigModule',
            'user' => Auth::user(),
            'module_id' => $module['id'],
            'module_name' => $module['name'],
            'module_type' => $module['type'],
            ]);

            return response()->json([
                'success' => 'ture',
                'msg' => 'The module configuration has been reverted to the previous step',
                'config' => json_decode($module['current_config'], true)
            ]);

    } catch (\Exception $e) {
        return response()->json(['Error' => $e->getMessage()]);
    }
  }
  public function undoToInitialConfigModule (UndoToInitialConfigModulesRequest $request)
  {
    $creadtional = $request->validated();

    $module = Module::find($creadtional['module_id']);
    $server = Server::find($module['server_id']);

    if ($server['is_down'] == 1)
        return response()->json(['msg'=> 'server is off']);


    $module = Module::find($creadtional['module_id']);
    $moduleInitialConfig = $module['initial_config'];

    try {
                // ssh to server format yaml
        $yamlContent = $this->convertJsonToYaml($moduleInitialConfig);
        $this->sendConfigToServer( $creadtional['username'], $creadtional['password'],
            $module['name'], $yamlContent, $server);


        // save to datebase format json
        $module['current_config'] = $moduleInitialConfig;
        $module->save();


        activity('undo-config-module')
            ->causedBy(Auth::user())
            ->performedOn($module)
            ->event('undo-config-module')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'undoConfigModule',
                'user' => Auth::user(),
                'module_id' => $module['id'],
                'module_name' => $module['name'],
                'module_type' => $module['type'],
            ])
        ->log('The module configuration has been reverted to its initial state');


        Log::channel('daily')->info('The module configuration has been reverted to its initial state', [
        'type-log' => 'server',
        'route' => request()->fullUrl(),
        'method' => 'undoConfigModule',
        'user' => Auth::user(),
        'module_id' => $module['id'],
        'module_name' => $module['name'],
        'module_type' => $module['type'],
        ]);



        return response()->json([
            'success' => 'ture',
            'msg' => 'The module configuration has been reverted to its initial state',
            'config' => json_decode($module['current_config'], true)
        ]);
    } catch (\Throwable $th) {
        return response()->json(['error'=> $th->getMessage()]);
    }

  }

}
