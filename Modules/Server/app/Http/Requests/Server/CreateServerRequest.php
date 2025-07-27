<?php

namespace Modules\Server\Http\Requests\Server;

use Illuminate\Foundation\Http\FormRequest;

class CreateServerRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'unique:servers,name', 'min:3', 'max:255', 'regex:/^[^<>{}\/|\~`!@#$%&*()_\-+="\':;؟،]*$/u'],
            'ip' => ['required', 'unique:servers,ip', 'regex:/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/'],

            'path_config' => ['nullable', 'string',  'min:1', 'max:1024'],
            'path_run_config' => ['nullable', 'string',  'min:1', 'max:1024'],
        ];
    }

    public function messages()
    {
        return [
            'ip.required' => 'Entering the IP address is mandatory.',
            'ip.unique' => 'The entered IP address has already been registered.',
            'ip.regex' => 'The entered IP address is not valid.',
            'name.regex' => 'The name field contains invalid characters. characters like < > { } / | \ ~ ` ! @ # $ % & * ( ) _ - + = " \' : ; are not allowed.'
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
