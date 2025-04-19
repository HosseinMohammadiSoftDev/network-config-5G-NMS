<?php

namespace Modules\User\Http\Requests\User;

use Modules\Server\Models\Server;
use Modules\User\Models\Permission;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

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
            'phone' => ['required', 'string', 'regex:/^09\d{9}$/', 'unique:users,phone'],
            'role' => ['required', 'in:visitor,expert'],
            'permission_name' => ['nullable', 'array'],
            'permission_name.*' => ['required', 'string', 'exists:permissions,name'],
            'password' => ['required', Password::min(8), 'confirmed', 'max:60'],

            'server_id' => ['integer', 'exists:servers,id']
        ];
    }





    public function ValidationServerPermission ($server, $permissionNames)
    {
        $serverPermissionsRequest = array_filter(
            $permissionNames,
            fn($permission) => str_starts_with($permission, 'server/')
        );


        foreach ($serverPermissionsRequest as $permission)
            if (!in_array($permission, $server->getAllPermissions()->pluck('name')->toArray()))
                    throw ValidationException::withMessages(['validation' => ['You cannot give a user access to servers that you do not have access to.']]);

    }
    public function validationUserPermission ($permissionNames)
    {
        $serverPermissions = Permission::where('name', 'like', 'server/%')->pluck('name')->toArray();
        if (! $serverPermissions)
            throw ValidationException::withMessages(['validation' => ['server permission empity']]);

        if (empty($permissionNames) || empty(array_intersect($permissionNames, $serverPermissions))) {
            throw ValidationException::withMessages(['validation' => ['At least one server-related permission is required']]);
        }

    }
    public function withValidator ($validator)
    {
        if ($validator->errors()->any())
            return;


            $server = Server::find($this->input('server_id'));
        $validator->after(function ($validator) use($server) {

            $permissionNames = $this->input('permission_name') ?? null;

            $this->validationUserPermission($permissionNames);

            $this->validationServerPermission($server, $permissionNames);

            $this->merge(['permissionNames' => $permissionNames]);

        });
    }




    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
}
