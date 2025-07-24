<?php

namespace Modules\SystemSetting\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShowInterfaceVmRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'server_id' => ['required', 'integer', 'exists:servers,id'],
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
            'port' => ['numeric'],
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
