<?php

namespace Requests\SystemSetting;

use Illuminate\Foundation\Http\FormRequest;

class SetLoginBySMSRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'is_login_sms' => ['required', 'boolean']
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
