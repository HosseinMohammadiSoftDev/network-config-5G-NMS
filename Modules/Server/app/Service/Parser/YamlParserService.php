<?php

namespace Modules\Server\Service\Parser;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Yaml\Exception\ParseException;
use Symfony\Component\Yaml\Yaml;

class YamlParserService
{
    public function __construct()
    {}


    // convet format
    public static function parseYamlToArray(UploadedFile $file)
    {
        try {

            $yamlContent = file_get_contents($file->getRealPath());
            if (!$yamlContent)
                throw new \Exception('YAML file is empty or unreadable.');

            $parsedArray = Yaml::parse($yamlContent);
            if (!is_array($parsedArray))
                throw new \Exception('Invalid YAML structure.');

            return $parsedArray;

        } catch (ParseException $e) {
            throw ValidationException::withMessages(['error' => 'YAML Parse Error', 'message' => $e->getMessage()]);
        } catch (\Exception $e) {
            throw ValidationException::withMessages(['error' => 'General Error', 'message' => $e->getMessage()]);
        }
    }
    public static function convertJsonToYaml($jsonContent)
    {
        $arrayContent = json_decode($jsonContent, true, 512, JSON_BIGINT_AS_STRING | JSON_THROW_ON_ERROR);

        if (json_last_error() !== JSON_ERROR_NONE)
            throw new HttpResponseException(response()->json(['msg' => 'error in convert json to yaml'], 422));

        $arrayContent = self::convertNullKeysToComments($arrayContent);

        $yamlContent = yaml::dump($arrayContent, 10,2);

        // $yamlContent = preg_replace('/^(\s*)-\s*/m', '$1', $yamlContent);
        $yamlContent = preg_replace('/^(\s*)-\s*/m', '$1- ', $yamlContent);

        return $yamlContent;

    }
    private static function convertNullKeysToComments(array $array)
    {
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $array[$key] = self::convertNullKeysToComments($value);
            } elseif ($value === null || $value === "" || $value === '') {
                $array["# $key"] = null;
                unset($array[$key]);
            }
        }

        return $array;
    }

}
