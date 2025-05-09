<?php

namespace Requests\FA2;

use Illuminate\Foundation\Http\FormRequest;

class Set2FAReqest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'is_login_2FA' => ['required', 'boolean'],
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
