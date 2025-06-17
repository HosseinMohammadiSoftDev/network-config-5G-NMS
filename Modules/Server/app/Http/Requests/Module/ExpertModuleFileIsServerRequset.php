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
            'module_id' => ['required', 'integer', 'exists:modules,id',],

            'server_id' => ['required', 'integer', 'exists:servers,id',  function ($attribute, $value, $fail) {
                $server = DB::table('servers')->where('id', $value)->first();
                    if (!$server) {
                        $fail("The selected server ID ($value) is invalid.");
                        return;
                    }
                }
            ],

            'username' => ['required', 'string', 'min:1', 'max:255'],
            'password' => ['required', 'string', 'min:1', 'max:255'],
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
