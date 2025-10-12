<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('module_server', function (Blueprint $table) {
            $table->id();

            $table->foreignId('server_id')
                    ->constrained()
                    ->onDelete('cascade')
                    ->onUpdate('cascade');

            $table->foreignId('module_id')
                    ->constrained()
                    ->onDelete('cascade')
                    ->onUpdate('cascade');

            $table->boolean('is_updated')->default(false);
                            // config module
//                                    json format
                    $table->text('initial_config_json')->nullable()->comment('initial config module to format son');
                    $table->text('previous_config_json')->nullable()->comment('previous config module to foram json');
                    $table->text('current_config_json')->nullable()->comment('config module');

//                                    conf format
                    $table->text('initial_config_conf')->nullable()->comment('initial config module to foram conf');;
                    $table->text('previous_config_conf')->nullable()->comment('previous config module to foram conf');;



//             $table->timesstamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('module_server');
    }
};
