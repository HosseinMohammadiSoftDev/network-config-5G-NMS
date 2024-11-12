<?php 

namespace Modules\Server\Helpers;


class JsonUpdater
{
   
    public static function updateJsonValue(array $json, string $path, $value)
    {
        $path = preg_replace('/\[(\d+)\]/', '.$1', $path);
        $keys = explode('.', $path);
        $currentNode = &$json; 
    
        foreach ($keys as $index => $key) {

            if (is_numeric($key) && is_array($currentNode)) {
                if (isset($currentNode[(int)$key])) 
                    $currentNode = &$currentNode[(int)$key];
                else
                    return $json;
            }
            elseif (isset($currentNode[$key]))
                $currentNode = &$currentNode[$key];
            else
                return $json;


                    // validation types and keys 
            if ($index == count($keys) - 1) {
                if ($index < count($keys) - 1) 
                    throw new \Exception("بعد از این مورد کلید وجود دارد برسی کنید که ایا مسیر را اشتباه وارد نکردید");
            }
        }
    
        $currentNode = $value;
    
        return $json;
    }

}