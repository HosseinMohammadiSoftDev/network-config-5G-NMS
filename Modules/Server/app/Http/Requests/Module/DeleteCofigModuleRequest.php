<?php

namespace Modules\Server\Http\Requests\Module;

use Illuminate\Foundation\Http\FormRequest;

class DeleteCofigModuleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'module_id' => ['required', 'integer', 'exists:modules,id'],
            'path' => ['required', 'array'],
            'path.*' => ['required', 'string'],

            'username' => ['required', 'string', 'max:127'],
            'password' => ['required', 'string', 'max:127'],
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
