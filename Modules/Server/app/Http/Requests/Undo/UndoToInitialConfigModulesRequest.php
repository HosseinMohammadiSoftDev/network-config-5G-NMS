<?php

namespace Modules\Server\Http\Requests\Undo;

use Illuminate\Foundation\Http\FormRequest;

class UndoToInitialConfigModulesRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'module_id' => ['required', 'integer', 'exists:modules,id'],
            'host' => ['required', 'string', 'regex:/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/', 'max:15'],
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
            'path' => ['nullable', 'string']
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
}
