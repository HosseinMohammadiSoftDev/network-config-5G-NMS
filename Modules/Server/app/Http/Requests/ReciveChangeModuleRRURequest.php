<?php

namespace Modules\Server\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReciveChangeModuleRRURequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'module' => ['required'],
            'action' => ['required'],
            'old_module_data' => ['nullable'],
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
