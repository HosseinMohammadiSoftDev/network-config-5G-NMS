<?php

namespace Modules\Server\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TestConnectionRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'server_id' => ['required', 'exists:servers,id', 'integer'],
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
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
