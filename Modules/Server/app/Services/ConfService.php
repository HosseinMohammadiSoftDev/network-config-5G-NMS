<?php

namespace Modules\Server\Services;

use Illuminate\Validation\ValidationException;
use Modules\Server\Services\Paeser\NeonPaeser;
use Modules\Server\Services\Paeser\OsmoBscParser;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ConfService {

    public function __construct()
    {}

    private function detectConfigFormat(string $content, $fileExtension): string
    {
        $withoutComments = preg_replace('/\/\/.*|#.*|!.*/', '', $content);

        if (preg_match('/^\s*\[.*\]\s*$/m', $withoutComments))
            return 'ini';


        if (preg_match('/^\s*\w+\s*=\s*\{/', $withoutComments))
            return 'neon_like';


        if (preg_match('/^\s*\w+\s*{/', $withoutComments))
            return 'apache_like';

        if ($fileExtension === 'cfg')
            return 'cfg';

        return 'unknown';
    }
    public function parseConfToArrayAsFile (UploadedFile $file): mixed
    {
        try {
            $confContent = $file->getContent();

            $format = $this->detectConfigFormat($confContent, $file->getClientOriginalExtension());
            if (!$confContent)
                throw ValidationException::withMessages(['config_file' => 'Config file is empty or unreadable.']);


            switch ($format) {
                case 'neon_like':
                        $parsedArray = NeonPaeser::parseCustomConfigNeon($confContent);
                    break;

                case 'ini':
                        $confContent = preg_replace('/^\s*[#!].*$/m', '', $confContent);
                    $parsedArray = parse_ini_string($confContent, true, INI_SCANNER_TYPED);
                    break;

                case 'cfg':
                        $parsedArray = OsmoBscParser::parse($confContent);
                    break;

                default:
                    throw ValidationException::withMessages(['config_file' => 'Unsupported config format.']);
            }


            return $parsedArray;

        } catch (\Exception $e) {

            throw ValidationException::withMessages([
                'error' => 'Conf Parse Error',
                'message' => $e->getMessage()
            ]);
        }
    }
    public function parseConfToArrayAsContentFile(string $confContent, string $fileEctension): array
    {
        try {

            $format = $this->detectConfigFormat($confContent, $fileEctension);
            if (!$confContent)
                throw ValidationException::withMessages(['config_file' => 'Config file is empty or unreadable.']);


            switch ($format) {
                case 'neon_like':
                    $parsedArray = NeonPaeser::parseCustomConfigNeon($confContent);
                    break;

                case 'ini':
                            $confContent = preg_replace('/^\s*#.*$/m', '', $confContent); // delete comment ini content config
                        $parsedArray = parse_ini_string($confContent, true, INI_SCANNER_TYPED);
                    break;

                case 'cfg':
                    $parsedArray = OsmoBscParser::parse($confContent);
                    break;

                default:
                    throw ValidationException::withMessages(['config_file' => 'Unsupported config format.']);
            }

            if (!is_array($parsedArray))
                throw ValidationException::withMessages(['config_file' => 'Parsed content is not a valid array.']);

            $parsedArray['__format_type'] = $format;

            return $parsedArray;

        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'error' => 'Conf Parse Error',
                'message' => $e->getMessage()
            ]);
        }
    }

}
