<?php

namespace Modules\Server\Http\Requests\Modules;

use Attribute;
use Modules\Server\Models\Module;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class CreateModulesRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:255', function ($attribute, $value, $fail) {
                $serverIds = request('server_id');
                if (!is_array($serverIds))
                    $serverIds = [$serverIds];

                foreach ($serverIds as $serverId) {

                $modulNameExists = Module::where('name', $value)
                ->where('server_id', request('server_id'))
                ->exists();

                if ($modulNameExists)
                    $fail('module name is not uniqe');
                }

            }],
            'type' => ['required', 'string', 'min:2', 'max:255'],
            'server_id' => ['required', 'array'],
            'server_id.*' => ['required', 'integer', 'exists:servers,id'],
            'config_file' => ['required', 'file',  function ($attribute, $value, $fail) {

                if (!preg_match('/\.(yaml|yml|yaml\.in)$/i', $value->getClientOriginalName()))

                    $fail('The file must be one of the following formats: .yaml, .yml, or .yaml.in');

                    Log::channel('daliy')->error('کاربری قصد اضافه کردن فایل کانفیگی فرمت مقایر دارد را داشت', [
                        'fileName' => $value->getClientOriginalName(),
                        'user' => Auth::user()
                    ]);
                },
            ],
            'username' => ['required', 'string'],
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
