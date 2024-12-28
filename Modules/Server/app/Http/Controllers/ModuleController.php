<?php

namespace Modules\Server\Http\Controllers;

use Spyc;
use Exception;
use phpseclib3\Net\SSH2;
use Illuminate\Http\Request;
use Symfony\Component\Yaml\Yaml;
use Modules\Server\Models\Module;
use Modules\Server\Models\Server;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use function Laravel\Prompts\select;
use Illuminate\Support\Facades\Auth;
use Modules\Server\Helpers\SshHelper;
use Illuminate\Support\Facades\Storage;
use Modules\Server\Helpers\JsonUpdater;
use Spatie\Activitylog\Models\Activity;
use App\Http\Controllers\Contract\ApiController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Modules\Server\Http\Requests\Modules\ShowAllModules;
use PharIo\Version\UnsupportedVersionConstraintException;
use Modules\Server\Http\Requests\Server\UploadModuleRequest;
use Modules\Server\Http\Requests\Modules\CreateModulesRequest;
use Modules\Server\Http\Requests\Modules\ShowAllModulesRequest;
use Modules\Server\Http\Requests\Undo\UndoConfigModulesRequest;
use Modules\Server\Http\Requests\Modules\ShowAllModulesRequestt;
use Modules\Server\Http\Requests\Module\ShowConfilgModuleRequest;
use Modules\Server\Http\Requests\Modules\UpdateConfigModulerequest;
use Modules\Server\Http\Requests\Modules\DeleteModuleRequest;
use Modules\Server\Http\Requests\Undo\UndoToInitialConfigModulesRequest;

class ModuleController extends ApiController
{
        // show Config in database
  public function showConfigModule ($moduleId)
  {
      $module = Module::find($moduleId);
        if (!$module)
            return response()->json(['msg' => 'شناسه ماژول نامعتبر است'], 404);


      if (!$module) {
          Log::channel('daily')->error('شناسه ماژول نامعتبر بود', [
            'route' => request()->fullUrl(),
            'method' => 'showConfigModule',
            'module_id' => $moduleId,
            'user' => Auth::user()
          ]);


          activity('invalid-module-id')
            ->causedBy(Auth::user())
            ->performedOn($moduleId)
            ->event('show-config-module')
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => 'showConfigModule',
                'module_id' => $moduleId,
                'user' => Auth::id(),
            ])
          ->log('شناسه ماژول نامعتبر بود');

          return response()->json(['msg' => 'ماژول پیدا نشد'], 404);
      }

      return response()->json([
        json_decode($module->current_config, true)
      ]);
  }
  public function showAllServiseAndModulesInServer ($serverId)
  {
    $server = Server::with(['modules' => function ($query) {
      $query->select('id', 'server_id', 'name', 'type');
    }])->find($serverId);

      if(!$server)
        return response()->json(['msg' => 'شناسه نامعتبر است'], 404);

    $modulesGroupedByType = $server->modules->groupBy('type');

    return $this->respondSuccess('لیست سرویس های سرور و ماژول های انها', $modulesGroupedByType);
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
      throw new Exception('خطا در تبدیل JSON به آرایه');

      $yamlContent = Yaml::dump($arrayContent, 4, 2, Yaml::DUMP_MULTI_LINE_LITERAL_BLOCK);
      $yamlContent = preg_replace('/^(  - .+?):\s*$/m', "$1:", $yamlContent);

      return $yamlContent;
  }

        // create New Module And Upload File .Yaml Convert to Json Upload To database
  public function uploadModule(UploadModuleRequest $request)
  {
      $credentials = $request->validated();
      $file = $request->file('config_file');

      try {
          $yamlContent = $this->parseYamlWithSpyc($file);
      } catch (Exception $e) {

        Log::channel('daily')->error('مشکلی در تبدیل فایل یمل به جیسون پیش امد', [
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
        ->log('مشکلی در تبدیل فایل یمل به جیسون پیش امد');


          return response()->json(['msg' => 'مشکلی در تبدیل فایل به جیسون پیش امد: ' . $e->getMessage()], 400);
      }

      $jsonContent = json_encode($yamlContent, JSON_PRETTY_PRINT);

      $module = Module::find($credentials['module_id']);
        if (!$module)
            return response()->json(['msg' => 'شناسه سرویس نانعتبر است'], 404);


      $module->config = $jsonContent;
      $module->save();

      Log::channel('daily')->info('فایل کانفیگ در ماژول مورد نظر قرار گرفت', [
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
      ->log('فایل کانفیگ در ماژول مورد نظر قرار گرفت');


      return $this->respondSuccess('فایل با موفقت  تبدیل به جیسون شد', []);
  }

  private function uploadModuleFile ($file)
  {

    try {
      $yamlContent = $this->parseYamlWithSpyc($file);
    } catch (Exception $e) {

      Log::channel('daily')->error('مشکلی در تبدیل فرمت فایل به جیسون پیش امد', [
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
        ->log('مشکلی در تبدیل فرمت فایل به جیسون پیش امد');

        return response()->json(['msg' => 'مشکلی در تبدیل فایل به جیسون پیش امد: ' . $e->getMessage()], 400);
    }

    $jsonContent = json_encode($yamlContent, JSON_PRETTY_PRINT);

    return $jsonContent;

  }
  public function createModule (CreateModulesRequest $request)
  {
      $creadtional = $request->validated();

      $server = Server::find($creadtional['server_id']);

      $host = $server['ip'];
      $username = $request->input('username');
      $password = $request->input('password');
      $path = '/home/siz-tel/bbdh-2.6.6-noCg/install/etc/bbdh';

      $jsonContent = $this->uploadModuleFile($request->file('config_file'));

      if (is_array($jsonContent) || is_object($jsonContent))
          return $jsonContent;


      try {
            $command = 'echo "' . addslashes($jsonContent) . '" > ' . $path . $creadtional['name'] . '.yaml';
        SshHelper::runSshCommand($host, $username, $password, $command);
      } catch (Exception $e) {

        Log::channel('daily')->error('کاربر نتوانست ماژول را ایجاد کند', [
          'route' => request()->fullUrl(),
          'method' => 'createModule',
          'error' => $e->getMessage(),
          'user_id' => Auth::id(),
        ]);

          return response()->json(["Error: " . $e->getMessage()]);
      }


    $module = Module::create([
          'name' => $creadtional['name'],
          'type' => $creadtional['type'],
          'server_id' => $creadtional['server_id'],
          'initial_config' => $jsonContent,
          'current_config' => $jsonContent,
      ]);

      Log::channel('daily')->info('ماژول جدید ساخته شده',[
        'route' => request()->fullUrl(),
        'method' => 'createModule',
        'user' => Auth::user(),
        'module' => [
            'name' => $module['name'],
            'type' => $module['type'],
            'server_id' => $module['server_id']
        ]
      ]);


      activity('create-module')
        ->causedBy(Auth::user())
        ->performedOn($module)
        ->event('create-module')
        ->withProperties([
            'type-log' => 'server',
            'route' => request()->fullUrl(),
            'method' => 'createModule',
            'user' => Auth::user(),
            'module' => [
                'name' => $module['name'],
                'type' => $module['type'],
                'server_id' => $module['server_id']
            ]
        ])
      ->log('ماژول جدید ساخته شده');

      return $this->respondCreated('ماژول با موفقیت ساخته شد', [
        'name' => $module['name'],
        'type' => $module['type'],
        'server_id' => $module['server_id'],
      ]);
  }
  public function deleteModule(deleteModuleRequest $request)
  {
    $creadtional = $request->validated();

    $module = Module::find($creadtional['module_id']);
    $server = Server::find($module['server_id']);

    $host = $server['ip'];
    $username = $request->input('username');
    $password = $request->input('password');
    $path = $request->input('path') ?? 'bbdh-2.6.6-noCg/install/etc/bbdh/';

                // ssh connection
        $command = 'rm -f' . $path . $module['name'] . '.yaml';
        SshHelper::runSshCommand($host, $username, $password, $command);


    $module->delete();


      Log::channel('daily')->info('ماژول با موفقیت ساخته شد',[
        'route' => request()->fullUrl(),
        'method' => 'deleteModule',
        'user' => Auth::id(),
        'module'=> [
            'name' => $module['name'],
            'type' => $module['type'],
            'server_id' => $module['server_id']
        ]
       ]);


      activity('delete-module')
        ->causedBy(Auth::user())
        ->performedOn($module)
        ->event('create-module')
        ->withProperties([
            'type-log' => 'server',
            'route' => request()->fullUrl(),
            'method' => 'createModule',
            'user' => Auth::id(),
            'module_id' => [
                'name' => $module['name'],
                'type' => $module['type'],
                'server_id' => $module['server_id'],
            ],
        ])
      ->log('ماژول با موفقیت پاک شد');

    return $this->respondSuccess('ماژول باموفقیت پاک شد', []);
  }


        // update Config Module
    private function sendConfigToServer($host, $username, $password, $path, $moduleName, $yamlContent, $server)
    {
        // is down server
            if ($server['is_down'] == 1)
                throw new Exception('سرور خاموش است');


        $command = 'echo "' . addslashes($yamlContent) . '" > ' . $path . $moduleName . '.yaml';
        SshHelper::runSshCommand($host, $username, $password, $command);
    }
    private function updateModuleConfigInDatabase($moduleId, $data)
    {
        $module = Module::find($moduleId);

        if (!$module) {
            throw new Exception('ماژول مورد نظر پیدا نشد');
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

        $module = Module::find($request['module_id']);
        $server = Server::find($module['server_id']);

        $data = $request->input('data', []);

        $host = $server['ip'];
        $username = $request->input('username');
        $password = $request->input('password');
        $path = $request->input('path') ?? 'bbdh-2.6.6-noCg/install/etc/bbdh/';

        DB::beginTransaction();


            $module = $this->updateModuleConfigInDatabase($module['id'], $data);

            $yamlContent = $this->convertJsonToYaml($module->current_config);

            $this->sendConfigToServer($host, $username, $password, $path,
                                         $module['name'], $yamlContent, $server);

            Log::channel('daily')->info('مقادریر کانفیگ تعقییر کرد', [
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
                    'module_id' => $module['id'],
                    'module_name' => $module['name'],
                    'module_type' => $module['type'],
                ])
                ->log('مقادیر کانفیگ تغییر کرد');

            DB::commit();
            return response()->json(json_decode($module->current_config, true));

    }


        // Undo Config module
  public function undoConfigModule (UndoConfigModulesRequest $request)
  {
    $creadtional = $request->validated();

    $module = Module::find($creadtional['module_id']);
    $server = Server::find($module['server_id']);

    if ($server['is_down'] == 1)
        return response()->json(['msg' => 'سرور خاموش است'], 403);


    $host = $server['ip'];
    $username = $request->input('username');
    $password = $request->input('password');
    $path = $request->input('path') ?? 'bbdh-2.6.6-noCg/install/etc/bbdh/';


    $module = Module::find($creadtional['module_id']);
    $modulePreviousConfig = $module['previous_config'];

    if ($modulePreviousConfig == null)
        return response()->json(['msg' => 'ماژول مقدار قبلی ندارد شما نمیتواند ان را به مقدار قبلی باز گردانید']);


        // ssh to server format yaml
    $yamlContent = $this->convertJsonToYaml($modulePreviousConfig);

    $command = 'echo "' . addslashes($yamlContent) . '" > ' . $path . $module['name'] . '.yaml';
    SshHelper::runSshCommand($host, $username, $password, $command);


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
    ->log('کانفیگ ماژول به مرحله قبلی بازگشت');


    Log::channel('daily')->info('کانفیگ ماژول به مرحله قبلی بازگشت', [
      'type-log' => 'server',
      'route' => request()->fullUrl(),
      'method' => 'undoConfigModule',
      'user' => Auth::user(),
      'module_id' => $module['id'],
      'module_name' => $module['name'],
      'module_type' => $module['type'],
    ]);



    return response()->json(['success' => 'ture', 'msg' => 'کانفیگ به مقدار قبلی بازگشت']);
  }
  public function undoToInitialConfigModule (UndoToInitialConfigModulesRequest $request)
  {
    $creadtional = $request->validated();

    $module = Module::find($creadtional['module_id']);
    $server = Server::find($module['server_id']);

    if ($server['is_down'] == 1)
        return response()->json(['msg'=> 'سرور خاموش است']);


    $host = $server['ip'];
    $username = $request->input('username');
    $password = $request->input('password');
    $path = $request->input('path') ?? 'bbdh-2.6.6-noCg/install/etc/bbdh/';


    $module = Module::find($creadtional['module_id']);
    $moduleInitialConfig = $module['initial_config'];


        // ssh to server format yaml
    $yamlContent = $this->convertJsonToYaml($moduleInitialConfig);

    $command = 'echo "' . addslashes($yamlContent) . '" > ' . $path . $module['name'] . '.yaml';
    SshHelper::runSshCommand($host, $username, $password, $command);

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
    ->log('کانفیگ ماژول به حالت اولیه خود بازگشت');


    Log::channel('daily')->info('کانفیگ ماژول به حالت اولیه خود بازگشت', [
      'type-log' => 'server',
      'route' => request()->fullUrl(),
      'method' => 'undoConfigModule',
      'user' => Auth::user(),
      'module_id' => $module['id'],
      'module_name' => $module['name'],
      'module_type' => $module['type'],
    ]);



    return response()->json(['success' => 'ture', 'msg' => 'کانفیگ به مقدار اولیه بازگشت']);
  }

}
