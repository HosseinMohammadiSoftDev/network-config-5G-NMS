<?php

namespace Modules\Server\Services;

use Exception;
use Illuminate\Validation\ValidationException;
use Modules\Server\Models\Module;
use Modules\Server\Services\Editor\BscConfigEditor;
use Modules\Server\Services\Editor\NestedKeyConfigEditor;
use Modules\Server\Services\Editor\SectionConfigEditor;

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

            if (empty(trim($path)))
                throw ValidationException::withMessages(['path' => "The path cannot be empty.",]);

        }
    }



//    convertor
    private function processChanges(string $content, array $changes): string
    {
        foreach ($changes as $path => $newValue) {
//               section
            if (SectionConfigEditor::isBlockStyleSection($content)) {
                $content = SectionConfigEditor::processBracketSection($content, $path, $newValue);
                break;

//                OsmoBSC
            } elseif (BscConfigEditor::isValidOsmoBscConfig($content)) {
                $content = BscConfigEditor::updateValue($content, $path, $newValue);
                break;

//                key value
            } else {
                $content = NestedKeyConfigEditor::processNestedKey($content, $path, $newValue);
            }
        }

        return $content;
    }

}
