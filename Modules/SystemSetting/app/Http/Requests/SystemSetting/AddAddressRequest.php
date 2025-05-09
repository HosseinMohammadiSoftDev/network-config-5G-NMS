<?php

namespace Requests\SystemSetting;

use Illuminate\Foundation\Http\FormRequest;

class AddAddressRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'zabbix_address' => ['nullable', 'string', 'min:1', 'max:512'],
            'elk_address' => ['nullable', 'string','min:1','max:512'],
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
