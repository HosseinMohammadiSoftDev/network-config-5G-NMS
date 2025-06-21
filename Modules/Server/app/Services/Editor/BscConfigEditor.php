<?php

namespace Modules\Server\Services\Editor;

class BscConfigEditor
{
//        editor
    public static function updateValue(string $text, string $dotPath, string $newValue): string
    {
        $lines = explode("\n", $text);
        $pathInfo = self::parsePath($dotPath);
        $stack = [];


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
            if ($trimmed === '') continue;
            $indent = strlen($line) - strlen(ltrim($line));
            while (!empty($stack) && end($stack)['indent'] >= $indent) {
                array_pop($stack);
            }
            $isComment = str_starts_with($trimmed, '!');
            $content = $isComment ? ltrim(substr($trimmed, 1)) : $trimmed;
            $parts = preg_split('/\s+/', $content);
            if (count($parts) === 0) continue;

            if (count($parts) === 1) {
                $stack[] = ['key'=>$parts[0], 'index'=>null, 'indent'=>$indent];
                continue;
            }

            $value = array_pop($parts);
            $keys = $parts;



            // determine index only for keys expected to have an index in pathInfo
            $lineIndex = null;
            if (count($keys) === 1 && is_numeric($value)) {
                // depth in full path would be current stack length
                $depth = count($stack);
                if (isset($pathInfo[$depth]) && $pathInfo[$depth]['key'] === $keys[0] && $pathInfo[$depth]['index'] !== null) {
                    $lineIndex = (int)$value;
                    $value = null;
                }
            }

            foreach ($keys as $key) {
                $stack[] = ['key'=>$key, 'index'=>$lineIndex, 'indent'=>$indent];
                $lineIndex = null;
            }

            if (!$isComment && $value !== null) {
                if (self::pathMatches($stack, $pathInfo)) {
                    $origParts = preg_split('/\s+/', ltrim($line));
                    $origParts[count($origParts)-1] = $newValue;
                    $lines[$i] = str_repeat(' ', $indent) . implode(' ', $origParts);
                    return implode("\n", $lines);
                }
            }
        }

        throw new \RuntimeException("Path '{$dotPath}' not found in configuration");
    }
    private static function pathMatches(array $stack, array $pathInfo): bool
    {
        $built = [];
        $counters = [];
        foreach ($stack as $entry) {
            $k = $entry['key'];
            if (!isset($counters[$k])) $counters[$k]=0;
            $idx = $entry['index'] ?? $counters[$k];
            $built[] = ['key'=>$k,'index'=>$idx];
            $counters[$k]++;
        }
        $n = count($built);
        $m = count($pathInfo);
        if ($n < $m) return false;
        $offset = $n - $m;
        for ($i = 0; $i < $m; $i++) {
            if ($built[$offset+$i]['key'] !== $pathInfo[$i]['key']) return false;
            if ($pathInfo[$i]['index'] !== null && $built[$offset+$i]['index'] !== $pathInfo[$i]['index']) return false;
        }
        return true;
    }
    private static function parsePath(string $dotPath): array
    {
        $res = [];
        foreach (explode('.', $dotPath) as $p) {
            if (preg_match('/^(\w+)\[(\d+)\]$/',$p,$m)) {
                $res[]=['key'=>$m[1],'index'=>(int)$m[2]];
            } else {
                $res[]=['key'=>$p,'index'=>null];
            }
        }
        return $res;
    }


//        Validation
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


//        commeting BTS
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
