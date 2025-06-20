<?php

namespace Modules\Server\Services\Editor;

class SectionConfigEditor
{
        public function __construct ()
        {}


//         section convertor
    private static function MIMOUpdator (string $content, string $newValue): string
    {
        $pattern = '/^\s*\[enb\]\s*$(.*?)(?=^\s*\[|\Z)/ms';

        if (preg_match($pattern, $content, $matches)) {
            $section = $matches[0];
            $updatedSection = $section;

            if (strtoupper($newValue) === 'MIMO') {

                $updatedSection = preg_replace('/^\s*#\s*(tm\s*=\s*\d+)/m', '$1', $updatedSection);
                $updatedSection = preg_replace('/^\s*#\s*(nof_ports\s*=\s*\d+)/m', '$1', $updatedSection);
            } elseif (strtoupper($newValue) === 'SISO') {

                $updatedSection = preg_replace('/^\s*(tm\s*=\s*\d+)/m', '#$1', $updatedSection);
                $updatedSection = preg_replace('/^\s*(nof_ports\s*=\s*\d+)/m', '#$1', $updatedSection);
            }


            $content = str_replace($section, $updatedSection, $content);
        }

        return $content;
    }
    public static function isBlockStyleSection(string $content): bool
    {
//            section validation
        return (bool) preg_match('/^\s*\[[a-zA-Z0-9_.]+\]\s*$/m', $content);
    }
    public static function processBracketSection(string $content, string $path, string $newValue): string
    {
        if ($path === 'transmission_mode')
            return self::MIMOUpdator($content, $newValue);


        $section = trim($path, '[]');
        $parts = explode('.', $section);
        $sectionName = preg_quote($parts[0], '/');
        $key = isset($parts[1]) ? preg_quote($parts[1], '/') : null;

        $sectionPattern = '/^\s*\[' . $sectionName . '\]\s*$(.*?)(?=^\s*\[|\Z)/ms';

        if (preg_match($sectionPattern, $content, $matches)) {
            $sectionContent = $matches[0];

            if ($key) {
                $replacementPattern = '/^(\s*' . $key . '\s*=\s*)([^\r\n]+)/m';
                $newSectionContent = preg_replace($replacementPattern, '${1}' . $newValue, $sectionContent);
            } else {
                $replacementPattern = '/^(\s*' . $sectionName . '\s*=\s*)([^\r\n]+)/m';
                $newSectionContent = preg_replace($replacementPattern, '${1}' . $newValue, $sectionContent);
            }

            if ($sectionContent !== $newSectionContent) {
                $content = str_replace($sectionContent, $newSectionContent, $content);
            }
        }

        return $content;
    }
}
