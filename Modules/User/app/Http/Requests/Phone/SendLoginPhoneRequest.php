<?php

namespace Modules\User\Http\Requests\Phone;

use Illuminate\Foundation\Http\FormRequest;

class SendLoginPhoneRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'phone' => ['required', 'regex:/^09\d{9}$/', 'exists:users,phone'],
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
