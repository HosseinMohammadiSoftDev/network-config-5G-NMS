<?php

namespace Modules\Server\Services\Editor;

use Exception;
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



//     edit config module
    public static function processNestedKey(string $content, string $path, string $newValue): string
    {
        if ($path === 'cell_list') {
            if (in_array((string) $newValue, ['0', '1', '2'], true)) {
                $confContent = self::duplicateCellInCellList($content);
                return self::toggleCellListComment($confContent, $newValue);
            } else
                throw ValidationException::withMessages(['convertor' => 'The provided value for the "cell_list" key is not valid.']);
        }

        $parts = preg_split('/\.(?![^\[]*\])/', $path);
        return self::processParts($content, $parts, $newValue);
    }
    private static function processParts(string $content, array $parts, string $newValue): string
    {
        $part = array_shift($parts);

        // Array element, e.g. key[index]
        if (preg_match('/^([a-zA-Z_]+)\[(\d+)\]$/', $part, $m)) {
            $key = $m[1];
            $idx = intval($m[2]);

            // find the array block for this key
            $reKey = '/\b' . preg_quote($key, '/') . '\b\s*=/';
            if (!preg_match($reKey, $content, $mKey, PREG_OFFSET_CAPTURE)) {
                throw new Exception("Key '$key' not found");
            }
            $posEq = strpos($content, '=', $mKey[0][1]) + 1;
            $posOpen = strpos($content, '(', $posEq);
            if ($posOpen === false) {
                throw new Exception("Array block for '$key' not found");
            }

            list($start, $end) = self::findIndexBlock($content, $posOpen, $idx);
            $block = substr($content, $start, $end - $start);

            if (empty($parts)) {
                // last part must include the actual key update, but here no further key => error
                throw new Exception("No key specified after '$part'");
            }

            // recurse inside this element
            $updatedInner = self::processParts($block, $parts, $newValue);
            return substr_replace($content, $updatedInner, $start, $end - $start);
        }

        // Simple or object block
        $key = $part;
        if (empty($parts)) {
            // direct replacement of key = value;
            $pattern = '/(' . preg_quote($key, '/') . '\s*=\s*)(["\d\w\-\/\.]+|"[^"]*")\s*;/';
            $val = '"' . addslashes($newValue) . '"';
            $replaced = preg_replace($pattern, '$1' . $val . ';', $content, 1, $count);
            if ($count === 0) {
                throw new Exception("Failed to replace value for key '$key'");
            }
            return $replaced;
        }

        // Nested object: find { ... } or ( ... ) after key
        $reKey = '/\b' . preg_quote($key, '/') . '\b\s*=/';
        if (!preg_match($reKey, $content, $mKey, PREG_OFFSET_CAPTURE)) {
            throw new Exception("Key '$key' not found");
        }
        $posEq = strpos($content, '=', $mKey[0][1]) + 1;
        $posBrace = strpos($content, '{', $posEq);
        $posParen = strpos($content, '(', $posEq);

        if ($posBrace !== false && ($posParen === false || $posBrace < $posParen)) {
            $open = '{'; $close = '}'; $posOpen = $posBrace;
        } elseif ($posParen !== false) {
            $open = '('; $close = ')'; $posOpen = $posParen;
        } else {
            throw new Exception("Block not found after key '$key'");
        }

        // find matching block
        $depth = 1; $len = strlen($content);
        for ($p = $posOpen + 1; $p < $len; $p++) {
            if ($content[$p] === $open) $depth++;
            if ($content[$p] === $close) {
                $depth--;
                if ($depth === 0) {
                    $start = $posOpen;
                    $end = $p + 1;
                    break;
                }
            }
        }

        $block = substr($content, $start, $end - $start);
        // recurse inside this block
        $updatedInner = self::processParts($block, $parts, $newValue);
        return substr_replace($content, $updatedInner, $start, $end - $start);
    }
    private static function findIndexBlock(string $content, int $posOpen, int $idx): array
    {
        $depth = 0;
        $count = -1;
        $len = strlen($content);
        $start = null;
        // traverse array contents
        for ($i = $posOpen + 1; $i < $len; $i++) {
            if ($content[$i] === '{') {
                if ($depth === 0) {
                    $count++;
                    if ($count === $idx) {
                        $start = $i;
                    }
                }
                $depth++;
            } elseif ($content[$i] === '}' && $depth > 0) {
                $depth--;
                if ($depth === 0 && $start !== null) {
                    return [$start, $i + 1];
                }
            }
        }
        throw new Exception("Array index $idx not found");
    }

}
