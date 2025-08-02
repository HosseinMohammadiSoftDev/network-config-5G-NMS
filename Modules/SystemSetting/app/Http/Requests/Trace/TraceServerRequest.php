<?php

namespace Modules\SystemSetting\Http\Requests\Trace;

use Illuminate\Foundation\Http\FormRequest;
use Modules\Server\Models\Server;

class TraceServerRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'server_ids' => ['required', 'array'],
            'server_ids.*' => ['required', 'integer', 'exists:servers,id'],
            'module_ids' => ['required', 'array'],
            'module_ids.*' => ['required', 'integer', 'exists:modules,id'],
            'username' => ['required', 'string', 'min:1', 'max:255'],
            'password' => ['required', 'string', 'min:1', 'max:255'],
        ];
    }




    public function withValidator ($validator)
    {
        if ($validator->errors()->any())
            return;


            $servers = Server::whereIn('id' ,$this->input('server_ids'))->get();
        $validator->after(function ($validator) use ($servers) {

            foreach ($servers as $server) {
                if (!$server['ip'])
                    return $validator->errors()->add('validation', 'selected server is not ip address.');

                if ($server['is_down'])
                    return $validator->errors()->add('validation', 'selected server is down.');
            }

            $this->merge(['servers' => $servers]);
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
