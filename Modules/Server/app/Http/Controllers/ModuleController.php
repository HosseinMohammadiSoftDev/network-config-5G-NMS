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
use Modules\Server\Http\Requests\Modules\CreateModulesRequest;
use Modules\Server\Http\Requests\Modules\ShowAllModulesRequest;
use Modules\Server\Http\Requests\Undo\UndoConfigModulesRequest;
use Modules\Server\Http\Requests\Modules\ShowAllModulesRequestt;
use Modules\Server\Http\Requests\Module\DeleteCofigModuleRequest;
use Modules\Server\Http\Requests\Module\ShowConfilgModuleRequest;
use Modules\Server\Http\Requests\Modules\UpdateConfigModulerequest;
use Modules\Server\Http\Requests\Module\ExpertModuleFileIsServerRequset;
use Modules\Server\Http\Requests\Modules\deleteModuleRequest;
use Modules\Server\Http\Requests\Undo\UndoToInitialConfigModulesRequest;
use PhpParser\Node\Expr\Cast\Object_;

class ModuleController extends ApiController
{
    public function __construct(private PaginationService $paginationService)
    {

    }

        // show Config in database
  public function showConfigModule ($serverId, $moduleId)
  {
        $module = Module::where('id', $moduleId)
        ->whereHas('servers', function ($query) use ($serverId) {
            $query->where('server_id', $serverId);
        })
        ->with(['servers' => function ($query) {
            $query->select('servers.id', 'servers.name');
        }])
        ->first();

        if (!$module)
            throw new HttpResponseException(response()->json(['msg' => 'The module with the provided ID was not found on the server you specified.']));



        $serverIdsInModuleName = $module->servers->pluck('pivot.server_id');
        $serversData = $module->servers->map(function ($server) {
            return [
                'id' => $server->id,
                'name' => $server->name,
                'is_down' => $server->is_down,
            ];
        });

        $currentConfig = $module->servers
        ->where('pivot.server_id', $serverId)
        ->first()?->pivot->current_config;


        return response()->json([
            'config' => json_decode($currentConfig),
            'serversDetails' => $serversData,
            'serversIdInModuleName' => $serverIdsInModuleName
        ]);
  }
  public function showAllServiseAndModulesInServer ($serverId)
  {
    $server = Server::with(['modules:id,name,type'])->find($serverId);

      if(!$server)
        return response()->json(['msg' => 'invalide server id'], 404);


        $modulesGroupedByType = collect();
        foreach ($server->modules as $module) {
            $types = array_map('trim', explode(',', $module->type));

            foreach ($types as $type) {
                if (!$modulesGroupedByType->has($type))
                    $modulesGroupedByType->put($type, collect());
                $modulesGroupedByType->get($type)->push($module);
            }
        }

    $response = [
        'Epc' => $modulesGroupedByType->get('Epc', []),
        '5gc' => $modulesGroupedByType->get('5gc', []),
        'allModules' => $server->modules->makeHidden('pivot')
    ];

    return $this->respondSuccess('List of server services and their modules', $response);
  }

  public function ShowAllModules (Request $request)
   {
        $modules = Module::with('servers')->get();

        $result = [];

        foreach ($modules as $module) {
            if (in_array($module->name, array_column($result, 'module_name')))
                continue;


            $serverIdsInModuleName = $module->servers->pluck('id')->toArray();
            $serversData = $module->servers->map(function ($server) {
                return [
                    'id' => $server->id,
                    'name' => $server->name,
                    'is_down' => $server->is_down,
                ];
            });

            $result[] = [
                'module_id' => $module->id,
                'module_name' => $module->name,
                'module_type' => $module->type,
                'server_detaile' => $serversData,
                'server_ids' => $serverIdsInModuleName
            ];

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
    $jsonContent = json_encode(json_decode($jsonContent, true), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    $yamlContent = $this->convertJsonToYaml($jsonContent);

    if (is_array($jsonContent) || is_object($jsonContent))
        return $jsonContent;

    $failedServers = [];
    $createdModules = [];


    try {
        DB::beginTransaction();

        $module = Module::create([
            'name' => $creadtional['name'],
            'type' => $creadtional['type'],
        ]);


        foreach ($serverIds as $serverId) {
            $server = Server::find($serverId);

            if (!$server)
                $failedServers[] = $serverId;

            if ($server && $server['is_down'] == 1)
                return response()->json(['msg'=> 'server is off', 'server' => $server]);

                $module->servers()->syncWithoutDetaching([
                    $serverId => [
                        'current_config' => $jsonContent,
                        'initial_config' => $jsonContent
                    ]
                ]);


            // $this->sendConfigToServer( $creadtional['username'], $creadtional['password'],
            //     $creadtional['name'], $yamlContent, $server);


        $module->servers()->syncWithoutDetaching([$serverId]);

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

        DB::commit();

        return $this->respondCreated('The module was successfully created on the servers',  [
            'created_modules' => $createdModules
        ]);

    } catch (Exception $e) {
        DB::rollBack();
        return response()->json(['error' => $e->getMessage()],);
    }
  }
  public function deleteModule (deleteModuleRequest $request)
  {
    $validated = $request->validated();
    $module = Module::find($validated['module_id']);

    foreach ($module->servers()->get() as $server)
        if ($server['is_down'])
            return response()->json([
                'msg' => 'this server is off',
                'data' => [
                    'server_id' => $server['id'],
                    'server_name' => $server['name'],
                    'server_is_down' => $server['is_down'],
                ]], 422);



    $module->delete();

    return response()->json(['msg' => 'Module Deleted', 'module' => $module]);
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
        $module = Module::where('id', $request['module_id'])->whereHas('servers', function ($query) use ($request) {
            $query->where('server_id', $request['server_id']);
        })->first();

        if (!$module)
            throw new HttpResponseException(response()->json(['msg' => 'The module with the provided ID was not found on the server you specified.']));

        $serverIdsInModuleName = $module->servers->pluck('id');
        $data = $request->input('data', []);


        DB::beginTransaction();

        try {

            foreach ($module->servers as $server)
            {
                $this->chackPermissionModule($module, $server);

                $currentConfig = $this->updateModuleConfigInDatabase($module['id'], $data, $server);

                $yamlContent = $this->convertJsonToYaml($currentConfig);

                $this->sendConfigToServer($request['username'], $request['password'],
                            $module['name'], $yamlContent, $server);

                $this->logModuleUpdate($module, $server, $data);
            }

            DB::commit();

            $serversData = $module->servers->map(function ($server) {
                return [
                    'id' => $server->id,
                    'name' => $server->name,
                    'is_down' => $server->is_down,
                ];
            });

            return response()->json([
                'config' => json_decode($currentConfig, true),
                'serverDetaile' => $serversData,
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

            // validate
        $serverIdsInModuleName = $module->servers->pluck('id');
        foreach ($serverIds as $serverId) {
            if (!in_array($serverId, $serverIdsInModuleName->toArray()))
                throw new Exception('An invalid server ID has been sent among the server IDs');
        }

        $servers = $module->servers()
            ->whereIn('server_id', $serverIds)
            ->get();


        DB::beginTransaction();
        try {
            foreach ($servers as $server) {
                $module = $server->modules()->wherePivot('module_id', $request['module_id'])->first();

                $this->chackPermissionModule($module, $server);

                $updatedModule = $this->updateModuleConfigInDatabase($module['id'], $request->input('data'), $server);

                $yamlContent = $this->convertJsonToYaml($updatedModule);

                $this->sendConfigToServer( $request['username'], $request['password'],
                     $module['name'], $yamlContent, $server);

                $this->logModuleUpdate($module, $server,  $request->input('data'));
            }

            DB::commit();


            $serversData = $module->servers->map(function ($server) {
                return [
                    'id' => $server->id,
                    'name' => $server->name,
                    'is_down' => $server->is_down,
                ];
            });

            return response()->json([
                'config' => json_decode($updatedModule, true),
                'serverDetaile' => $serversData,
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

    private function sendConfigToServer($username, $password, $moduleName, $yamlContent, $server)
    {
        // is down server
            if ($server['is_down'] == 1)
                throw new Exception('this server off');

        if (!$server['path_config'])
            throw new Exception('You did not specify a configuration address config');


        if (!$server['path_run_config'])
            throw new Exception('You did not specify a configuration address run config');


        // $sshHelper = new sshHelper($server, $username, $password);

            // update module
        $commandUpdateFileModule = 'echo ' . escapeshellarg($yamlContent) . ' > ' . $server['path_config'] . $moduleName . '.yaml';
        // $sshHelper->runCommand($commandUpdateFileModule );

            // restart module
        $commandRestart = $server['path_run_config'] . 'bbdh-' . $moduleName . 'd' . ' restart';
        // $output = $sshHelper->restartModule($commandRestart );

    }
    private function updateModuleConfigInDatabase($moduleId, $data, $server)
    {
        if ($server['is_down'] == 1)
            throw new HttpResponseException( response()->json(['msg' => 'server is off'], 403));

        $module = Module::find($moduleId);

        if (!$module)
            throw new Exception('module is notfund');

            // example value in data user
        foreach ($data as $key => $value) {
            if (is_null($value))
                $data[$key] = "";
        }

        $serverModel = $module->servers()->find($server['id']);

        $moduleConfig = json_decode($serverModel->pivot['current_config'], true);
        $moduleCurrentConfig = $serverModel->pivot['current_config'];
        $serverModel->pivot['previous_config'] = $moduleCurrentConfig;

        foreach ($data as $key => $value)
            $moduleConfig = JsonUpdater::updateJsonValue($moduleConfig, $key, $value);


        $module->servers()->updateExistingPivot($server->id, [
            'current_config' => json_encode($moduleConfig, JSON_PRETTY_PRINT),
            'previous_config' => $moduleCurrentConfig
        ]);


        return json_encode($moduleConfig, true);
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
    private function deleteConfigInDatabase ($moduleId, $pathConfig, $server)
    {
        $module = Module::find($moduleId);

        if (!$module)
            throw new Exception('module is not fuond');


        $moduleConfig = json_decode($server->pivot['current_config'], true);
        $moduleCurrentConfig = $server->pivot['current_config'];
        $server->pivot->previous_config = $moduleCurrentConfig;

        foreach ($pathConfig as $path)
            $moduleConfig = JsonUpdater::deleteConfigInModule($moduleConfig, $path);


        $module->servers()->updateExistingPivot($server['id'], [
            'current_config' => json_encode($moduleConfig, JSON_PRETTY_PRINT),
            'previous_config' => $moduleCurrentConfig
        ]);

        return json_encode($moduleConfig, true);
    }
    public function deleteConfigModule (DeleteCofigModuleRequest $request)
    {
        $request = $request->validated();

        $module = Module::where('id', $request['module_id'])->whereHas('servers', function ($query) use ($request) {
            $query->where('server_id', $request['server_id']);
        })->first();

        if (!$module)
            throw new HttpResponseException(response()->json(['msg' => 'The module with the provided ID was not found on the server you specified.']));


        $server = $module->servers()->find($request['server_id']);
        $pathConfig = $request['path_config'];

        if ($server['is_down'] == 1)
            return response()->json(['msg' => 'server is off'], 403);

        DB::beginTransaction();

        try {
            $this->chackPermissionModule($module, $server);

            $moduleCurrentConfig = $this->deleteConfigInDatabase($module['id'], $pathConfig, $server);

            $yamlContent = $this->convertJsonToYaml($moduleCurrentConfig);

            $this->sendConfigToServer( $request['username'], $request['password'],
                     $module['name'], $yamlContent, $server);

            DB::commit();

            return response()->json([
                'config' => json_decode($moduleCurrentConfig, true),
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
        $moduleConfig = json_decode($jsonConfig, true);
        $encodedConfig = json_encode($moduleConfig, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        foreach ($serverIds as $serverId) {
            $server = Server::find($serverId);
            $serverModule = $module->servers()->where('server_id', $serverId)->first();

            if ($serverModule) {

                $pivotData = $serverModule->pivot;
                $pivotData->previous_config = $pivotData->current_config;
                $pivotData->initial_config = $encodedConfig;
                $pivotData->current_config = $encodedConfig;

                $yamlContent = $this->convertJsonToYaml($pivotData->current_config);
                $this->sendConfigToServer($request['username'], $request['password'], $module->name, $yamlContent, $server);

                $pivotData->save();
            }
        }
    }
    private function addModules(Module $module, array $serverIds, Request $request)
    {
      $pivotData = $module->servers()->first()->pivot;

        foreach ($serverIds as $serverId) {
            $server = Server::find($serverId);

            if (!$module->servers->contains($serverId)) {
                $module->servers()->attach($serverId, [
                    'initial_config' => $pivotData->initial_config,
                    'current_config' => $pivotData->initial_config,
                ]);
            }

            $yamlContent = $this->convertJsonToYaml($pivotData['initial_config']);
            $this->sendConfigToServer( $request['username'], $request['password'],
                 $module['name'], $yamlContent, $server);

        }
    }
    private function deleteModules(array $serverIds, Module $module, $request)
    {
        foreach ($serverIds as $serverId) {

                $server = Server::find($serverId);

                $this->sendConfigToServer( $request['username'], $request['password'],
                     $module['name'], null, $server);

                $module->servers()->detach($serverId);

        }
    }
    private function syncModuleWithServers(Module $module, array $serverIds, $request)
    {
        $existingServerIds = $module->servers->pluck('id')->toArray();

        $serversToDelete = array_diff($existingServerIds, $serverIds);
        $serversToAdd = array_diff($serverIds, $existingServerIds);

        try {

            $this->addModules($module, $serversToAdd, $request);
            $this->deleteModules($serversToDelete, $module, $request);

        } catch (\Exception $e) {
            throw new HttpResponseException(response()->json(['error' => $e->getMessage()], 500));
        }
    }
    public function editModule(EditModuleRequest $request)
    {
        $validated = $request->validated();
        $module = Module::find($validated['module_id']);

        if (!$module)
            throw new HttpResponseException(response()->json(['msg' => 'The module with the provided ID was not found on the server you specified.']));        $serverIds = $validated['server_ids'] ?? [];

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



        $types = implode(',', array_map('trim', explode(',', $validated['type'] ?? $module['type'])));

        $module->update([
            'name' => $validated['name'] ?? $module->name,
            'type' => $types,
        ]);

        $module->load('servers');

        return response()->json([
            'message' => 'Module updated successfully',
            'module' => [
                'module_name' => $module['name'],
                'module_type' => $module['type'],
                'module_server' => $module->servers->pluck('id')->toArray(),
            ]
        ], 200);
    }




        // expert file
    public function expertModuleFileIsServer (ExpertModuleFileIsServerRequset $request)
    {
        $validation = $request->validated();
        $module = Module::find($validation['module_id']);
        $server = Server::find($module['server_id']);

        $command = 'cat ' . $server['path_config'] . $module['name'] . '.yaml' ;

        if ($server['is_down'] == 1)
            return response()->json(['msg' => 'server is off'], 403);

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
    $server = Server::find($creadtional['server_id']);

    $module = Module::whereHas('servers', function ($query) use ($creadtional) {
        $query->where('server_id', $creadtional['server_id']);
    })->first();

    if (!$module)
        return response()->json(['msg' => 'module is not found'], 404);


    if ($server['is_down'] == 1)
        return response()->json(['msg' => 'server is off'], 403);

    $pivotData = $module->servers()->where('server_id', $creadtional['server_id'])->first()->pivot;
    $modulePreviousConfig = $pivotData['previous_config'];

    if ($modulePreviousConfig == null)
        return response()->json(['msg' => 'The module does not have a previous value, you cannot revert it to the previous value']);

    try {
            // ssh to server format yaml
            $yamlContent = $this->convertJsonToYaml($pivotData['previous_config']);
            $this->sendConfigToServer( $creadtional['username'], $creadtional['password'],
                 $module['name'], $yamlContent, $server);


                // save to datebase format json
            $pivotData['current_config'] = $pivotData['previous_config'];
            $pivotData->save();



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


            return response()->json([
                'success' => 'ture',
                'msg' => 'The module configuration has been reverted to the previous step',
                'config' => json_decode($pivotData['current_config'], true)
            ]);

    } catch (\Exception $e) {
        return response()->json(['Error' => $e->getMessage()]);
    }
  }
  public function undoToInitialConfigModule (UndoToInitialConfigModulesRequest $request)
  {
    $creadtional = $request->validated();

    $module = Module::whereHas('servers', function ($query) use ($creadtional) {
        $query->where('server_id', $creadtional['server_id']);
    })->first();

        if (!$module)
            return response()->json(['msg' => 'module is not found'], 404);


    $server = Server::find($creadtional['server_id']);

    if ($server && $server['is_down'] == 1)
        return response()->json(['msg'=> 'server is off']);

    $pivotData = $module->servers()->where('server_id', $creadtional['server_id'])->first()->pivot;
    $moduleInitialConfig = $pivotData['initial_config'];

    try {
                // ssh to server format yaml
        $yamlContent = $this->convertJsonToYaml($moduleInitialConfig);

        $this->sendConfigToServer( $creadtional['username'], $creadtional['password'],
            $module['name'], $yamlContent, $server);


        // save to datebase format json
        $pivotData['current_config'] = $pivotData['initial_config'];
        $pivotData->save();


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


        return response()->json([
            'success' => 'ture',
            'msg' => 'The module configuration has been reverted to its initial state',
            'config' => json_decode($pivotData['initial_config'], true)
        ]);
    } catch (\Exception $e) {
        return response()->json(['error'=> $e->getMessage()]);
    }
  }

}
