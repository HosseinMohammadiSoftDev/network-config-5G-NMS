<?php

namespace Modules\User\Http\Requests\User;

use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class resetPasswordRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'integer', 'exists:users,id'],

            'auth_name' => ['nullable',
            'string',
            // 'unique:users,auth_name',
            Rule::unique('users', 'auth_name')->ignore($this->user_id, 'id'),
            'min:3',
            'max:60'],

            'password' => ['nullable', Password::min(8), 'max:40', 'confirmed'],
            'role' => ['nullable', 'string', 'in:expert,visitor'],
            'first_name' => ['nullable', 'min:3', 'max:256'],
            'last_name' => ['nullable', 'min:3', 'max:256'],


            'role' => ['nullable', 'string', Rule::exists('roles', 'name'), Rule::notIn('admin')],
            'permission_name' => ['nullable', 'array'],
            'permission_name.*' =>  ['required', 'string', 'exists:permissions,name']
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
