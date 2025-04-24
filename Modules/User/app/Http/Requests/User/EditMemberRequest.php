<?php

namespace Modules\User\Http\Requests\User;

use Illuminate\Validation\Rule;
use Modules\Server\Models\Server;
use Modules\User\Models\Permission;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class EditMemberRequest extends FormRequest
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

            'phone' => [
                'string',
                'regex:/^09\d{9}$/',
                Rule::unique('users', 'phone')->ignore($this->user_id, 'id')
            ],

            'role' => ['nullable', 'string', Rule::exists('roles', 'name'), Rule::notIn('admin')],
            'permission_name' => ['nullable', 'array'],
            'permission_name.*' =>  ['required', 'string', 'exists:permissions,name'],

            'server_id' => ['integer', 'exists:servers,id']
        ];
    }





    private function validationServerPermission ($server, $permissionNames)
    {
            // assessing permission to motherboard server
        $serverPermissionsRequest = array_filter(
            $permissionNames,
            fn($permission) => str_starts_with($permission, 'server/')
        );

        if ($serverPermissionsRequest)
            throw ValidationException::withMessages(['validation' => ['not set server permission to create user to motherboard']]);


            // chacke send permission unauthorized
        $arrayUnauthorizedPermission = ['VM/create', 'VM/update', 'VM/delete', 'VM/status'];

        if(!empty(array_intersect($arrayUnauthorizedPermission, $permissionNames)))
            throw ValidationException::withMessages(['validation' => ['permission Unauthorized to give User motherboard. You cannot grant server administrative access to this user.']]);



        $this->merge(['serverPermission' => 'server/' . $server['name']]);
    }
    private function validationUserPermission ($permissionNames)
    {
        if (Auth::user()->hasRole('admin') && !Auth::user()->hasRole('admin'))
            throw ValidationException::withMessages(['validation' => ['You cannot edit admin']]);

        $serverPermissions = Permission::where('name', 'like', 'server/%')->pluck('name')->toArray();
        if (! $serverPermissions)
            throw ValidationException::withMessages(['validation' => ['server permission empity']]);

        if (empty(array_intersect($permissionNames, $serverPermissions)))
            throw ValidationException::withMessages(['validation' => ['At least one server-related permission is required']]);

    }
    public function withValidator ($validator)
    {
        if ($validator->errors()->any())
            return;

            $server = Server::find($this->input('server_id'));
        $validator->after(function ($validator) use ($server) {

            $permissionNames = $this->input('permission_name') ?? null;

            $this->input('server_id')
                ? $this->validationServerPermission($server, $permissionNames)
                : $this->validationUserPermission($permissionNames);


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
