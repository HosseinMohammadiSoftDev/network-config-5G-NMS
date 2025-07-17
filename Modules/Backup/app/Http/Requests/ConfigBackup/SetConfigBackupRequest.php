<?php

namespace Modules\Backup\Http\Requests\ConfigBackup;

use Illuminate\Foundation\Http\FormRequest;

class SetConfigBackupRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'password' => ['required', 'string'],
            'destination_path' => ['required', 'string'],
            'run_backup_daily' => ['required', 'numeric', 'min:1', 'max:30'],
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
