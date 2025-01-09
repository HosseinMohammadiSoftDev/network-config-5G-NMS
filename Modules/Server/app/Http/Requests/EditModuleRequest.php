<?php

namespace Modules\Server\Http\Requests;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class EditModuleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'module_id' => ['required', 'integer', 'exists:modules,id'],
            'name' => ['nullable', 'string', 'min:2', 'max:255'],
            'type' => ['nullable', 'string', 'in:5gc,Epc'],
            'server_ids' => ['nullable', 'array'],
            'server_ids.*' => ['required', 'integer', 'exists:servers,id'],
            'config_file' => ['nullable', 'file',  function ($attribute, $value, $fail) {

                if (!preg_match('/\.(yaml|yml|yaml\.in)$/i', $value->getClientOriginalName()))

                    $fail('The file must be one of the following formats: .yaml, .yml, or .yaml.in');

                    Log::channel('daliy')->error('کاربری قصد اضافه کردن فایل کانفیگی فرمت مقایر دارد را داشت', [
                        'fileName' => $value->getClientOriginalName(),
                        'user' => Auth::user()
                    ]);
                },
            ],
            'username' => ['required', 'string', 'min:1', 'max:255'],
            'password' => ['required', 'string', 'max:1', 'max:255']
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
