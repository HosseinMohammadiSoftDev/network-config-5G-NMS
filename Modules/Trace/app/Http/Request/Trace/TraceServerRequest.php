<?php

namespace Modules\Trace\Http\Request\Trace;

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
            'servers'            => ['required', 'array'],
            'servers.*.id'       => ['required', 'integer', 'exists:servers,id'],
            'servers.*.username' => ['required', 'string', 'min:1'],
            'servers.*.password' => ['required', 'string', 'min:1'],
            'servers.*.port'     => ['integer'],

            'servers.*.interface'    => ['string'],
            'servers.*.module_ids'   => ['array'],
            'servers.*.module_ids.*' => ['required', 'integer', 'exists:modules,id'],
        ];
    }




    public function withValidator ($validator)
    {
        if ($validator->errors()->any()) return;

        $serverIds = collect($this->input('servers'))->pluck('id')->toArray();
        $servers   = Server::whereIn('id', $serverIds)->get();

        $validator->after(function ($validator) use ($servers) {

            foreach ($servers as $server) {
                if (!$server['ip']) return $validator->errors()->add('validation', 'selected server is not ip address.');

                if ($server['is_down']) return $validator->errors()->add('validation', 'selected server is down.');
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
