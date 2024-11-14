<?php

namespace Modules\Server\Http\Requests\Modules;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CreateModulesRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'unique:modules,name', 'string', 'min:3', 'max:255'],
            'service_id' => ['required', 'exists:services,id', 'numeric'],
            'config_file' => ['required', 'file',  function ($attribute, $value, $fail) {
                
                if (!preg_match('/\.(yaml|yml|yaml\.in)$/i', $value->getClientOriginalName()))
                
                    $fail('فایل باید یکی از فرمت‌های .yaml, .yml, یا .yaml.in باشد.');

                    Log::channel('daliy')->error('کاربری قصد اضافه کردن فایل کانفیگی فرمت مقایر دارد را داشت', [
                        'fileName' => $value->getClientOriginalName(),
                        'user' => Auth::user()
                    ]);
                },
            ],
            'host' => ['required', 'string'],
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
