<?php

namespace Modules\Server\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationData;
use Illuminate\Validation\ValidationException;
use InvalidArgumentException;
use Modules\Server\Helpers\FtpHelper;
use Modules\Server\Models\Module;
use Modules\Server\Models\Server;
use Illuminate\Support\Facades\DB;
use Modules\Server\Services\ConfigManager;
use Modules\Server\Services\ConfService;
use Modules\Server\Services\Paeser\NeonPaeser;
use Modules\Server\Utility\CommandOutputAnalyzerService;
use Modules\User\Models\Permission;
use Illuminate\Support\Facades\Auth;
use Modules\Server\Helpers\SshHelper;
use Modules\Server\Helpers\JsonUpdater;
use Modules\User\Services\PaginationService;
use App\Http\Controllers\Contract\ApiController;
use Modules\Server\Http\Requests\EditModuleRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Modules\Server\Http\Requests\Modules\ShowAllModules;
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
    public function __construct (
        private PaginationService $paginationService,
        private ConfService $confService
    ) {}

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

        if (!$module) throw ValidationException::withMessages(['module' => 'The module with the provided ID was not found on the server you specified.']);



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
        ->first()?->pivot->current_config_json;


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

        if(!$server) return response()->json(['msg' => 'invalide server id'], 404);


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
            'LTE' => $modulesGroupedByType->get('LTE', []),
            'GSM' => $modulesGroupedByType->get('GSM', []),
            'allModules' => $server->modules->makeHidden('pivot')
        ];

        return $this->respondSuccess('List of server services and their modules', $response);
    }

    public function ShowAllModules (Request $request)
    {
        $user    = Auth::user();
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
              'module_path_config' => $module->path_config,
              'module_path_run_config' => $module->path_run_config,
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





        // create New Module And Upload File .config Convert to Json Upload To database
    private function uploadModuleFile ($file) : string
    {

        try {
                $convertContent = $this->confService->parseConfToArrayAsFile($file);

        } catch (Exception $e) {
            throw $e;
        }

            return json_encode($convertContent, JSON_PRETTY_PRINT);

    }
    private function createConfigFileToServer (string $confContent, string $username, string $password
            , Server $server, Module $module) : string
    {
        $fullPath = $module['path_config'] . $module['name'] . '.' . $module['extension'];

        $command = 'mkdir -p ' . escapeshellarg($module['path_config']) .
            ' && echo ' . escapeshellarg($confContent) . ' > ' .
            escapeshellarg($fullPath);

        $ssh = new SshHelper($server, $username, $password);
        return $ssh->runCommand($command);

//        $ftp = new FtpHelper($server, $username, $password);
//            $ftp->uploadFile($module['path_config'], $fullPath);

    }
    public function createModule (CreateModulesRequest $request)
    {
        $creadtional = $request->validated();
        $serverIds   = $creadtional['server_id'];
        $jsonContent = $this->uploadModuleFile($request->file('config_file'));

        $failedServers  = [];
        $createdModules = [];

        if (is_array($jsonContent) || is_object($jsonContent))
            return $jsonContent;

        $failedServers = [];
        $createdModules = [];

        try {
            DB::beginTransaction();

            $module = Module::create([
                'name' => $creadtional['name'],
                'type' => $creadtional['type'],
                'extension' => $request->file('config_file')->getClientOriginalExtension(),
                'path_config' => $creadtional['path_config'],
            ]);


            foreach ($serverIds as $serverId) {
                $server = Server::find($serverId);

                $this->chackPermissionModule($server);

                if (!$server) $failedServers[] = $serverId;

                if ($server && $server['is_down'] == Server::OFF) throw ValidationException::withMessages(['server'=> 'server is off : ' . $server['name']]);


                    $module->servers()->syncWithoutDetaching([
                        $serverId => [
                            'current_config_json' => $jsonContent,
                            'initial_config_json' => $jsonContent,
                            'initial_config_conf' => $request->file('config_file')->getContent(),
                            'previous_config_conf' => $request->file('config_file')->getContent(),
                        ]
                    ]);


            $outputCommand = $this->createConfigFileToServer($request->file('config_file')->getContent(), $creadtional['username'],
                    $creadtional['password'], $server, $module);

            $commandWarning = CommandOutputAnalyzerService::extractErrors($outputCommand);

            $module->servers()->syncWithoutDetaching([$serverId]);

                $createdModules[] = [
                    'server' => [
                        'server_id' => $server['id'],
                        'server_name' => $server['name'],
                        'server_ip' => $server['ip']
                    ],
                    'module' => [
                        'module_id' => $module['id'],
                        'module_type' => $module['type'],
                        'module_name' => $module['name'],
                        'module_path_config' => $module['path_config'],
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

            return response()->json([
                'success' => $commandWarning ? false : true,
                'msg' => 'The module was successfully created on the servers',
                'created_modules' => $createdModules,
                'commandWarning' => $commandWarning,
            ], $commandWarning ? 422 : 200);

        } catch (Exception $e) {
            DB::rollBack();
                throw $e;
        }
    }
    public function deleteModule (deleteModuleRequest $request)
    {
        $validated    = $request->validated();
        $module       = Module::find($validated['module_id']);
        $serverModule =  $module->servers()->get();

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
            'user' =>  Auth::user()->makeHidden(['roles', 'permissions'])->toArray(),
            'user_role' =>Auth::user()->roles()->pluck('name')->first(),
            'method' => 'createModule',
            'module' => [
                'name' => $module['name'],
                'type' => $module['type']
            ]
        ])
        ->log('A new module has been created');


        return response()->json(['msg' => 'Module Deleted', 'module' => $module]);
    }



        // update Config Module
    private function catConfigFileContent (Module $module, Server $server, string $username, string $password) : string
    {
//            local cat file
//        $filePath = $module['path_config'] . '/' . $module['name'] . '.'  . $module['extension'];
//            $content = file_get_contents($filePath);



        $remoteFilePath = $module['path_config'] . '/' . $module['name'] . '.' . $module['extension'];
        $localTempPath = storage_path('app/tmp/' . uniqid('remote_config_') . '.' . $module['extension']);

        $sshHelper = new FtpHelper($server, $username, $password);
            $sshHelper->downloadFile($remoteFilePath, $localTempPath);

        $content = file_get_contents($localTempPath);

        @unlink($localTempPath);

        return $content;
    }
    public function createAndDeletePermission ()
    {
        $servers = Server::pluck('name')->toArray();

        $existingPermissions = Permission::where('name', 'like', 'server/%')->pluck('name')->toArray();

        $currentServerPermissions = array_map(fn($server) => "server/{$server}", $servers);

        $newPermissions = array_diff($currentServerPermissions, $existingPermissions);
        foreach ($newPermissions as $newPermission)
            Permission::create(['name' => $newPermission, 'guard_name' => 'web']);


        $removedPermissions = array_diff($existingPermissions, $currentServerPermissions);
        foreach ($removedPermissions as $removedPermission)
            Permission::where('name', $removedPermission)->delete();

    }
    public function chackPermissionModule($server)
    {
        $this->createAndDeletePermission();

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
    public function getArrayChanges($array1, $array2) {
        $changes = [];

        foreach ($array2 as $key => $value) {
            if (!array_key_exists($key, $array1))
                $changes[$key] = $value;

            elseif (is_array($value) && is_array($array1[$key])) {
                $subChanges = $this->getArrayChanges($array1[$key], $value);

                if (!empty($subChanges))
                    $changes[$key] = $subChanges;

            elseif ($array1[$key] !== $value)
                $changes[$key] = [
                    'old' => $array1[$key],
                    'new' => $value
                ];
            }
        }

        return $changes;
    }
    private function logModuleUpdate($module, $server, $array2)
    {
        $array1 = json_decode($module->pivot->current_config_json, true);
        $change = json_encode($this->getArrayChanges($array1, $array2));

        activity('update-module-config')
            ->causedBy(Auth::user())
            ->event('update-config-module')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'updateConfigModule',
                'user' =>  Auth::user()->makeHidden(['roles', 'permissions'])->toArray(),
                'user_role' =>Auth::user()->roles()->pluck('name')->first(),
                'changes' => $change,
                'server' => $server,
                'server_id' => $server->id,
                'module_id' => $module['id'],
                'module_name' => $module['name'],
                'module_type' => $module['type'],
            ])
            ->log('The configuration values have been changed');
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
            throw ValidationException::withMessages(['error' => 'The module with the provided ID was not found on the server you specified.']);

        $serverIdsInModuleName = $module->servers->pluck('id');
        $data = $request->input('data', []);


        DB::beginTransaction();

        try {

            $this->chackPermissionModule($server);

//                content config file
            $configContent = $this->catConfigFileContent($module, $server
                    , $request['username'], $request['password']);


//                update change to json fromat
            $configManaager = new ConfigManager($configContent);
                $newConfigContent = $configManaager->applyChanges($data);



//                update change to json content to database
            $currentConfig = $this->updateModuleConfigInDatabase($module['id'], $data, $server, $newConfigContent);


//                send conf file content to server
            $outputCommand = $this->sendConfigToServer($request['username'], $request['password'],
                        $module, $newConfigContent, $server);

            $commandWarning = CommandOutputAnalyzerService::extractErrors($outputCommand);

            $this->logModuleUpdate($module->servers->find($server['id']), $server, $data);


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
                'serverIdsInModuleName' => $serverIdsInModuleName,
                'commandWarning' => $commandWarning
            ], $commandWarning ? 422 : 200);

        } catch (ValidationException $e) {
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

            throw ValidationException::withMessages(['warning' => $separatedMessages]);
        } catch (\Exception $e) {
            DB::rollBack();

            $message = $e->getMessage();

            throw ValidationException::withMessages(['warning' => $message]);
        }
    }
    private function updateMultipleModules($serverIds, $request)
    {
        $module = Module::find($request['module_id']);

            // validate
        $serverIdsInModuleName = $module->servers->pluck('id');
        foreach ($serverIds as $serverId) {
            if (!in_array($serverId, $serverIdsInModuleName->toArray()))
                throw ValidationException::withMessages(['msg' => 'An invalid server ID has been sent among the server IDs']);
        }

        $servers = $module->servers()
            ->whereIn('server_id', $serverIds)
            ->get();

        $serverIdsInModuleName = $module->servers->pluck('id');
        $data = $request->input('data', []);



        DB::beginTransaction();
        try {
            foreach ($servers as $server) {
                $module = $server->modules()->wherePivot('module_id', $request['module_id'])->first();


                $this->chackPermissionModule($module, $server);

//                content config file
                $configContent = $this->catConfigFileContent($module, $server
                    , $request['username'], $request['password']);


//                update change to json fromat
                $configManaager = new ConfigManager($configContent);
                    $newConfigContent = $configManaager->applyChanges($data);


//                    update change to json content to database
                $updatedModule = $this->updateModuleConfigInDatabase($module['id'], $data, $server, $newConfigContent);


//                send yaml file content to server
                $outputCommand = $this->sendConfigToServer($request['username'], $request['password'],
                    $module, $newConfigContent, $server);

                $commandWarning = CommandOutputAnalyzerService::extractErrors($outputCommand);

                $this->logModuleUpdate($module->servers->find($server['id']), $server, $data);
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
                'serverIdsInModuleName' => $serverIdsInModuleName,
                'commandWarning' => $commandWarning
            ], $commandWarning ? 422 : 200);

        } catch (ValidationException $e) {
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

            throw ValidationException::withMessages(['warning' => $separatedMessages]);
        } catch (\Exception $e) {
            DB::rollBack();

            $message = $e->getMessage();

            throw ValidationException::withMessages(['warning' => $message]);
        }
    }
    private function sendConfigToServer(string $username, string $password, Module $module, string $confContent, Server $server)
    {
        // is down server
        if ($server['is_down'] == Server::OFF)
            throw ValidationException::withMessages(['server' => 'this server: ' . $server['name'] .' is off']);

        if (!$module['path_config'])
            throw ValidationException::withMessages(['path_config' => 'You did not specify a configuration address config']);


        $sshHelper = new sshHelper($server, $username, $password);

            // update module command
        $commandUpdateFileModule = 'echo ' . escapeshellarg($confContent)
            . ' > ' . $module['path_config'] . $module['name'] . '.' . $module['extension'];

        return $sshHelper->runCommand($commandUpdateFileModule);

            // restart module
//        $commandRestart = $module['path_run_config'] . 'bbdh-' . $module['name'] . 'd' . ' restart';
//            $output = $sshHelper->restartModule($commandRestart );

    }
    private function updateModuleConfigInDatabase($moduleId, $data, Server $server, string $confContent)
    {
        if ($server['is_down'] == Server::OFF)
            throw ValidationException::withMessages(['msg' => 'server is off']);
        $module = Module::find($moduleId);

        if (!$module)
            throw ValidationException::withMessages(['msg' => 'module is notfund']);


            // example value in data user
        foreach ($data as $key => $value) {
            if (is_null($value))
                $data[$key] = "";
        }

        $serverModel = $module->servers()->find($server['id']);

//            update previous config json
        $moduleConfig = json_decode($serverModel->pivot['current_config_json'], true);
        $moduleCurrentConfig = $serverModel->pivot['current_config_json'];
        $serverModel->pivot['previous_config_json'] = $moduleCurrentConfig;


//             update json content to parser config service
            $moduleConfig = $this->confService->parseConfToArrayAsContentFile($confContent, $module['extension']);


        $module->servers()->updateExistingPivot($server->id, [
            'current_config_json' => json_encode($moduleConfig, JSON_PRETTY_PRINT),
            'previous_config_json' => $moduleCurrentConfig,
            'previous_config_conf' => $confContent
        ]);


        return json_encode($moduleConfig);
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
                $pivotData->previous_config_json = $pivotData->current_config_json;
                $pivotData->initial_config_json = $encodedConfig;
                $pivotData->current_config_json = $encodedConfig;

// update history config .conf
//                $pivotData->initial_config_conf = $configContent;
//                $pivotData->previous_config_conf = $configContent;



//      conf updator
//                $this->sendConfigToServer($request['username'], $request['password'],
//                    $module, $configContent, $server);

                $pivotData->save();
            }
        }
    }
    private function sendDefaultConfigToServers(array $serverIds, Request $request, Module $module, $configContent)
    {
        $jsonContent = $this->uploadModuleFile($request->file('config_file'));

        foreach ($serverIds as $serverId) {
            $server = Server::find($serverId);

            $defaultConfig = [
                'initial_config_json' => $jsonContent,
                'current_config_json' => $jsonContent,
                'initial_config_conf' => $configContent,
                'previous_config_conf' => $configContent,
            ];

            $module->servers()->attach($serverId,$defaultConfig);


//      conf updator
//            $this->sendConfigToServer( $request['username'], $request['password'],
//                $module, $configContent, $server);

        }
    }
    private function addModules(Module $module, array $serverIds, Request $request, $configContent)
    {
        if ($module->servers->isEmpty()) {
            $this->sendDefaultConfigToServers($serverIds, $request, $module, $configContent);
            return;
        }

      $pivotData = $module->servers()->first()->pivot;

        foreach ($serverIds as $serverId) {
            $server = Server::find($serverId);

            if (!$module->servers->contains($serverId)) {
                $module->servers()->attach($serverId, [
                    'initial_configـjson' => $pivotData->initial_config_json,
                    'current_config_json' => $pivotData->initial_config_json,
                ]);
            }

//      conf updator
//            $this->sendConfigToServer( $request['username'], $request['password'],
//                $module, $configContent, $server);

        }
    }
    private function deleteModules(array $serverIds, Module $module, $request, $configContent)
    {
        foreach ($serverIds as $serverId) {

                $server = Server::find($serverId);

//                $this->sendConfigToServer( $request['username'], $request['password'],
//                     $module, $configContent, $server);

                $module->servers()->detach($serverId);

        }
    }
    private function syncModuleWithServers(Module $module, array $serverIds, $request)
    {
        if ($request->file('config_file'))
            $configContent = file_get_contents($request->file('config_file'));
        else
            $configContent = $module['previous_config_conf'];


        $existingServerIds = $module->servers->pluck('id')->toArray();

        $serversToDelete = array_diff($existingServerIds, $serverIds);
        $serversToAdd = array_diff($serverIds, $existingServerIds);


        $this->addModules($module, $serversToAdd, $request, $configContent);
        $this->deleteModules($serversToDelete, $module, $request, $configContent);

    }
    public function editModule(EditModuleRequest $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();
            $module = Module::find($validated['module_id']);

            if (!$module)
                throw ValidationException::withMessages(['module' => 'The module with the provided ID was not found on the server you specified.']);

            $serverIds = $validated['server_ids'] ?? [];

            $configFile = $request->file('config_file');

            if ($module->servers->isEmpty() && !$configFile)
                throw ValidationException::withMessages(['config_file' => 'config file required']);

            // check permissions
        foreach ($serverIds as $serverId) {
            $server = Server::find($serverId);
            $this->chackPermissionModule($server);

            if ($server['is_down'])
                throw ValidationException::withMessages(['server' => 'server : ' . $server['name'] . ' is off']);
        }

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
                'path_config' => $validated['path_config'] ?? $module->path_config,
            ]);

            $module->load('servers');


            DB::commit();
            return response()->json([
                'message' => 'Module updated successfully',
                'module' => [
                    'module_name' => $module['name'],
                    'module_type' => $module['type'],
                    'module_path_config' => $module['path_config'],
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
        $validation = $request->validated();
        $module = Module::find($validation['module_id']);
        $server = Server::find($validation['server_id']);


        if ($server['is_down'] == Server::OFF)
            throw ValidationException::withMessages(['server', 'server Down']);

        try {
                // download file

            $remoteFilePath = $module['path_config'] . '/' . $module['name'] . '.' . $module['extension'];
            $localTempPath = storage_path('app/tmp/' . uniqid('remote_config_') . '.' . $module['extension']);

            $ftpHelper = new FtpHelper($server, $validation['username'], $validation['password']);
                $ftpHelper->downloadFile($remoteFilePath, $localTempPath);

            $content = file_get_contents($localTempPath);

//            command excption
            if (! empty(CommandOutputAnalyzerService::extractErrors($content)))
                throw ValidationException::withMessages(CommandOutputAnalyzerService::extractErrors($content));


            @unlink($localTempPath);

            // defalte headers
            return response($content, 200, [
                'Content-Type' => 'application/octet-stream',
                'Content-Disposition' => "attachment; filename={$module->name}.{$module->extension}",
                'X-Name-Header' => "{$module->name}.{$module->extension}",
                'Content-Length' => strlen($content),
            ]);

        } catch (Exception $e) {

            activity('not-export-file-error')
            ->causedBy(Auth::user())
            ->event('expertModuleFileIsServer')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'expertModuleFileIsServer',
                'user' =>  Auth::user()->makeHidden(['roles', 'permissions'])->toArray(),
                'user_role' =>Auth::user()->roles()->pluck('name')->first(),                'module' => $module,
                'server_id' => $server?->id
            ])
            ->log('The configuration values have been changed');

            return $e;
        }
    }




        // Undo Config module
    public function undoConfigModule (UndoConfigModulesRequest $request)
    {
        $creadtional = $request->validated();
            $server = Server::find($creadtional['server_id']);


        $module = $server->modules()->where('modules.id', $creadtional['module_id'])->first();
        if (!$module)
            throw ValidationException::withMessages(['module' => 'module is not found']);

        if ($server['is_down'] == Server::OFF)
            throw ValidationException::withMessages(['server'=> 'server is off']);


        $pivotData = $module->servers()->where('server_id', $creadtional['server_id'])->first()->pivot;
        $modulePreviousConfig = $pivotData['previous_config_json'];

        if ($modulePreviousConfig == null)
            throw ValidationException::withMessages(['previous_config' => 'The module does not have a previous value, you cannot revert it to the previous value']);


        try {
//               ssh to server format yaml
            $confContent = $pivotData['previous_config_conf'];

            $outpotCommand = $this->sendConfigToServer($creadtional['username'], $creadtional['password'],
                 $module, $confContent, $server);


            // save to datebase format json
            $pivotData['current_config_json'] = $pivotData['previous_config_json'];
                $pivotData->save();


            $commandWarning = CommandOutputAnalyzerService::extractErrors($outpotCommand);

            activity('undo-config-module')
                ->causedBy(Auth::user())
                ->performedOn($module)
                ->event('undo-config-module')
                ->withProperties([
                    'type-log' => 'server',
                    'route' => request()->fullUrl(),
                    'method' => 'undoConfigModule',
                    'user' => Auth::user()->makeHidden(['roles', 'permissions'])->toArray(),
                    'user_role' => Auth::user()->roles()->pluck('name')->first(), 'module_id' => $module['id'],
                    'module_name' => $module['name'],
                    'module_type' => $module['type'],
                    'server_id' => $server?->id
                ])
                ->log('The module configuration has been reverted to the previous step');


            return response()->json([
                'success' => $commandWarning ? false : true,
                'msg' => 'The module configuration has been reverted to the previous step',
                'config' => json_decode($pivotData['current_config'], true),
                'commandWarning' => $commandWarning
            ], $commandWarning ? 422 : 200);

        } catch (ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            return response()->json(['Error' => $e->getMessage()], 422);
        }
    }
    public function undoToInitialConfigModule (UndoToInitialConfigModulesRequest $request)
    {
        $creadtional = $request->validated();
            $server = Server::find($creadtional['server_id']);


        $module = $server->modules()->where('modules.id', $creadtional['module_id'])->first();
            if (!$module)
                throw ValidationException::withMessages(['module' => 'module is not found']);


        if ($server && $server['is_down'] == 1)
            throw ValidationException::withMessages(['server'=> 'server is off']);


        $pivotData = $module->servers()->where('server_id', $creadtional['server_id'])->first()->pivot;
            $moduleInitialConfig = $pivotData['initial_config_json'];

        try {
            // ssh to server format yaml
        $confContent = $pivotData['initial_config_conf'];

        $outputCommand = $this->sendConfigToServer($creadtional['username'], $creadtional['password'],
            $module, $confContent, $server);


            // save to datebase format json
            $pivotData['current_config_json'] = $pivotData['initial_config_json'];
                $pivotData->save();

        $commandWarning = CommandOutputAnalyzerService::extractErrors($outputCommand);


            activity('undo-config-module')
                ->causedBy(Auth::user())
                ->performedOn($module)
                ->event('undo-config-module')
                ->withProperties([
                    'type-log' => 'server',
                    'route' => request()->fullUrl(),
                    'method' => 'undoConfigModule',
                    'user' => Auth::user()->makeHidden(['roles', 'permissions'])->toArray(),
                    'user_role' => Auth::user()->roles()->pluck('name')->first(),
                    'module_id' => $module['id'],
                    'module_name' => $module['name'],
                    'module_type' => $module['type'],
                    'server_id' => $server?->id
                ])
                ->log('The module configuration has been reverted to its initial state');


            return response()->json([
                'success' => $commandWarning ? false : true,
                'msg' => 'The module configuration has been reverted to its initial state',
                'config' => json_decode($pivotData['initial_config_json'], true),
                'commandWarning' => $commandWarning
            ], $commandWarning ? 422 : 200);

        } catch (ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            return response()->json(['error'=> $e->getMessage()], 422);
        }
    }

}
