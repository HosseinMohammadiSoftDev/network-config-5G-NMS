<?php

namespace Modules\Server\Http\Requests\AutoSync;

use Illuminate\Foundation\Http\FormRequest;

class ReceiveChangeModuleBBURequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'module' => ['nullable'],
            'module_change' => ['nullable'],
            'action' => ['required' ],
            'old_module_data' =>  ['nullable'],
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
