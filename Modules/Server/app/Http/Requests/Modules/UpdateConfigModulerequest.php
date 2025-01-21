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
            'server_id' => ['required', 'integer', 'exists:servers,id'],
            'data' => ['required', 'array'],
            'servers' => ['nullable', 'array'],
            'servers.*' => ['required', 'integer', 'exists:servers,id'],

            // 'data.*' => ['required', 'string'],
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
