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
            'password'         => ['required', 'string'],
            'destination_path' => ['required', 'string'],
            'run_backup_at'    => ['required', 'date_format:Y-m-d H:i:s', 'after:' . now()],
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
