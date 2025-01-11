<?php

namespace Modules\Server\Http\Requests\Server;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class EditServerReqest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'server_id' => ['required', 'exists:servers,id'],

            'name' => [
                'nullable',
                'string',
                'min:2',
                'max:127',
                Rule::unique('servers', 'name')->ignore($this->server_id, 'id')
            ],

            'ip' => [
                'nullable',
                Rule::unique('servers', 'ip')->ignore($this->server_id, 'id'),
                'regex:/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/'
            ],

            'zabbix_ip' => ['nullable', 'regex:/^http:\/\/192\.168\.7\.30\/zabbix$/', 'string', 'max:255'],
            'elk_ip' => ['nullable', 'string', 'regex:/^http:\/\/192\.168\.7\.50:9200\/elk-dashboard$/']
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
