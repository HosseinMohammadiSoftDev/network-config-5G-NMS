<?php

namespace Modules\Server\Http\Requests\Capcha;

use Illuminate\Foundation\Http\FormRequest;

class SetStatusReCapchaRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'active_online_capcha' => ['required', 'boolean'],
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
