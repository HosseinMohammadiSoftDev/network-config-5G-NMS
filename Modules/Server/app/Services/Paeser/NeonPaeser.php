<?php

namespace Modules\Server\Services\Paeser;

use Nette\Neon\Neon;

class NeonPaeser
{
    public function __construct()
    {}


    public static function parseCustomConfigNeon(string $confContent): array
    {
        // Remove line comments starting with //
        $clean = preg_replace('/\/\/.*$/m', '', $confContent);

        // Remove line comments starting with #
        $clean = preg_replace('/#.*$/m', '', $clean);

        // Remove block comments (/* ... */)
        $clean = preg_replace('/\/\*.*?\*\//s', '', $clean);

        // Remove trailing semicolons at the end of lines
        $clean = preg_replace('/;\s*$/m', '', $clean);

        // Replace equal signs (=) with colons (:) for valid NEON syntax
        $clean = preg_replace('/\s*=\s*/', ': ', $clean);

        // Convert parentheses to square brackets for lists/arrays
        $clean = str_replace(['(', ')'], ['[', ']'], $clean);

        // Remove trailing commas at the end of array/list items
        $clean = preg_replace('/,\s*$/m', '', $clean);

        // Remove unnecessary empty lines or lines with only spaces/tabs
        $clean = preg_replace('/^\s*[\r\n]/m', '', $clean);

        // Normalize indentation (optional, improves readability)
        $clean = preg_replace('/^\s{2,}/m', '  ', $clean);

        // Remove trailing semicolons at the end of lines
        $clean = preg_replace('/;\s*(?=(\/\/|#|$))/m', '', $clean);

        // Remove duplicate semicolons (;;)
        $clean = preg_replace('/;{2,}/', '', $clean);

        // Remove semicolon after closing curly brace (};)
        $clean = preg_replace('/\}\s*;/m', '}', $clean);

        // Normalize indentation (optional, improves readability)
        $clean = preg_replace('/;+/', '', $clean);

        try {
            return Neon::decode($clean);
        } catch (\Throwable $e) {
            throw new \Exception("Failed to parse NEON: " . $e->getMessage());
        }
    }
}
