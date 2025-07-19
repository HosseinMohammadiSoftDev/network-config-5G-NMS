<?php

namespace Modules\Server\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use InvalidArgumentException;
use Modules\Server\Helpers\FtpHelper;
use Modules\Server\Helpers\LocalFile;
use Modules\Server\Models\Module;
use Modules\Server\Models\Server;
use Illuminate\Support\Facades\DB;
use Modules\Server\Services\ConfigManager;
use Modules\Server\Services\ConfService;
use Illuminate\Support\Facades\Auth;
use Modules\Server\Helpers\SshHelper;
use Modules\Server\Helpers\JsonUpdater;
use App\Http\Controllers\Contract\ApiController;
use Modules\Server\Http\Requests\EditModuleRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Modules\Server\Http\Requests\Modules\deleteModuleRequest;
use Modules\Server\Http\Requests\Modules\CreateModulesRequest;
use Modules\Server\Http\Requests\Undo\UndoConfigModulesRequest;
use Modules\Server\Http\Requests\Module\DeleteCofigModuleRequest;
use Modules\Server\Http\Requests\Modules\UpdateConfigModulerequest;
use Modules\Server\Http\Requests\Module\ExpertModuleFileIsServerRequset;
use Modules\Server\Http\Requests\Undo\UndoToInitialConfigModulesRequest;
use Modules\Server\Services\Paginate\PaginationService;
use Modules\Server\Services\SyncData\AutoSyncData;
use Modules\Server\Transformers\ShowAllModulesResource;
use PhpParser\Node\Expr\AssignOp\Mod;
use Spatie\Permission\Commands\Show;

class ModuleController extends ApiController
{
    public function __construct(
        private PaginationService $paginationService,
        private ConfService $confService
    )
    {}

        // show Config in database
    public function showConfigModule ($moduleId)
    {
        $module = Module::find($moduleId);
            if (!$module)
                throw ValidationException::withMessages(['module' => 'The module with the provided ID was not found on the server you specified.']);


        $currentConfig = $module['current_config_json'];

        return response()->json([
            'config' => json_decode($currentConfig),
            'moduleDetails' => [
                'id' => $module['id'],
                'name' => $module['name'],
                'type' => $module['type']
            ]
        ]);
    }
    public function showAllServiseAndModulesInServer()
    {
        $hiddenAttributes = [
            'initial_config_json',
            'previous_config_json',
            'current_config_json',
            'initial_config_conf',
            'previous_config_conf',
            'is_updated',
            'pivot',
            'created_at',
            'updated_at',
            'path_config'
        ];

        $modulesGroupedByType = collect();

        foreach (Module::all() as $module) {
            $module->makeHidden($hiddenAttributes); // مخفی کردن صفات

            $types = array_map('trim', explode(',', $module->type));
            foreach ($types as $type) {
                if (!$modulesGroupedByType->has($type)) {
                    $modulesGroupedByType->put($type, collect());
                }
                $modulesGroupedByType->get($type)->push($module);
            }
        }

        $allModules = Module::all()->each->makeHidden($hiddenAttributes); // مخفی کردن صفات برای allModules

        $response = [
            'LTE' => $modulesGroupedByType->get('LTE', []),
            'GSM' => $modulesGroupedByType->get('GSM', []),
            'allModules' => $allModules
        ];

        return $this->respondSuccess('List of server services and their modules', $response);
    }
    public function ShowAllModules (Request $request)
    {
        $perPage = ($request->input('paginate') ?? 10);

        $modules = Module::paginate($perPage);

        $paginationData = [
            'current_page' => $modules->currentPage(),
            'per_page' => $modules->perPage(),
            'total' => $modules->total(),
            'last_page' => $modules->lastPage(),
        ];

        $formattedModules = $modules->getCollection()->map(function ($module) {
            return [
                'module_id' => $module->id,
                'module_name' => $module->name,
                'module_type' => $module->type,
                'module_path_config' => $module->path_config,
            ];
        });

        return response()->json([
            'msg' => 'The list of modules was successfully retrieved',
            'module' => $formattedModules,
            'pagination' => $paginationData,
        ]);
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
    public function createModule (CreateModulesRequest $request)
    {
        $creadtional = $request->validated();

        $jsonContent = $this->uploadModuleFile($request->file('config_file'));

        if (is_array($jsonContent) || is_object($jsonContent))
            return $jsonContent;


        try {
            DB::beginTransaction();

            $module = Module::create([
                'name' => $creadtional['name'],
                'type' => $creadtional['type'],
                'extension' => $request->file('config_file')->getClientOriginalExtension(),
                'path_config' => $creadtional['path_config'],

//                config module
                'current_config_json' => $jsonContent,
                'initial_config_json' => $jsonContent,
                'initial_config_conf' => $request->file('config_file')->getContent(),
                'previous_config_conf' => $request->file('config_file')->getContent(),
            ]);


            LocalFile::putFile($module, $request->file('config_file')->getContent());

            AutoSyncData::handelChangedModuleThisBBU($module, 'create');

            activity('create-module')
                ->causedBy(null)
                ->performedOn(Module::latest()->first())
                ->event('create-module')
                ->withProperties([
                    'type-log' => 'server',
                    'route' => request()->fullUrl(),
                    'method' => 'createModule',
                    'module' => [
                        'name' => $creadtional['name'],
                        'type' => $creadtional['type'],
                    ]
                ])
                ->log('A new module has been created');


            DB::commit();
                return response()->json([
                    'success' => true,
                    'msg' => 'The module was successfully created on the servers',
                    'module' => [
                        'id' => $module['id'],
                        'name' => $module['name'],
                        'type' => $module['type'],
                        'extension' => $module['extension'],
                        'path_config' => $module['path_config'],
                    ]
                ], 200);

        } catch (Exception $e) {
            DB::rollBack();
                throw $e;
        }
    }
    public function deleteModule (deleteModuleRequest $request)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();
            $module = Module::find($validated['module_id']);


//              sync data config module (send to RRU)
            AutoSyncData::handelChangedModuleThisBBU($module, 'delete');

//              file delete to system
            LocalFile::deleteFile($module);

            $module->delete();


            activity('delete-module')
                ->causedBy(null)
                ->event('delete-module')
                ->withProperties([
                    'type-log' => 'server',
                    'route' => request()->fullUrl(),
                    'method' => 'deleteModule',
                    'module' => [
                        'name' => $module['name'],
                        'type' => $module['type']
                    ]
                ])
                ->log('module successfully deleted');


            DB::commit();
                return response()->json([
                    'success' => true,
                    'msg' => 'Module Deleted',
                    'module' => [
                        'id' => $module['id'],
                        'name' => $module['name'],
                        'type' => $module['type'],
                        'extension' => $module['extension'],
                    ]
                ]);

        } catch (\Exception $e) {
            DB::rollBack();
                throw $e;
        }
    }



        // update Config Module
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
    private function logModuleUpdate(Module $module, $array2)
    {
        $array1 = json_decode($module->current_config_json, true);
        $change = json_encode($this->getArrayChanges($array1, $array2));

        activity('update-module-config')
            ->causedBy(null)
            ->event('update-config-module')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'updateConfigModule',
                'changes' => $change,
                'module_id' => $module['id'],
                'module_name' => $module['name'],
                'module_type' => $module['type'],
            ])
            ->log('The configuration values have been changed');
    }
    private function updateSingleModule ($request)
    {
        $module = Module::find($request['module_id']);
            if (!$module)
                throw ValidationException::withMessages(['error' => 'The module with the provided ID was not found on the server you specified.']);


        $data = $request->input('data', []);


        DB::beginTransaction();

        try {

//                content config file
            $configContent = LocalFile::getFile($module);

//                update change to json fromat
            $configManaager = new ConfigManager($configContent);
                $newConfigContent = $configManaager->applyChanges($data);

            $currentConfig = $this->updateModuleConfigInDatabase($module, $data, $newConfigContent);

//                update change to json content to database


//                send conf file content to server
            LocalFile::putFile($module, $newConfigContent);

//                sync data config module (send to RRU)
            AutoSyncData::handelChangedModuleThisBBU($module, 'update-config');


            $this->logModuleUpdate($module, $data);


            DB::commit();
                return response()->json([
                    'config' => json_decode($currentConfig, true),
                ]);

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
    private function updateModuleConfigInDatabase(Module $module, $data, string $confContent)
    {
            // example value in data user
        foreach ($data as $key => $value) {
            if (is_null($value))
                $data[$key] = "";
        }


//            update previous config json
        $moduleConfig = json_decode($module['current_config_json'], true);
        $moduleCurrentConfig = $module['current_config_json'];
        $module['previous_config_json'] = $moduleCurrentConfig;


//             update json content to parser config service
            $moduleConfig = $this->confService->parseConfToArrayAsContentFile($confContent, $module['extension']);


        $module->update([
            'current_config_json' => json_encode($moduleConfig, JSON_PRETTY_PRINT),
            'previous_config_json' => $moduleCurrentConfig,
            'previous_config_conf' => $confContent,
            'is_updated' => true
        ]);


        return json_encode($moduleConfig);
    }
    public function updateConfigModule(UpdateConfigModuleRequest $request)
    {
        $request->validated();

        return $this->updateSingleModule($request);
    }




        // edit config module
    private function updateConfigForDB(Module $module, $jsonConfig, Request $request)
    {
        $configContent = $request->file('config_file')->getContent();

        $moduleConfig = json_decode($jsonConfig, true);
        $encodedConfig = json_encode($moduleConfig, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);


        $module->previous_config_json = $module->current_config_json;
        $module->initial_config_json = $encodedConfig;
        $module->current_config_json = $encodedConfig;

//          update history config .conf
                $module->initial_config_conf = $configContent;
                $module->previous_config_conf = $configContent;


//          conf updator
            LocalFile::putFile($module, $configContent);

        $module->save();
    }
    public function editModule(EditModuleRequest $request)
    {
        $validated = $request->validated();

        try {
            DB::beginTransaction();

            $module = Module::find($validated['module_id']);
                if (!$module)
                    throw ValidationException::withMessages(['module' => 'The module with the provided ID was not found on the server you specified.']);



            $oldModuleData = clone $module;
            $configFile = $request->file('config_file');

            // update file
            if ($configFile) {
                $jsonConfig = $this->uploadModuleFile($configFile);
                $this->updateConfigForDB($module, $jsonConfig, $request);
            }

            $types = implode(',', array_map('trim', explode(',', $validated['type'] ?? $module['type'])));

            $module->update([
                'name' => $validated['name'] ?? $module->name,
                'type' => $types,
                'path_config' => $validated['path_config'] ?? $module->path_config
            ]);


//                move file config to new Path
            LocalFile::moveFile($module, $oldModuleData);

//                sync data config module (send to RRU)
            AutoSyncData::handelChangedModuleThisBBU($module,'update', $oldModuleData);


            DB::commit();
                return response()->json([
                    'message' => 'Module updated successfully',
                    'module' => [
                        'name' => $module['name'],
                        'type' => $module['type'],
                        'path_config' => $module['path_config'],
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

        try {
                // get file

            $content = LocalFile::getFile($module);

            activity('export-config-module')
                ->causedBy(null)
                ->performedOn($module)
                ->event('export-config-module')
                ->withProperties([
                    'type-log' => 'server',
                    'route' => request()->fullUrl(),
                    'method' => 'undoConfigModule',
                    'module_name' => $module['name'],
                    'module_type' => $module['type']
                ])
                ->log('Received output from module config');



            // defalte headers
            return response($content, 200, [
                'Content-Type' => 'application/octet-stream',
                'Content-Disposition' => "attachment; filename={$module->name}.{$module->extension}",
                'X-Name-Header' => "{$module->name}.{$module->extension}",
                'Content-Length' => strlen($content),
            ], 200);

        } catch (Exception $e) {

            activity('not-export-file-error')
            ->causedBy(null)
            ->event('expertModuleFileIsServer')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'expertModuleFileIsServer',
            ])
            ->log('The configuration values have been changed');

            return $e;
        }
    }




        // Undo Config module
    public function undoConfigModule (UndoConfigModulesRequest $request)
    {
        $creadtional = $request->validated();

        $module = Module::find($creadtional['module_id']);
            if (!$module)
                throw ValidationException::withMessages(['module' => 'module is not found']);


        $modulePreviousConfig = $module['previous_config_json'];
            if ($modulePreviousConfig == null)
                throw ValidationException::withMessages(['previous_config' => 'The module does not have a previous value, you cannot revert it to the previous value']);


        try {
//               save to datebase format json
            $module['current_config_json'] = $module['previous_config_json'];
                $module->save();



//              sync data config module (send to RRU)
            AutoSyncData::handelChangedModuleThisBBU($module, 'update-config');

//               save file config to system
            LocalFile::putFile($module, $module['previous_config_conf']);



            activity('undo-config-module')
                ->causedBy(null)
                ->performedOn($module)
                ->event('undo-config-module')
                ->withProperties([
                    'type-log' => 'server',
                    'route' => request()->fullUrl(),
                    'method' => 'undoConfigModule',
                    'module_name' => $module['name'],
                    'module_type' => $module['type'],
                ])
                ->log('The module configuration has been reverted to the previous step');


            return response()->json([
                'success' => 'ture',
                'msg' => 'The module configuration has been reverted to the previous step',
                'config' => json_decode($module['current_config_json'], true)
            ], 200);

        } catch (ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            return response()->json(['Error' => $e->getMessage()], 422);
        }
    }
    public function undoToInitialConfigModule (UndoToInitialConfigModulesRequest $request)
    {
        $creadtional = $request->validated();

        $module = Module::find($creadtional['module_id']);
            if (!$module)
                throw ValidationException::withMessages(['module' => 'module is not found']);

        try {

            // save to datebase format json
            $module['previous_config_json'] = $module['current_config_json'];
            $module['current_config_json'] = $module['initial_config_json'];
                $module->save();



//              sync data config module (send to RRU)
            AutoSyncData::handelChangedModuleThisBBU($module, 'update-config');

//               save file config to system
            LocalFile::putFile($module, $module['initial_config_conf']);



            activity('undo-config-module')
                ->causedBy(null)
                ->performedOn($module)
                ->event('undo-config-module')
                ->withProperties([
                    'type-log' => 'server',
                    'route' => request()->fullUrl(),
                    'method' => 'undoConfigModule',
                    'module_id' => $module['id'],
                    'module_name' => $module['name'],
                    'module_type' => $module['type'],
                ])
                ->log('The module configuration has been reverted to its initial state');


            return response()->json([
                'success' => 'ture',
                'msg' => 'The module configuration has been reverted to its initial state',
                'config' => json_decode($module['initial_config_json'], true)
            ], 200);

        } catch (ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            return response()->json(['error'=> $e->getMessage()], 422);
        }
    }

}
