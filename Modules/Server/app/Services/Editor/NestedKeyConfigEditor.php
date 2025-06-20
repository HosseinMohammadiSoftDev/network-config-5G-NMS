<?php

namespace Modules\Server\Services\Editor;

use Illuminate\Validation\ValidationException;

class NestedKeyConfigEditor
{
    public function __construct()
    {}


//        nested key convertor
    private static function selectRRFirstCell (string $configContent)
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
    private static function toggleCellListComment(string $configContent, int $targetIndex): string
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
    private static function duplicateCellInCellList(string $configContent)
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

    public static function processNestedKey(string $content, string $path, string $newValue): string
    {
        // Special handling for 'cell_list' key
        if ($path === 'cell_list') {
            if (in_array((string)$newValue, ['0', '1', '2'], true)) {
                $confContent = self::duplicateCellInCellList($content);
                return self::toggleCellListComment($confContent, $newValue);
            }
            throw ValidationException::withMessages([
                'convertor' => 'The provided value for the "cell_list" key is not valid.'
            ]);
        }

        // Split dot notation path into parts
        $parts = preg_split('/\.(?![^\[]*\])/', $path);
        $currentContent = $content;
        $currentOffset = 0;

        foreach ($parts as $i => $part) {
            $isLast = ($i === count($parts) - 1);

            // Check if this part is an indexed array (e.g. item[0])
            if (preg_match('/^([a-zA-Z_]+)\[(\d+)\]$/', $part, $matches)) {
                $key = $matches[1];
                $index = (int)$matches[2];

                // Find the array block
                $arrayStart = strpos($currentContent, $key . ' = (', $currentOffset);
                if ($arrayStart === false) {
                    throw new Exception("Array '$key' not found");
                }

                $arrayStart += strlen($key . ' = (');
                $arrayEnd = self::findMatchingParenthesis($currentContent, $arrayStart);

                $arrayContent = substr($currentContent, $arrayStart, $arrayEnd - $arrayStart);
                $arrayItems = self::parseArrayItems($arrayContent);

                if (!isset($arrayItems[$index])) {
                    throw new \Exception("Index $index not found in array '$key'");
                }

                if ($isLast) {
                    $arrayItems[$index] = self::modifyConfigValue($arrayItems[$index], $newValue);
                    $newArrayContent = $key . ' = (' . implode("\n", $arrayItems) . ');';

                    return substr_replace(
                        $currentContent,
                        $newArrayContent,
                        $arrayStart - strlen($key . ' = ('),
                        $arrayEnd - $arrayStart + strlen($key . ' = (') + 1
                    );
                }

                $currentContent = $arrayItems[$index];
                $currentOffset = 0;
            } else {
                $key = $part;

                // Find the key-value pair
                $keyPos = strpos($currentContent, $key . ' = ', $currentOffset);
                if ($keyPos === false) {
                    throw new \Exception("Key '$key' not found");
                }

                $valueStart = $keyPos + strlen($key . ' = ');
                $valueEnd = strpos($currentContent, ';', $valueStart);
                $currentValue = substr($currentContent, $valueStart, $valueEnd - $valueStart);

                if ($isLast) {
                    $newValueFormatted = self::formatConfigValue($newValue);
                    $newPair = $key . ' = ' . $newValueFormatted;

                    return substr_replace(
                        $currentContent,
                        $newPair,
                        $valueStart,
                        strlen($currentValue)
                    );
                }

                // Find nested block
                $blockStart = strpos($currentContent, '{', $valueEnd);
                if ($blockStart === false) {
                    $blockStart = strpos($currentContent, '(', $valueEnd);
                    if ($blockStart === false) {
                        throw new \Exception("Block not found after key '$key'");
                    }
                    $blockEnd = self::findMatchingParenthesis($currentContent, $blockStart);
                } else {
                    $blockEnd = self::findMatchingBrace($currentContent, $blockStart);
                }

                $currentContent = substr($currentContent, $blockStart + 1, $blockEnd - $blockStart - 1);
                $currentOffset = 0;
            }
        }

        throw new \Exception("Unexpected end of processNestedKey");
    }

    private static function findMatchingParenthesis(string $content, int $start): int
    {
        $depth = 1;
        for ($i = $start + 1; $i < strlen($content); $i++) {
            if ($content[$i] === '(') $depth++;
            if ($content[$i] === ')') $depth--;
            if ($depth === 0) return $i;
        }
        throw new \Exception("Unmatched parentheses");
    }

    private static function findMatchingBrace(string $content, int $start): int
    {
        $depth = 1;
        for ($i = $start + 1; $i < strlen($content); $i++) {
            if ($content[$i] === '{') $depth++;
            if ($content[$i] === '}') $depth--;
            if ($depth === 0) return $i;
        }
        throw new Exception("Unmatched braces");
    }

    private static function parseArrayItems(string $content): array
    {
        $items = [];
        $currentItem = '';
        $depth = 0;

        $lines = explode("\n", $content);
        foreach ($lines as $line) {
            $trimmed = trim($line);
            if (empty($trimmed)) {
                continue;
            }

            $currentItem .= $line . "\n";
            $depth += substr_count($line, '{') - substr_count($line, '}');

            if ($depth === 0 && strpos($trimmed, '}') !== false) {
                $items[] = trim($currentItem);
                $currentItem = '';
            }
        }

        if (!empty(trim($currentItem))) {
            $items[] = trim($currentItem);
        }

        return $items;
    }

    private static function modifyConfigValue(string $item, string $newValue): string
    {
        if (preg_match('/^([a-zA-Z_]\w*)\s*=\s*(.*)$/s', trim($item), $matches)) {
            $key = $matches[1];
            return $key . ' = ' . self::formatConfigValue($newValue);
        }
        return self::formatConfigValue($newValue);
    }

    private static function formatConfigValue(string $value): string
    {
        $value = trim($value);

        if (preg_match('/^0x[\da-fA-F]+$/', $value)) return $value;
        if (is_numeric($value)) return $value;
        if ($value === 'true' || $value === 'false') return $value;
        if (in_array(strtoupper($value), ['INFINITY', 'NORMAL', 'PERIODIC'])) return $value;
        if (!preg_match('/^["\'].*["\']$/', $value)) return '"' . addslashes($value) . '"';

        return $value;
    }
}
