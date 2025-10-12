<?php

namespace Modules\Server\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;
use Modules\Server\Utility\DirectoryUtility;

class EditModuleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'module_id' => ['required', 'integer', 'exists:modules,id'],
            'name' => ['nullable', 'string', 'min:2', 'max:255'],
            'type' => ['nullable', 'string', 'in:LTE,GSM,RRU'],

            'config_file' => ['nullable', 'file',  function ($attribute, $value, $fail) {

                    if (!preg_match('/\.(config|conf|cfg)$/i', $value->getClientOriginalName())) {
                        $fail('The file must be one of the following formats: .config, .conf, or .cfg');
                            return;
                    }
                },
            ],

            'server_ids' => ['nullable', 'array'],
            'server_ids.*' => ['required', 'integer', 'exists:servers,id',  function ($attribute, $value, $fail) {
                $server = DB::table('servers')->where('id', $value)->first();
                    if (!$server) {
                        $fail("The selected server ID ($value) is invalid.");
                        return;
                    }
                }
            ],
            'username' => ['required', 'string', 'min:1', 'max:255'],
            'password' => ['required', 'string', 'min:1', 'max:255'],


            'path_config' => [
                'string',
                'min:3',
                'max:255',
                'regex:/^\/(?:[a-zA-Z0-9_\-\.]+\/)*[a-zA-Z0-9_\-\.]+\/$/',
                'not_regex:/\/(?:bin|boot|dev|lib|lib64|media|mnt|opt|proc|root|run|sbin|srv|sys|tmp|var)\//i'
            ],
        ];
    }



    public function message () {
        return [
            // Custom messages for general rules
            'path_config.required' => 'The config path is required.',
            'path_config.string' => 'The config path must be a string.',
            'path_config.min' => 'The config path must be at least 3 characters.',
            'path_config.max' => 'The config path may not be longer than 255 characters.',
            'path_config.regex' => 'The config path must be a valid absolute path ending with a slash (e.g., "/home/user/").',
            'path_config.not_regex' => 'The config path cannot be a restricted system directory (e.g., "/bin/", "/etc/").',

            'path_run_config.required' => 'The run config path is required.',
            'path_run_config.string' => 'The run config path must be a string.',
            'path_run_config.min' => 'The run config path must be at least 3 characters.',
            'path_run_config.max' => 'The run config path may not be longer than 255 characters.',
            'path_run_config.regex' => 'The run config path must be a valid absolute path ending with a slash (e.g., "/home/user/").',
            'path_run_config.not_regex' => 'The run config path cannot be a restricted system directory (e.g., "/bin/", "/etc/").',
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
