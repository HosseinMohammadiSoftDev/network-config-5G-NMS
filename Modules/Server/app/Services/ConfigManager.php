<?php

namespace Modules\Server\Services;

use Exception;
use Illuminate\Validation\ValidationException;
use Modules\Server\Models\Module;
use Modules\Server\Services\Editor\BscConfigEditor;

class ConfigManager
{
    public function __construct(private string $content)
    {}

    public function applyChanges(array $changes): string
    {
        $this->validateChanges($changes);
            $modifiedContent = $this->processChanges($this->content, $changes);

        return $modifiedContent;
    }

    private function validateChanges(array $changes): void
    {
        foreach ($changes as $path => $value) {
//       check is string value to path value
//            if (!is_string($value))
//                throw ValidationException::withMessages(['value' => "The value for path \"{$path}\" must be a string, " . gettype($value) . " given."]);


            if (empty(trim($path)))
                throw ValidationException::withMessages(['path' => "The path cannot be empty.",]);

        }
    }



//    convertor
    private function processChanges(string $content, array $changes): string
    {
        foreach ($changes as $path => $newValue) {
//               section
            if ($this->isBlockStyleSection($content)) {
                $content = $this->processBracketSection($content, $path, $newValue);
                break;

//                OsmoBSC
            } elseif (BscConfigEditor::isValidOsmoBscConfig($content)) {
                $content = BscConfigEditor::updateValue($content, $path, $newValue);
                break;

//                key value
            } else {
                $content = $this->processNestedKey($content, $path, $newValue);
            }
        }

        return $content;
    }






//         section convertor
    private function MIMOUpdator (string $content, string $newValue): string
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
    private function isBlockStyleSection(string $content): bool
    {
//            section validation
        return (bool) preg_match('/^\s*\[[a-zA-Z0-9_.]+\]\s*$/m', $content);
    }
    private function processBracketSection(string $content, string $path, string $newValue): string
    {
        if ($path === 'transmission_mode')
            return $this->MIMOUpdator($content, $newValue);


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








//        nested key convertor
    private function selectRRFirstCell (string $configContent)
    {
        (object) $content = $configContent;

        if (preg_match('/cell_list\s*=\s*\(\s*({)/s', $content, $m, PREG_OFFSET_CAPTURE)) {
            $start = $m[1][1];
            for ($i = $start, $open = 0, $l = strlen($content); $i < $l; $i++) {
                if ($content[$i] === '{') $open++;
                if ($content[$i] === '}') $open--;
                if ($open === 0)
                    return substr($content, $start, $i - $start + 1);
            }
        }
        return null;
    }
    private function toggleCellListComment(string $configContent, int $targetIndex): string
    {
        $startPos = null;
        $cells = [];

        // پیدا کردن موقعیت شروع cell_list
        if (preg_match('/cell_list\s*=\s*\(/s', $configContent, $match, PREG_OFFSET_CAPTURE)) {
            $offset = $match[0][1] + strlen($match[0][0]);
            $endOffset = null;

            // استخراج بلاک‌های cell_list
            for ($i = $offset, $open = 0, $length = strlen($configContent); $i < $length; $i++) {
                $char = $configContent[$i];

                if ($char === '{') {
                    if ($open === 0) {
                        $startPos = $i;
                    }
                    $open++;
                } elseif ($char === '}') {
                    $open--;
                    if ($open === 0 && $startPos !== null) {
                        $endPos = $i;
                        $content = substr($configContent, $startPos, $endPos - $startPos + 1);
                        $cells[] = [
                            'start' => $startPos,
                            'end' => $endPos,
                            'content' => $content
                        ];
                        $startPos = null;
                    }
                }

                if ($open === 0 && isset($configContent[$i + 1]) && $configContent[$i + 1] === ')') {
                    $endOffset = $i + 2;
                    break;
                }
            }

            // اعمال تغییرات: کامنت کردن بلاک‌های بعد از targetIndex با /* */
            $result = $configContent;
            $offsetShift = 0;

            foreach ($cells as $index => $cell) {
                $original = $cell['content'];
                $start = $cell['start'] + $offsetShift;
                $length = strlen($original);

                if ($index > $targetIndex) {
                    // اگر قبلاً کامنت شده بود، دوباره کامنت نکن
                    if (!preg_match('/^\s*\/\*/', $original) && !preg_match('/\*\/\s*$/', $original)) {
                        $commented = "/*" . $original . "*/";
                        $result = substr_replace($result, $commented, $start, $length);
                        $offsetShift += strlen($commented) - $length;
                    }
                } else {
                    // اگر بلاک قبلاً با /* */ کامنت شده، از کامنت دربیار
                    if (preg_match('/^\s*\/\*/', $original) && preg_match('/\*\/\s*$/', $original)) {
                        $uncommented = preg_replace(['#^/\*#', '#\*/$#'], '', $original);
                        $uncommented = trim($uncommented);
                        $result = substr_replace($result, $uncommented, $start, $length);
                        $offsetShift += strlen($uncommented) - $length;
                    }
                }
            }

            return $result;
        }

        return $configContent;
    }
    private function duplicateCellInCellList(string $configContent)
    {
        $startPos = null;
        $cells = [];


// Find the start of cell_list and the beginning of the first {
        if (preg_match('/cell_list\s*=\s*\(/s', $configContent, $match, PREG_OFFSET_CAPTURE)) {
            $offset = $match[0][1] + strlen($match[0][0]);
            $endOffset = null;

            // Loop through characters to extract cell blocks within {}
            for ($i = $offset, $open = 0, $length = strlen($configContent); $i < $length; $i++) {
                $char = $configContent[$i];

                if ($char === '{') {
                    if ($open === 0) {
                        $startPos = $i;
                    }
                    $open++;
                } elseif ($char === '}') {
                    $open--;
                    if ($open === 0 && $startPos !== null) {
                        $cells[] = substr($configContent, $startPos, $i - $startPos + 1);
                        $startPos = null;
                    }
                }

                // End of cell_list block when we encounter closing )
                if ($open === 0 && isset($configContent[$i + 1]) && $configContent[$i + 1] === ')') {
                    $endOffset = $i + 2; // Include closing );
                    break;
                }
            }

            // If there are fewer than 3 cells, replicate the first one
            if (count($cells) < 3 && isset($cells[0])) {
                $cells = array_fill(0, 3, $cells[0]);
            }

            // Build the new cell_list string
            $newCellList = "cell_list = (\n  " . implode(",\n  ", $cells) . "\n);";

            // Get the original portion of the cell_list to replace it precisely
            $start = $match[0][1];
            $oldCellList = substr($configContent, $start, $endOffset - $start);

            // Replace only the matched cell_list part with the new one
            return substr_replace($configContent, $newCellList, $start, strlen($oldCellList));
        }

        return $configContent;

    }
    private function processNestedKey(string $content, string $path, string $newValue): string
    {
        if ($path === 'cell_list') {
            if (in_array((string) $newValue, ['0', '1', '2'], true)) {
                $confContent = $this->duplicateCellInCellList($content);
                    return $this->toggleCellListComment($confContent, $newValue);
            } else
                throw ValidationException::withMessages(['convertor' => 'The provided value for the "cell_list" key is not valid.']);
        }


        $parts = preg_split('/\.(?![^\[]*\])/', $path);

        $offset = 0;
        $len    = strlen($content);

        foreach ($parts as $i => $part) {
            $isLast = ($i === count($parts) - 1);

            // آیا آرایه‌ای مانند key[index] است؟
            if (preg_match('/^([a-zA-Z_]+)\[(\d+)\]$/', $part, $mIdx)) {
                $key = $mIdx[1];
                $idx = (int)$mIdx[2];

                // پیدا کردن کلید
                $reKey = '/\b' . preg_quote($key, '/') . '\b\s*=/';
                if (!preg_match($reKey, $content, $mKey, PREG_OFFSET_CAPTURE, $offset)) {
                    throw new Exception("Key '$key' not found after offset $offset");
                }
                // پیدا کردن اولین "(" بعد از "="
                $posEq    = strpos($content, '=', $mKey[0][1]) + 1;
                $posFirst = strpos($content, '(', $posEq);
                if ($posFirst === false) {
                    throw new Exception("Array block for '$key' not found");
                }

                // پیدا کردن nامین پرانتز
                $count = -1;
                for ($p = $posFirst; $p < $len; $p++) {
                    if ($content[$p] === '(') {
                        $count++;
                        if ($count === $idx) {
                            $start = $p;
                            break;
                        }
                    }
                }
                if (!isset($start)) {
                    throw new Exception("Array index $idx not found for '$key'");
                }
                // یافتن انتهای بلاک با تعادل پرانتز
                $depth = 1;
                for ($p2 = $start + 1; $p2 < $len && $depth > 0; $p2++) {
                    if ($content[$p2] === '(') $depth++;
                    if ($content[$p2] === ')') $depth--;
                }
                if ($depth !== 0) {
                    throw new Exception("Unmatched parentheses for '$key[$idx]'");
                }
                // شیفت آفست به داخل بلاک
                $offset = $start + 1;

            } else {
                // کلید ساده
                $key = $part;

                if ($isLast) {
                    // آخرین قطعه: جایگزینی مقدار—همیشه به صورت رشته!
                    $pattern = '/(' . preg_quote($key, '/') . '\s*=\s*)([^;]+)(;)/';
                    // همیشه در کوتیشن قرار می‌دهیم:
                    $val = '"' . addslashes((string)$newValue) . '"';
                    $replaced = preg_replace($pattern, '$1' . $val . '$3', $content, 1, $count);
                    if ($count === 0) {
                        throw new Exception("Failed to replace value for key '$key'");
                    }
                    return $replaced;
                }

                // کلید واسط: پیدا کردن بلوک بعدی ({...} یا (...))
                $reKey = '/\b' . preg_quote($key, '/') . '\b\s*=/';
                if (!preg_match($reKey, $content, $mKey, PREG_OFFSET_CAPTURE, $offset)) {
                    throw new Exception("Key '$key' not found after offset $offset");
                }
                $posEq    = strpos($content, '=', $mKey[0][1]) + 1;
                $posBrace = strpos($content, '{', $posEq);
                $posParen = strpos($content, '(', $posEq);

                if ($posBrace !== false && ($posParen === false || $posBrace < $posParen)) {
                    $start     = $posBrace;
                    $openChar  = '{';
                    $closeChar = '}';
                } elseif ($posParen !== false) {
                    $start     = $posParen;
                    $openChar  = '(';
                    $closeChar = ')';
                } else {
                    throw new Exception("Block not found after key '$key'");
                }

                // یافتن انتهای بلوک
                $depth = 1;
                for ($p2 = $start + 1; $p2 < $len && $depth > 0; $p2++) {
                    if ($content[$p2] === $openChar)  $depth++;
                    if ($content[$p2] === $closeChar) $depth--;
                }
                if ($depth !== 0) {
                    throw new Exception("Unmatched block delimiters for key '$key'");
                }
                $offset = $start + 1;
            }
        }

        throw new Exception("Unexpected end of updateConfigValue");
    }

}
