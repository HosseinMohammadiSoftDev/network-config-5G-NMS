<?php

namespace Modules\SystemSetting\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SetMapAddressRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name'      => ['required', 'string', 'min:3', 'max:255', 'unique:maps,name'],
            'color'     => ['nullable', 'string'],
            'longitude' => ['required', 'string'],
            'latitude'  => ['required', 'string'],
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
