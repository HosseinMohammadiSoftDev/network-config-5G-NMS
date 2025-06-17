<?php

namespace Modules\Server\Services\Editor;

class BscConfigEditor
{

//    old update value
//    public static function updateValue(string $text, string $dotPath, string $newValue): string
//    {
//        $lines = explode("\n", $text);
//        $pathInfo = self::parsePath($dotPath);
//        $lineStack = [];
//        $currentPath = [];
//        $currentIndent = 0;
//
//
//        // --- BTS FEATURE START ---
//        if ($dotPath === 'BTS') {
//            $activeIndex = (int) $newValue;
//            if (in_array($activeIndex, [0, 1, 2], true)) {
//                $lines = self::applyBtsCommenting($lines, $activeIndex);
//                return implode("\n", $lines);
//            }
//        }
//        // --- BTS FEATURE END ---
//
//
//        foreach ($lines as $i => $line) {
//            $trimmed = trim($line);
//            if ($trimmed === '' || str_starts_with($trimmed, '!')) {
//                continue;
//            }
//
//            $indent = strlen($line) - strlen(ltrim($line));
//
//            while (!empty($lineStack) && $lineStack[count($lineStack) - 1]['indent'] >= $indent) {
//                array_pop($lineStack);
//            }
//
//            if (preg_match('/^([a-zA-Z0-9_\-\[\]]+)(?:\s+(.*))?$/', $trimmed, $matches)) {                $key = $matches[1];
//                $value = $matches[2] ?? null;
//
//                $lineStack[] = [
//                    'key' => $key,
//                    'value' => $value,
//                    'indent' => $indent,
//                    'lineIndex' => $i,
//                ];
//
//                if (self::isMatchingPath($lineStack, $pathInfo)) {
//                    if ($value !== null) {
//                        $lines[$i] = self::replaceLineValue($line, $newValue);
//                        return implode("\n", $lines);
//                    }
//                }
//            }
//        }
//
//        throw new \RuntimeException("Path '{$dotPath}' not found in configuration");
//    }

//    new update value
    public static function updateValue(string $text, string $dotPath, string $newValue): string
    {
        $lines    = explode("\n", $text);
        $pathInfo = self::parsePath($dotPath);
        $pi       = 0;

        // --- BTS FEATURE START ---
        if ($dotPath === 'BTS') {
            $activeIndex = (int) $newValue;
            if (in_array($activeIndex, [0, 1, 2], true)) {
                $lines = self::applyBtsCommenting($lines, $activeIndex);
                return implode("\n", $lines);
            }
        }
        // --- BTS FEATURE END ---

        foreach ($lines as $i => $line) {
            $trimmed = trim($line);

            if ($trimmed === '' || str_starts_with($trimmed, '!'))
                continue;


            if (!preg_match('/^([a-zA-Z0-9_\-]+)(?:\s+(.*))?$/', $trimmed, $m))
                continue;

            $key   = $m[1];
            $value = $m[2] ?? null;


            $expected = $pathInfo[$pi];
            if ($expected['key'] === $key) {

                if ($expected['index'] !== null) {
                    static $counts = [];
                    $counts[$key] = ($counts[$key] ?? 0) + 1;

                    if ($counts[$key] - 1 !== $expected['index']) {
                        continue;
                    }
                }

                $pi++;

                if ($pi === count($pathInfo) && $value !== null) {
                    $lines[$i] = self::replaceLineValue($line, $newValue);
                    return implode("\n", $lines);
                }
            }
        }

        throw new \RuntimeException("Path '{$dotPath}' not found in configuration");
    }


    private static function isMatchingPath(array $lineStack, array $pathInfo): bool
    {
        if (count($lineStack) < count($pathInfo))
            return false;


        for ($i = 0; $i < count($pathInfo); $i++) {
            $expected = $pathInfo[$i];
            $actual = $lineStack[$i];

            if ($expected['key'] !== $actual['key']) {
                return false;
            }

            if ($expected['index'] !== null) {
                $count = 0;
                for ($j = 0; $j <= $i; $j++) {
                    if ($lineStack[$j]['key'] === $expected['key']) {
                        $count++;
                    }
                }
                if ($count - 1 !== $expected['index']) {
                    return false;
                }
            }
        }


        return true;
    }

    private static function replaceLineValue(string $line, string $newValue): string
    {
        $indent = strlen($line) - strlen(ltrim($line));
        $trimmed = ltrim($line);
        $parts = preg_split('/\s+/', $trimmed);

        if (count($parts) > 1) {
            $parts[count($parts) - 1] = $newValue;
            return str_repeat(' ', $indent) . implode(' ', $parts);
        }

        return str_repeat(' ', $indent) . $parts[0] . ' ' . $newValue;
    }

    private static function parsePath(string $dotPath): array
    {
        $segments = explode('.', $dotPath);
        $result = [];

        foreach ($segments as $seg) {
            if (preg_match('/^(\w+)\[(\d+)\]$/', $seg, $m)) {
                $result[] = ['key' => $m[1], 'index' => (int)$m[2]];
            } else {
                $result[] = ['key' => $seg, 'index' => null];
            }
        }

        return $result;
    }

    public static function isValidOsmoBscConfig(string $configContent): bool
    {
        $requiredKeywords = [
            'osmo-bsc default configuration',
            'e1_input',
            'network',
            'bts',
            'trx',
            'msc',
            'bsc',
        ];

        // تمام خطوط فایل پیکربندی رو به آرایه‌ای از خطوط تبدیل می‌کنیم
        $lines = preg_split('/\r\n|\r|\n/', $configContent);

        // آرایه‌ای برای ذخیره‌ی موارد یافت‌شده
        $found = [];

        foreach ($lines as $line) {
            // حذف فضای خالی ابتدا و انتهای خط
            $cleanLine = trim($line);

            // حذف کامنت اولیه (در صورت وجود)، ولی نگه‌داشتن عبارت برای بررسی
            if (str_starts_with($cleanLine, '!')) {
                $cleanLine = ltrim(substr($cleanLine, 1));
            }

            foreach ($requiredKeywords as $keyword) {
                if (preg_match('/\b' . preg_quote($keyword, '/') . '\b/', $cleanLine)) {
                    $found[$keyword] = true;
                }
            }
        }

        // بررسی اینکه همه‌ی کلیدواژه‌ها پیدا شده‌اند
        foreach ($requiredKeywords as $keyword) {
            if (empty($found[$keyword])) {
                return false;
            }
        }

        return true;
    }


    private static function processLineComment(string $line, bool $shouldComment): string
    {
        $trimmed = ltrim($line);
        $originalIndent = substr($line, 0, strlen($line) - strlen($trimmed));

        if (preg_match('/^!+\s*to use full TRX power, set max_power_red 0$/i', $trimmed))
            return $line;


//      count ! to line
        preg_match('/^(!+\s*)/', $trimmed, $matches);
        $commentPrefix = $matches[1] ?? '';
        $commentCount = substr_count($commentPrefix, '!');

//      comment condition
        if ($shouldComment) {
            if ($commentCount === 0)
                return $originalIndent . '! ' . $trimmed;

            return $line;
        }

//          uncomment
        if ($commentCount > 0) {
            $newTrimmed = preg_replace('/^!\s?/', '', $trimmed);
                return $originalIndent . $newTrimmed;
        }

        return $line;
    }
    private static function applyBtsCommenting(array $lines, int $maxUncommentedBtsIndex): array
    {
        $firstBtsFound = false;
        $inBtsBlock = false;
        $currentBtsIndex = null;
        $shouldComment = true;
        $hoppingCount = 0;




        foreach ($lines as $i => $line) {
            $trimmed = trim($line);

            if (preg_match('/^(!\s*)?bts\s+(\d+)/i', $trimmed, $match)) {
                $inBtsBlock = true;
                $currentBtsIndex = (int)$match[2];
                $shouldComment = ($currentBtsIndex > $maxUncommentedBtsIndex);
                $hoppingCount = 0;


                if ($maxUncommentedBtsIndex === 0) {
                    if (!$firstBtsFound) {
                        $shouldComment = false;
                        $firstBtsFound = true;
                    } else {
                        $shouldComment = true;
                    }
                } else {
                    $shouldComment = ($currentBtsIndex > $maxUncommentedBtsIndex);
                }

                $hoppingCount = 0;

                $lines[$i] = self::processLineComment($line, $shouldComment);
                continue;
            }



            if ($inBtsBlock) {
                $lines[$i] = self::processLineComment($line, $shouldComment);

                if (preg_match('/^\s*!?\s*hopping enabled\s+0/i', $trimmed)) {
                    $hoppingCount++;

                    if ($hoppingCount === 8) {
                        $shouldComment = false;
                    }
                }
            }
        }

        return $lines;
    }
}
