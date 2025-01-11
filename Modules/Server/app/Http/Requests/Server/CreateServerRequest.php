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
            'name' => ['required', 'string', 'unique:servers,name', 'min:3', 'max:255'],
            'ip' => ['required', 'unique:servers,ip', 'regex:/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/'],

            'zabbix_ip' => ['nullable', 'regex:/^192\.168\.19\.79\/elk$/', 'string', 'max:255'],
            'elk_ip' => ['nullable', 'string', 'regex:/^192\.168\.19\.79\/elk$/',]
        ];
    }

    public function messages()
    {
        return [
           'ip.required' => 'Entering the IP address is mandatory.',
           'ip.unique' => 'The entered IP address has already been registered.',
           'ip.regex' => 'The entered IP address is not valid.',

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
