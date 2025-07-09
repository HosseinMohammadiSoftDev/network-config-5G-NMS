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
        Schema::create('modules', function (Blueprint $table) {
            $table->id();

            $table->boolean('is_updated')->default(false)
                ->comment('change based on nms server module.');


            $table->string('name');
            $table->string('extension');
            $table->string('type');

            $table->string('path_config')->default('/home/siz-tel/bbdh-2.6.6-noCg/install/etc/bbdh/');



            // config module
//                                    json format
            $table->text('initial_config_json')->nullable()->comment('initial config module to format son');
            $table->text('previous_config_json')->nullable()->comment('previous config module to foram json');
            $table->text('current_config_json')->nullable()->comment('config module');

//                                    conf format
            $table->text('initial_config_conf')->nullable()->comment('initial config module to foram conf');;
            $table->text('previous_config_conf')->nullable()->comment('previous config module to foram conf');;



            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modules');
    }
};
