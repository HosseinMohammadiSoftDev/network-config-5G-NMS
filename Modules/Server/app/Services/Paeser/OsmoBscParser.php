<?php

namespace Modules\Server\Services\Paeser;

class OsmoBscParser
{
    public static function parse(string $cfg): mixed
    {
        $lines       = explode("\n", $cfg);
        $stack       = [[]];
        $indentStack = [-1];

        foreach ($lines as $index => $line) {
            $raw  = rtrim($line, "\r");
            $trim = trim($raw);

            if ($trim === '' || str_starts_with($trim, '!')) {
                continue;
            }

            $indent = strlen($raw) - strlen(ltrim($raw, " "));
            $tokens = preg_split('/\s+/', $trim);
            $key    = array_shift($tokens);

            while ($indent <= end($indentStack)) {
                array_pop($stack);
                array_pop($indentStack);
            }

            $parent = & $stack[count($stack) - 1];

            // Numeric key with sub-indent (arrays)
            if (self::isNumericKeyWithSubIndent($lines, $index, $tokens, $indent)) {
                $idx = (int)$tokens[0];
                if (!isset($parent[$key][$idx])) {
                    $parent[$key][$idx] = [];
                }
                $stack[]        = & $parent[$key][$idx];
                $indentStack[]  = $indent;
                continue;
            }

            // Parent list when next line is more indented
            if (self::nextLineHasGreaterIndent($lines, $index, $indent) && count($tokens) === 0) {
                if (!isset($parent[$key])) {
                    $parent[$key] = [];
                }
                $stack[]       = & $parent[$key];
                $indentStack[] = $indent;
                continue;
            }

            // Special indexed format
            if (self::isSpecialIndexedLine($tokens)) {
                self::handleSpecialIndexedLine($parent, $key, $tokens);
                continue;
            }

            // Handle values and nested values, merging to preserve both simple and nested
            if (count($tokens) === 1) {
                // simple single value
                $value = $tokens[0];
                if (isset($parent[$key])) {
                    // existing nested, convert scalar to '_'
                    if (!is_array($parent[$key])) {
                        $parent[$key] = ['_' => $parent[$key]];
                    }
                    $parent[$key]['_'] = $value;
                } else {
                    $parent[$key] = $value;
                }
            } elseif (count($tokens) > 1) {
                // nested key-values, e.g. 'algorithm 1'
                $nested = self::parseNestedKeyValue($tokens);
                if (isset($parent[$key]) && !is_array($parent[$key])) {
                    // convert existing scalar to array
                    $parent[$key] = ['_' => $parent[$key]];
                }
                if (!isset($parent[$key])) {
                    $parent[$key] = $nested;
                } else {
                    // merge nested into existing array
                    $parent[$key] = array_merge($parent[$key], $nested);
                }
            }
        }

        return $stack[0];
    }

    private static function nextLineHasGreaterIndent(array $lines, int $index, int $currentIndent): bool
    {
        for ($j = $index + 1; $j < count($lines); $j++) {
            $raw  = rtrim($lines[$j], "\r");
            $trim = trim($raw);
            if ($trim === '' || str_starts_with($trim, '!')) {
                continue;
            }
            $nextIndent = strlen($raw) - strlen(ltrim($raw, " "));
            return $nextIndent > $currentIndent;
        }
        return false;
    }

    private static function isNumericKeyWithSubIndent(array $lines, int $index, array $tokens, int $indent): bool
    {
        return count($tokens) === 1 && is_numeric($tokens[0]) && self::getNextIndent($lines, $index) > $indent;
    }

    private static function getNextIndent(array $lines, int $currentLineIndex): int
    {
        for ($j = $currentLineIndex + 1; $j < count($lines); $j++) {
            $raw  = rtrim($lines[$j], "\r");
            $trim = trim($raw);
            if ($trim === '' || str_starts_with($trim, '!')) {
                continue;
            }
            return strlen($raw) - strlen(ltrim($raw, " "));
        }
        return -1;
    }

    private static function isSpecialIndexedLine(array $tokens): bool
    {
        return count($tokens) >= 3 && is_numeric($tokens[0]) && count($tokens) % 2 === 1;
    }

    private static function handleSpecialIndexedLine(array &$parent, string $key, array $tokens): void
    {
        $index = array_shift($tokens);
        $sub   = self::parseKeyValuePairs($tokens);
        if (!isset($parent[$key])) {
            $parent[$key] = [];
        }
        $parent[$key][$index] = $sub;
    }

    private static function parseKeyValuePairs(array $tokens): array
    {
        $sub = [];
        for ($i = 0; $i < count($tokens) - 1; $i += 2) {
            $sub[$tokens[$i]] = $tokens[$i + 1];
        }
        if (count($tokens) % 2 !== 0) {
            $sub['_'] = $tokens[count($tokens) - 1];
        }
        return $sub;
    }

    private static function parseNestedKeyValue(array $tokens): array
    {
        $reversed = array_reverse($tokens);
        $value    = array_shift($reversed);
        while (count($reversed) >= 1) {
            $key   = array_shift($reversed);
            $value = [$key => $value];
        }
        return $value;
    }

    public static function toJson(string $cfg, int $options = JSON_PRETTY_PRINT): string
    {
        return json_encode(self::parse($cfg), $options | JSON_UNESCAPED_UNICODE);
    }
}
