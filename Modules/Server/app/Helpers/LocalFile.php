<?php

namespace Modules\Server\Helpers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\ValidationException;
use Modules\Server\Models\Module;

class LocalFile
{
    public function __construct()
    {}


//        log helper func
    protected static function logActivity($event, $method, Module $module)
    {
        activity($event)
            ->causedBy(null)
            ->event($event)
            ->withProperties([
                'type-log' => 'server',
                'route' => request()->fullUrl(),
                'method' => $method,
                'fullPath' => self::pathFile($module),
                'module' => [
                    'id' => $module['id'],
                    'name' => $module['name'],
                    'type' => $module['type'],
                ]
            ])
            ->log($event);
    }

//          make file path
    protected static function pathFile (Module $module)
    {
        return $module['path_config'] . $module['name'] . '.' . $module['extension'];
    }


    public static function getFile (Module $module)
    {
        if (!File::exists(self::pathFile($module)))
            throw ValidationException::withMessages(['filePath' => 'file not found to in path file']);

        self::logActivity('get-file', 'getFile', $module);

        return File::get(self::pathFile($module));
    }
    public static function putFile (Module $module, $fileContent)
    {
//          validate existence path Directory
        if (!File::exists($module['path_config']))
            File::makeDirectory($module['path_config'], 0777, true);

        self::logActivity('put-file', 'putFile', $module);

        return File::put(self::pathFile($module), $fileContent);
    }
    public static function moveFile (Module $module, Module $oldModule)
    {
        $oldMoudlePath = $oldModule['path_config'] . $oldModule['name'] . '.' . $oldModule['extension'];
        $newModulePath = $oldModule['path_config'] . $module['name'] . '.' . $module['extension'];

        self::logActivity('move-config-file', 'moveFile', $module);

        if (File::exists($oldMoudlePath))
            File::move($oldMoudlePath, $newModulePath);
    }
    public static function deleteFile (Module $module)
    {
        if (!File::exists(self::pathFile($module)))
            throw ValidationException::withMessages(['filePath' => 'file not found to in path file']);

        self::logActivity('delete-file', 'deleteFile', $module);

        return File::delete(self::pathFile($module));
    }
}
