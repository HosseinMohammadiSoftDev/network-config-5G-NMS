<?php

namespace Modules\Backup\Http\Requests\ConfigBackup;

use Illuminate\Foundation\Http\FormRequest;
use Modules\Backup\Utilities\DirectoryUtilities;

class SetConfigBackupRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'password'         => ['required', 'string'],
            'destination_path' => ['required', 'string', 'regex:/^\/(?:[a-zA-Z0-9_\-\.]+\/)*[a-zA-Z0-9_\-\.]+\/$/',],
            'run_backup_at'    => ['required', 'date_format:Y-m-d H:i:s', 'after:' . now()
            ],
        ];
    }



    public function withValidator ($validator) : void
    {
        if ($validator->errors()->any())
            return;

        $validator->after(function ($validator) {

            DirectoryUtilities::basicValidator($this->input('destination_path'));
            DirectoryUtilities::OwnerValidator($this->input('destination_path'));
            DirectoryUtilities::PermissionValidator($this->input('destination_path', [700]));

        });
    }



    public function messages () : array
    {
        return [
            'destination_path.required' => 'The run config path is required.',
            'destination_path.string' => 'The run config path must be a string.',
            'destination_path.regex' => 'The run config path must be a valid absolute path ending with a slash (e.g., "/home/user/").',
            'destination_path.not_regex' => 'The run config path cannot be a restricted system directory (e.g., "/bin/", "/etc/").',
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
