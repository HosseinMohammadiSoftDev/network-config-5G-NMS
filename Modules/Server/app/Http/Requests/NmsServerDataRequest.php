<?php

namespace Modules\Server\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NmsServerDataRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'nms_ip' => ['required', 'string', 'ip']
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
