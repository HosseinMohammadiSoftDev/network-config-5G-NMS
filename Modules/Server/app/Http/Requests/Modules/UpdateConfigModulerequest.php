<?php

namespace Modules\Server\Http\Requests\Modules;

use Illuminate\Foundation\Http\FormRequest;

class UpdateConfigModulerequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'module_id' => ['required', 'exists:modules,id', 'integer'],
            'data' => ['required', 'array'],
            // 'data.*' => ['required', 'string'],
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
            'path' => ['nullable', 'string', 'max:255']
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
