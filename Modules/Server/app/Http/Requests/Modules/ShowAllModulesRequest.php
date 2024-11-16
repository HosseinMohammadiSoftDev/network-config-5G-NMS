<?php

namespace Modules\Server\Http\Requests\Modules;

use Illuminate\Foundation\Http\FormRequest;

class ShowAllModulesRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'server_id' => ['required', 'exists:servers,id', 'integer'],
            'type' => ['required', 'exists:modules,type']
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
