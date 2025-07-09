<?php

namespace Modules\Server\Services\Command;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\DB;
use Modules\Server\Helpers\SshHelper;
use Modules\Server\Http\Requests\Module\restartServiceModuleRequest;
use Modules\Server\Models\Module;
use Modules\Server\Models\Server;

class CommandManager
{

    public function __construct()
    {}


    private static function runCommandModuleToServer ($command, $typeCommand, $method)
    {
        try {

            return response()->json(['message' => exec($command)]);

        } catch (HttpResponseException $e) {
            throw $e;
        } catch (InvalidArgumentException $e) {
            DB::rollBack();

            $message = nl2br($e->getMessage());


            $message = preg_replace('/\x1b\[[0-9;]*m/', '', $message); // حذف کدهای ANSI
            $message = preg_replace('/\r?\n.*?\[root@localhost.*?$/', '', $message); // حذف اطلاعات اضافی مربوط به خط فرمان

            preg_match_all('/\b(FATAL|ERROR):\s.*?(?=\s\(.*?\)|$)/m', $message, $matches);

            $formattedMessages = $matches[0] ?? [];

            $separatedMessages = [];
            foreach ($formattedMessages as $index => $msg) {
                $separatedMessages["Error-" . ($index + 1)] = $msg;
            }

            throw new HttpResponseException(response()->json([
                'msg' => 'server error!',
                'error' => [
                    'type' => 'restart-service-error',
                    'message' => $separatedMessages
                ]
            ], 422));
        } catch (\Exception $e) {
            DB::rollBack();

            $message = $e->getMessage();

            throw new HttpResponseException(response()->json([
                'msg' => 'server error!',
                'error' => [
                    'type' => 'server-error',
                    'message' => $message
                ]
            ], 422));
        }
    }
    public static function runServiceLTE ()
    {
        $command = 'sudo srsenb'; // run service LTE 4G

        return self::runCommandModuleToServer($command, 'runServiceLTE', 'runServiceLTE');
    }
    public static function runServiceGSM ()
    {
        $command = 'osmo-bsc -c cfg/bsc.cfg'; // run service GSM 2G

        return self::runCommandModuleToServer($command, 'runServiceGSM', 'runServiceGSM');
    }

}
