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
            'server_id' => ['required', 'integer', 'exists:servers,id'],
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
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
