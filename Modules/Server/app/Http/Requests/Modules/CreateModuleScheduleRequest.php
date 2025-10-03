<?php

namespace Modules\Server\Http\Requests\Modules;

use Illuminate\Foundation\Http\FormRequest;
use Modules\Server\Helpers\SshHelper;
use Modules\Server\Models\Server;

class CreateModuleScheduleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'module_id'       => ['required', 'integer', 'exists:modules,id'],
            'server_id'       => ['required', 'integer', 'exists:servers,id'],

            'config_file'     => ['required', 'file',  function ($attribute, $value, $fail) {

                if (!preg_match('/\.(yaml|yml|yaml\.in)$/i', $value->getClientOriginalName())) {
                    $fail('The file must be one of the following formats: .yaml, .yml, or .yaml.in');
                    return;
                }
            }],

            'run_scheduled_at' => ['required', 'date_format:Y-m-d H:i', 'after:' . now()],
            'password'         => ['required', 'string'],

            'username_ssh'         => ['required', 'string'],
            'password_ssh'         => ['required', 'string'],
            'port_ssh'             => ['string']
        ];
    }


    public function withValidator($validator)
    {
        if ($validator->errors()->any())
            return;

        $server = Server::find($this->input('server_id'));

        $validator->after(function ($validator) use ($server){

            $sshHelper = new sshHelper(
                $server,
                $this->input('username_ssh'),
                $this->input('password_ssh'),
                $this->input('port_ssh') ?? 22,
                7
            );

            $sshHelper->testConnection();
        });
    }


    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
}
