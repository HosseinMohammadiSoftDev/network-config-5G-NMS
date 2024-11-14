<?php

namespace Modules\Server\Http\Controllers;

use App\Http\Controllers\Contract\ApiController;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Modules\Server\Helpers\JsonUpdater;
use Modules\Server\Helpers\SshHelper;
use Modules\Server\Http\Requests\Modules\CreateModulesRequest;
use Modules\Server\Http\Requests\Modules\UpdateConfigModulerequest;
use Modules\Server\Http\Requests\Server\UploadModuleRequest;
use Modules\Server\Models\Module;
use Spyc;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ModuleController extends ApiController
{
  public function showConfigModule ($moduleId)
  {
      $module = Module::find($moduleId);
  
      if (!$module) {
          Log::channel('daily')->error('شناسه ماژول نامعتبر بود', [
            'route' => request()->fullUrl(),
            'method' => 'showConfigModule',
            'module_id' => $moduleId,  
            'user' => Auth::id()
          ]);
        
          return response()->json(['msg' => 'ماژول پیدا نشد'], 404);
      }
  
      return response()->json([
          'config' => json_decode($module->config, true)
      ]);
  }  
 

    // اپلود فایل کانفیگ
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
          'user_id' => Auth::id(),
        ]);

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
        'user_id' => Auth::id(),
      ]);

      return $this->respondSuccess('فایل با موفقت  تبدیل به جیسون شد', []);
  }
  private function parseYamlWithSpyc(UploadedFile $file)
  {
      $filePath = $file->getPathname();
      $jsonContent = Spyc::YAMLLoad($filePath);

      return $jsonContent;
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

        return response()->json(['msg' => 'مشکلی در تبدیل فایل به جیسون پیش امد: ' . $e->getMessage()], 400);
    }

    $jsonContent = json_encode($yamlContent, JSON_PRETTY_PRINT);

    return $jsonContent;

  }
  public function createModule (CreateModulesRequest $request)
  {
      $creadtional = $request->validated();
      
      $host = $request->input('host');
      $username = $request->input('username');
      $password = $request->input('password');


      $jsonContent = $this->uploadModuleFile($request->file('config_file'));
      
      if (is_array($jsonContent) || is_object($jsonContent)) 
          return $jsonContent;
      
      $command = 'echo "'. $jsonContent .'" > /home/mohammadi/Desktop/' . $creadtional['name'];

      try {
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
    
    
      Module::create([
          'name' => $creadtional['name'],
          'services_id' => $creadtional['service_id'],
          'config' => $jsonContent, 
      ]);

      return $this->respondCreated('ماژول با موفقیت ساخته شد', []);
  }
  
  public function updateConfigModule (UpdateConfigModulerequest $request)
    {
      $request->validated();

      $moduleId = $request->input('module_id');
      $fieldPath = $request->input('field');
      $newValue = $request->input('value');

          // coonection server
      $host = $request->input('host');
      $username = $request->input('username');
      $password = $request->input('password');

      $module = Module::find($moduleId);
      $moduleConfig = json_decode($module->config, 1);


      try {
          DB::beginTransaction();

        $updateJson = JsonUpdater::updateJsonValue($moduleConfig, $fieldPath, $newValue);

            //change to data type string and push to server 
        $jsonContent = json_encode($updateJson, JSON_PRETTY_PRINT);
        $command = 'echo "'. $jsonContent .'" > /home/mohammadi/Desktop/' . $module['name'];

          try {
                SshHelper::runSshCommand($host, $username, $password, $command);
          } catch (Exception $e) {
                  Log::channel('daily')->error('مشکلی اتصال به سرور و اجرای کامند پیش امد', [
                      'route' => request()->fullUrl(),
                      'method' => '',
                      'user' => Auth::id(),
                      'host' => $host,
                      'userName' => $username,
                      'password' => $password,
                      'command' => $command,
                  ]);

                return response()->json(["Error: مشکلی در روند اجرای برنامه رخ داد" . $e->getMessage()]);
          }

        $module->config = $updateJson;
        $module->save();

          DB::commit();
        return response()->json($updateJson);
      } catch (Exception $e) {
          DB::rollBack();

            Log::channel('daily')->error('مشکلی در اپدیت کردن کانفیگ ماژول به وجود امد',[
              'route' => request()->fullUrl(),
              'method' => 'updateConfigModule',
              'user' => Auth::user(),
              'mofule'=> $module
            ]);

          return $this->respondInternalError('در روند اجرای برنامه مشکلی پیش امد');
      }
    }

}
