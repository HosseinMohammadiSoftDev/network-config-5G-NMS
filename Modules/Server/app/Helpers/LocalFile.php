<?php

namespace Modules\Server\Helpers;

use Illuminate\Support\Facades\File;
use Modules\Server\Models\Module;

class LocalFile
{
    public function __construct(){}

    protected static function pathFile (Module $module)
    {
        return $module['path_config'] . $module['name'] . '.' . $module['extension'];
    }
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
    public static function moveFile (Module $module, Module $oldModule)
    {
        $oldMoudlePath = $oldModule['path_config'] . $oldModule['name'] . '.' . $oldModule['extension'];
        $newModulePath = $oldModule['path_config'] . $module['name'] . '.' . $module['extension'];

        self::logActivity('move-config-file', 'moveFile', $module);

        if (File::exists($oldMoudlePath))
            File::move($oldMoudlePath, $newModulePath);
    }
}
