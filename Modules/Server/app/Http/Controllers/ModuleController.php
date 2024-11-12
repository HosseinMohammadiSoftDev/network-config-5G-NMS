<?php

namespace Modules\Server\Http\Controllers;

use App\Http\Controllers\Contract\ApiController;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Modules\Server\Helpers\JsonUpdater;
use Modules\Server\Http\Requests\Modules\CreateModulesRequest;
use Modules\Server\Http\Requests\Modules\UpdateConfigModulerequest;
use Modules\Server\Http\Requests\Server\UploadModuleRequest;
use Modules\Server\Models\Module;
use Modules\Server\Models\Service;
use Modules\Server\Services\JSONReader;
use Modules\Server\Services\YAMLReader;
use Spyc;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ModuleController extends ApiController
{


  
  public function showConfigModule ($moduleId)
  {
      $module = Module::find($moduleId);
  
      if (!$module) {
          return response()->json(['msg' => 'سرور پیدا نشد'], 404);
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
          return response()->json(['msg' => 'مشکلی در تبدیل فایل به جیسون پیش امد: ' . $e->getMessage()], 400);
      }
  
      $jsonContent = json_encode($yamlContent, JSON_PRETTY_PRINT);
  
      $server = Module::find($credentials['module_id']);
        if (!$server) 
            return response()->json(['msg' => 'شناسه سرویس نانعتبر است'], 404);
        
  
      $server->config = $jsonContent;
      $server->save();
  
      return $this->respondSuccess('فایل با موفقت  تبدیل به جیسون شد', []);
  }

  private function parseYamlWithSpyc(UploadedFile $file)
  {
      $filePath = $file->getPathname();
      $yamlContent = Spyc::YAMLLoad($filePath);
      return $yamlContent;
  }
  private function uploadModuleFile ($file)
  {

    try {
      $yamlContent = $this->parseYamlWithSpyc($file);
    } catch (Exception $e) {
        return response()->json(['msg' => 'مشکلی در تبدیل فایل به جیسون پیش امد: ' . $e->getMessage()], 400);
    }

    $jsonContent = json_encode($yamlContent, JSON_PRETTY_PRINT);

    return $jsonContent;

  }
  public function createModule (CreateModulesRequest $request)
  {
      $creadtional = $request->validated();
      
      $jsonContent = $this->uploadModuleFile($request->file('config_file'));
      
      if (is_array($jsonContent) || is_object($jsonContent)) 
          return $jsonContent;
      

      Module::create([
          'name' => $creadtional['name'],
          'services_id' => $creadtional['service_id'],
          'config' => $jsonContent, 
      ]);

      return $this->respondCreated('ماژول با موفقیت ساخته شد', []);
  }
  
  public function updateConfigModule (UpdateConfigModulerequest $request)
    {
      $moduleId = $request->input('module_id');
      $fieldPath = $request->input('field');
      $newValue = $request->input('value');

      $module = Module::find($moduleId);
      $moduleConfig = json_decode($module->config, 1);

      $updateJson = JsonUpdater::updateJsonValue($moduleConfig, $fieldPath, $newValue);

      $module->config = $updateJson;
      $module->save();

      return response()->json($updateJson);
    }
}
