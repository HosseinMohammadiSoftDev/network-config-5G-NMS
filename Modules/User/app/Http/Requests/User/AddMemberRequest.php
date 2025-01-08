<?php

namespace Modules\User\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class AddMemberRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:191', 'min:3'],
            'last_name' => ['required', 'string', 'max:191', 'min:3'],
            'auth_name' => ['required', 'string', 'unique:users,auth_name', 'min:3', 'max:255'],
            'role' => ['required', 'in:visitor,expert'],
            'permission_name' => ['nullable', 'string', 'exists:permissions,name'],
            'password' => ['required', Password::min(8), 'confirmed', 'max:60'],
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
