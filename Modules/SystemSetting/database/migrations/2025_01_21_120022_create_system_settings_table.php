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
        Schema::create('system_settings', function (Blueprint $table) {
            $table->id();

            $table->string('zabbix_address')->nullable();
            $table->string('elk_address')->nullable();

            $table->boolean('is_login_2FA')->default(false);

            $table->boolean('is_login_sms')->default(false);
            $table->text('config_connection_sms')->nullable();

            $table->string('orginal_VM_ip')->nullable();

            $table->string('recaptcha_secret_key')->nullable();
            $table->string('recaptcha_site_name')->nullable();

            $table->boolean('active_online_capcha')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('system_settings');
    }
};
