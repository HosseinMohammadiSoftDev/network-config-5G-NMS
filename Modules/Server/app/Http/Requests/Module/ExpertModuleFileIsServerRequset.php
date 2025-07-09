<?php

namespace Modules\Server\Http\Requests\Module;

use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Http\FormRequest;

class ExpertModuleFileIsServerRequset extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'module_id' => ['required', 'integer', 'exists:modules,id']
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
