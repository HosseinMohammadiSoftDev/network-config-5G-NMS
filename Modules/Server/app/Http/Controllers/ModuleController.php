<?php

namespace Modules\Server\Http\Controllers;

use Modules\Server\Service\LogModuleService;
use Exception;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Modules\Server\Service\Parser\YamlParserService;
use Modules\Server\Models\Module;
use Modules\Server\Models\Server;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Modules\Server\Helpers\SshHelper;
use App\Http\Controllers\Contract\ApiController;
use Modules\Server\Http\Requests\EditModuleRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Modules\Server\Http\Requests\Modules\ShowAllModules;
use Modules\Server\Http\Requests\Modules\deleteModuleRequest;
use Modules\Server\Http\Requests\Modules\CreateModulesRequest;
use Modules\Server\Http\Requests\Modules\ShowAllModulesRequest;
use Modules\Server\Http\Requests\Undo\UndoConfigModulesRequest;
use Modules\Server\Http\Requests\Modules\ShowAllModulesRequestt;
use Modules\Server\Http\Requests\Module\ShowConfilgModuleRequest;
use Modules\Server\Http\Requests\Modules\UpdateConfigModulerequest;
use Modules\Server\Http\Requests\Module\ExpertModuleFileIsServerRequset;
use Modules\Server\Http\Requests\Undo\UndoToInitialConfigModulesRequest;

class ModuleController extends ApiController
{
    public function __construct()
    {}

        // show Config in database
    public function showConfigModule ($serverId, $moduleId)
    {
        $module = Module::where('id', $moduleId)
        ->whereHas('servers', function ($query) use ($serverId) {
            $query->where('server_id', $serverId);
        })
        ->with(['servers' => function ($query) {
            $query->select('servers.id', 'servers.name', 'servers.is_down');
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
            'serversIdInModuleName' => $serverIdsInModuleName,
            'moduleDetails' => [
                'id' => $module['id'],
                'name' => $module['name'],
                'type' => $module['type']
            ]
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
        $user = Auth::user();
        $perPage = ($request->input('paginate') ?? 10);

        if ($user->hasRole('admin')) {
            return response()->json([
                'msg' => 'The list of modules was successfully retrieved',
                'module' => $this->formatModules(Module::with('servers')->paginate($perPage))
            ]);
        }

        $userPermissions = $user->getAllPermissions()->pluck('name')->toArray();



        $modules = Module::whereHas('servers', function ($query) use ($userPermissions) {
            $query->whereIn('name', collect($userPermissions)->map(function ($permission) {
                return str_replace('server/', '', $permission);
            })->toArray());
        })->with(['servers' => function ($query) use ($userPermissions) {
            $query->whereIn('name', collect($userPermissions)->map(function ($permission) {
                return str_replace('server/', '', $permission);
            })->toArray());
        }])->paginate($perPage);


        return response()->json([
            'msg' => 'The list of modules was successfully retrieved',
            'module' => $this->formatModules($modules)
        ]);
    }
    private function formatModules($modules)
    {
      $paginationData = [
          'current_page' => $modules->currentPage(),
          'per_page' => $modules->perPage(),
          'total' => $modules->total(),
          'last_page' => $modules->lastPage(),
      ];

      $userPermissions = Auth::user()->getAllPermissions()
            ->filter(fn($permission) => str_starts_with($permission->name, 'server'))
            ->pluck('name')
            ->toArray();


      $formattedModules = $modules->getCollection()->map(function ($module) {
          return [
              'module_id' => $module->id,
              'module_name' => $module->name,
              'module_type' => $module->type,
              'server_detaile' => $module->servers->map(fn($server) => [
                  'id' => $server->id,
                  'name' => $server->name,
                  'is_down' => $server->is_down,
              ]),
              'server_name' => $module->servers->pluck('name')->toArray(),
              'server_ids' => $module->servers->pluck('id')->toArray(),
          ];
      });

      return [
          'msg' => 'The list of modules was successfully retrieved',
          'user_permissions_server' => $userPermissions,
          'module' => $formattedModules,
          'pagination' => $paginationData,
      ];
    }



        // create New Module And Upload File .Yaml Convert to Json Upload To database
    private function uploadModuleFile ($file)
    {

        try {

            $arrayContent = YamlParserService::parseYamlToArray($file);

        } catch (Exception $e) {
            throw $e;
        }

        $jsonContent = json_encode($arrayContent, JSON_PRETTY_PRINT);

        return $jsonContent;

    }
    public function createModule (CreateModulesRequest $request)
    {
        $creadtional = $request->validated();
        $serverIds = $creadtional['server_id'];

        $jsonContent = $this->uploadModuleFile($request->file('config_file'));

        $yamlContent = YamlParserService::convertJsonToYaml($jsonContent);

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
                    // check permission
                $this->chackPermissionModule($server);

                if (!$server)
                    $failedServers[] = $serverId;

                if ($server && $server['is_down'] == 1)
                    return response()->json(['msg'=> 'server is off', 'server' => $server], 422);

                    $module->servers()->syncWithoutDetaching([
                        $serverId => [
                            'current_config' => $jsonContent,
                            'initial_config' => $jsonContent
                        ]
                    ]);


                $this->sendConfigToServer( $creadtional['username'], $creadtional['password'],
                    $creadtional['name'], $yamlContent, $server, $creadtional['port'] ?? 22);


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
                        'user' =>  Auth::user()->makeHidden(['roles', 'permissions'])->toArray(),
                        'user_role' =>Auth::user()->roles()->pluck('name')->first(),
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
                return response()->json(['msg' => 'An issue occurred while adding the module to the server', 'server-faild' => $failedServers], 422);

            DB::commit();

            return $this->respondCreated('The module was successfully created on the servers',  [
                'created_modules' => $createdModules
            ]);

        } catch (Exception $e) {
            DB::rollBack();
                throw $e;
        }
    }
    public function deleteModule (deleteModuleRequest $request)
    {
        $credentials = $request->validated();
        $module = Module::find($credentials['module_id']);

        try {

            $serverModule = $module->servers()->get();
            if (!$serverModule) {
                $module->delete();
                return response()->json(['msg' => 'Module Deleted', 'module' => $module]);
            }


            foreach ($serverModule as $server)
                $this->chackPermissionModule($server);


            $module->delete();


            activity('create-module')
                ->causedBy(Auth::user())
                ->event('create-module')
                ->withProperties([
                    'type-log' => 'server',
                    'route' => request()->fullUrl(),
                    'user' => Auth::user()->makeHidden(['roles', 'permissions'])->toArray(),
                    'user_role' => Auth::user()->roles()->pluck('name')->first(),
                    'method' => 'createModule',
                    'module' => [
                        'name' => $module['name'],
                        'type' => $module['type'],
                        'server_id' => $serverModule,
                    ],
                ])
                ->log('A new module has been created');

                DB::commit();
            return response()->json(['msg' => 'Module Deleted', 'module' => $module]);

        } catch (\Exception $e) {
            DB::rollBack();
                return response()->json(['success' => false, 'msg' => $e->getMessage()], 422);
        }
    }



        // update Config Module
    private function sendConfigToServer(string $username, string $password, string $moduleName
        , string $yamlContent, Server $server, int $port = 22)
    {
        // is down server
        if ($server['is_down'] == Server::OFF)
            throw new HttpResponseException(response()->json(['msg' => 'this server: ' . $server['name'] .' is off'], 422));

        if (!$server['path_config'])
            throw new HttpResponseException(response()->json(['msg' => 'You did not specify a configuration address config'], 422));

        if (!$server['path_run_config'])
            throw new HttpResponseException(response()->json(['msg' => 'You did not specify a configuration address run config'], 422));


        $sshHelper = new sshHelper($server, $username, $password, $port);

        // update module
        $commandUpdateFileModule = 'echo ' . escapeshellarg($yamlContent) . ' > ' . $server['path_config'] . $moduleName . '.yaml';
        $sshHelper->runCommand($commandUpdateFileModule );

        // restart module
        $commandRestart = $server['path_run_config'] . 'bbdh-' . $moduleName . 'd' . ' restart';
        // $output = $sshHelper->restartModule($commandRestart );

    }
    public function chackPermissionModule($server)
    {
        $user = Auth::user();
        if ($user->hasRole('admin'))
            return true;


        $serverPermission = 'server/' . $server['name'];
        if ($user->hasPermissionTo($serverPermission))
            return true;

        throw ValidationException::withMessages([
            'msg' => 'You do not have permission to use this server : ' . $server['name'],
            'your-permissions' => $user->getAllPermissions()->pluck('name')
        ]);
    }
    private function updateSingleModule ($request)
    {
        $server = Server::find($request['server_id']);

        $module = Module::where('id', $request['module_id'])
            ->whereHas('servers', function ($query) use ($server) {
                $query->where('server_id', $server->id);
            })
        ->first();

        if (!$module)
            throw ValidationException::withMessages(['module' => 'The module with the provided ID was not found on the server you specified.']);

        $serverIdsInModuleName = $module->servers->pluck('id');
        $data = $request->input('data', []);


        DB::beginTransaction();

        try {

            foreach ($module->servers as $moduleServer)
            {
                $this->chackPermissionModule($moduleServer);

                $currentConfig = $this->updateModuleConfigInDatabase($module['id'], $data, $moduleServer);

                $yamlContent = YamlParserService::convertJsonToYaml($currentConfig);

                $this->sendConfigToServer($request['username'], $request['password'],
                            $module['name'], $yamlContent, $moduleServer);

                LogModuleService::logModuleUpdate($moduleServer, $server, $data);
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

        } catch (HttpResponseException $e) {
            throw $e;
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
            ], 422));
        } catch (\Exception $e) {
            DB::rollBack();

            $message = $e->getMessage();

            throw new HttpResponseException(response()->json([
                'msg' => 'server error',
                'error' => [
                    'type' => 'server-error',
                    'message' => $message
                ]
            ], 422));
        }
    }
    private function updateMultipleModules(array $serverIds, Request $request, int $port)
    {
        $module = Module::find($request['module_id']);

            // validate
        $serverIdsInModuleName = $module->servers->pluck('id');
        foreach ($serverIds as $serverId) {
            if (!in_array($serverId, $serverIdsInModuleName->toArray()))
                throw ValidationException::withMessages(['module' => 'An invalid server ID has been sent among the server IDs']);
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

                $yamlContent = YamlParserService::convertJsonToYaml($updatedModule);

                $this->sendConfigToServer( $request['username'], $request['password'],
                     $module['name'], $yamlContent, $server);

                LogModuleService::logModuleUpdate($module, $server,  $request->input('data'));
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

        } catch (HttpResponseException $e) {
            throw $e;
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
            ], 422));
        } catch (\Exception $e) {
            DB::rollBack();

            $message = $e->getMessage();

            throw new HttpResponseException(response()->json([
                'msg' => 'server error!',
                'error' => [
                    'type' => 'server-error',
                    'message' => $message
                ]
            ], 422));
        }
    }
    private function updateModuleConfigInDatabase($moduleId, $data, $server)
    {
        if ($server['is_down'] == Server::OFF)
            throw ValidationException::withMessages(['server' => 'server is off']);

        $module = Module::find($moduleId);
        if (!$module)
            throw ValidationException::withMessages(['module' => 'module not found']);

            // example value in data user
        foreach ($data as $key => $value) {
            if (is_null($value))
                $data[$key] = "";
        }

        $serverModel = $module->servers()->find($server['id']);

        // $moduleConfig = json_decode($serverModel->pivot['current_config'], true);
        $moduleCurrentConfig = $serverModel->pivot['current_config'];
        $serverModel->pivot['previous_config'] = $moduleCurrentConfig;

        // foreach ($data as $key => $value)
        //     $moduleConfig = JsonUpdater::updateJsonValue($moduleConfig, $key, $value);


        $module->servers()->updateExistingPivot($server->id, [
            'current_config' => json_encode($data, JSON_PRETTY_PRINT),
            'previous_config' => $moduleCurrentConfig
        ]);


        return json_encode($data);
    }
    public function updateConfigModule(UpdateConfigModuleRequest $request)
    {
        $credentials = $request->validated();

        $serverIds = $request->input('servers', []);

        if (!empty($serverIds))
            return $this->updateMultipleModules($serverIds, $request, $credentials['port'] ?? 22);
        else
            return $this->updateSingleModule($request, $credentials['port'] ?? 22);
    }



        // edit config module
    private function updateConfigForDB(Module $module, array $serverIds, $jsonConfig, Request $request, int $port)
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

                $yamlContent = YamlParserService::convertJsonToYaml($pivotData->current_config);
                $this->sendConfigToServer($request['username'], $request['password'], $module->name, $yamlContent, $server, $port);

                $pivotData->save();
            }
        }
    }
    private function sendDefaultConfigToServers(array $serverIds, Request $request, Module $module, int $port)
    {
        $yamlContent = $request->file('config_file')->getContent();
        $jsonContent = $this->uploadModuleFile($request->file('config_file'));

        foreach ($serverIds as $serverId) {
            $server = Server::find($serverId);

            $defaultConfig = [
                'initial_config' => $jsonContent,
                'current_config' => $jsonContent,
            ];

            $module->servers()->attach($serverId,$defaultConfig);

            $yamlContent = YamlParserService::convertJsonToYaml($defaultConfig['initial_config']);
            $this->sendConfigToServer($request['username'], $request['password'], 'default_module', $yamlContent, $server, $port);
        }
    }
    private function addModules(Module $module, array $serverIds, Request $request, int $port)
    {
        if ($module->servers->isEmpty()) {
            $this->sendDefaultConfigToServers($serverIds, $request, $module, $port);
            return;
        }

      $pivotData = $module->servers()->first()->pivot;

        foreach ($serverIds as $serverId) {
            $server = Server::find($serverId);

            if (!$module->servers->contains($serverId)) {
                $module->servers()->attach($serverId, [
                    'initial_config' => $pivotData->initial_config,
                    'current_config' => $pivotData->initial_config,
                ]);
            }

            $yamlContent = YamlParserService::convertJsonToYaml($pivotData['initial_config']);
            $this->sendConfigToServer( $request['username'], $request['password'],
                 $module['name'], $yamlContent, $server, $port);

        }
    }
    private function deleteModules(array $serverIds, Module $module)
    {
        foreach ($serverIds as $serverId) {
                $module->servers()->detach($serverId);
        }
    }
    private function syncModuleWithServers(Module $module, array $serverIds, $request, int $port)
    {
        $existingServerIds = $module->servers->pluck('id')->toArray();

        $serversToDelete = array_diff($existingServerIds, $serverIds);
        $serversToAdd = array_diff($serverIds, $existingServerIds);


        $this->addModules($module, $serversToAdd, $request, $port);
        $this->deleteModules($serversToDelete, $module, $request, $port);
    }
    public function editModule(EditModuleRequest $request)
    {
        $credentials = $request->validated();


        try {
            DB::beginTransaction();

            $module = Module::find($credentials['module_id']);
            $serverIds = $credentials['server_ids'] ?? [];
            $configFile = $request->file('config_file');

            if ($module->servers->isEmpty() && !$configFile)
                throw ValidationException::withMessages(['config' => 'config file required']);

            // check permissions
        foreach ($serverIds as $serverId) {
            $server = Server::find($serverId);
            $this->chackPermissionModule($server);

            if ($server['is_down'] === Server::OFF)
                throw ValidationException::withMessages(['msg' => 'server : ' . $server['name'] . ' is off']);
        }

        if ($serverIds) {

            $this->syncModuleWithServers($module, $serverIds, $request, $credentials['port'] ?? 22);

                    // update file
                if ($configFile) {
                    $jsonConfig = $this->uploadModuleFile($configFile);
                    $this->updateConfigForDB($module, $serverIds, $jsonConfig, $request, $credentials['port'] ?? 22);
                }

        } else
            $this->syncModuleWithServers($module, $serverIds, $request, $credentials['port'] ?? 22);



            $types = implode(',', array_map('trim', explode(',', $credentials['type'] ?? $module['type'])));

            $module->update([
                'name' => $credentials['name'] ?? $module->name,
                'type' => $types,
            ]);

            $module->load('servers');


            DB::commit();
            return response()->json([
                'message' => 'Module updated successfully',
                'module' => [
                    'module_name' => $module['name'],
                    'module_type' => $module['type'],
                    'module_server' => $module->servers->pluck('id')->toArray(),
                    'module_server_name' => $module->servers->pluck('name')->toArray(),
                ]
            ], 200);

        } catch (\Exception $e){
            DB::rollBack();
                throw $e;
        }
    }




        // expert file
    public function expertModuleFileIsServer (ExpertModuleFileIsServerRequset $request)
    {
        $credentials = $request->validated();
        $module = Module::find($credentials['module_id']);
        $server = Server::find($credentials['server_id']);


        $command = 'cat ' . $server['path_config'] . $module['name'] . '.yaml' ;

        if ($server['is_down'] == server::OFF)
            throw ValidationException::withMessages(['server' => 'server is off']);

        try {
                // download file
            $sshHelper = new sshHelper($server, $credentials['username'], $credentials['password'], $credentials['port'] ?? 22);
            $output = $sshHelper->getFileContent($command);

                // defalte headers
            return response($output, 200, [
                'Content-Type' => 'application/octet-stream',
                'Content-Disposition' => "attachment; filename={$module->name}.yaml",
                'X-Name-Header' => "{$module->name}.yaml",
                'Content-Length' => strlen($output),
            ], 200);

        } catch (Exception $e) {
            return $e->getMessage();
        }
    }





        // Undo Config module
  public function undoConfigModule (UndoConfigModulesRequest $request)
  {
    $creadtional = $request->validated();


    $pivotData = $request['module']->servers()->where('server_id', $creadtional['server_id'])->first()->pivot;
    $modulePreviousConfig = $pivotData['previous_config'];

    if ($modulePreviousConfig == null)
        throw ValidationException::withMessages(['module' => 'The module does not have a previous value, you cannot revert it to the previous value']);

    try {
            // ssh to server format yaml
            $yamlContent = YamlParserService::convertJsonToYaml($pivotData['previous_config']);
            $this->sendConfigToServer( $creadtional['username'], $creadtional['password'],
                $request['module']['name'], $yamlContent, $request['server'], $creadtional['port'] ?? 22);


                // save to datebase format json
            $pivotData['current_config'] = $pivotData['previous_config'];
            $pivotData->save();



            activity('undo-config-module')
                ->causedBy(Auth::user())
                ->performedOn($request['module'])
                ->event('undo-config-module')
                ->withProperties([
                    'type-log' => 'server',
                    'route' => request()->fullUrl(),
                    'method' => 'undoConfigModule',
                    'user' =>  Auth::user()->makeHidden(['roles', 'permissions'])->toArray(),
                    'user_role' =>Auth::user()->roles()->pluck('name')->first(),
                    'module_id' => $request['module']['id'],
                    'module_name' => $request['module']['name'],
                    'module_type'=> $request['module']['type'],
                    'server_id' => $request['server']?->id
                ])
            ->log('The module configuration has been reverted to the previous step');


            return response()->json([
                'success' => 'ture',
                'msg' => 'The module configuration has been reverted to the previous step',
                'config' => json_decode($pivotData['current_config'], true)
            ], 200);

    } catch (\Exception $e) {
        return response()->json(['Error' => $e->getMessage()], 422);
    }
  }
  public function undoToInitialConfigModule (UndoToInitialConfigModulesRequest $request)
  {
    $creadtional = $request->validated();


    $pivotData = $request['module']->servers()->where('server_id', $creadtional['server_id'])->first()->pivot;
    $moduleInitialConfig = $pivotData['initial_config'];

    try {
        DB::beginTransaction();

                // ssh to server format yaml
        $yamlContent = YamlParserService::convertJsonToYaml($moduleInitialConfig);

        $this->sendConfigToServer( $creadtional['username'], $creadtional['password'],
            $request['module']['name'], $yamlContent, $request['server']);


        // save to datebase format json
        $pivotData['current_config'] = $pivotData['initial_config'];
        $pivotData->save();


        activity('undo-config-module')
            ->causedBy(Auth::user())
            ->performedOn($request['module'])
            ->event('undo-config-module')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'undoConfigModule',
                'user' =>  Auth::user()->makeHidden(['roles', 'permissions'])->toArray(),
                'user_role' =>Auth::user()->roles()->pluck('name')->first(),
                'module_id' => $request['module']['id'],
                'module_name' => $request['module']['name'],
                'module_type' => $request['module']['type'],
                'server_id' => $request['server']?->id
            ])
        ->log('The module configuration has been reverted to its initial state');

        DB::commit();
            return response()->json([
                'success' => 'ture',
                'msg' => 'The module configuration has been reverted to its initial state',
                'config' => json_decode($pivotData['initial_config'], true)
            ], 200);

    } catch (\Exception $e) {
        DB::rollback();
            return response()->json(['error'=> $e->getMessage()], 422);
    }
  }

}
