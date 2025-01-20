<?php

namespace Modules\Server\Http\Requests\Modules;

use Illuminate\Foundation\Http\FormRequest;

class deleteModuleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'module_id' => ['required', 'integer', 'exists:modules,id'],

                //  ssh connection
            'username' =>  ['required', 'string', 'max:256'],
            'password' => ['required', 'string']
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
