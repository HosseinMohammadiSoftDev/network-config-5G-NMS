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
            
            $table->string('name');
            $table->string('type');

            $table->foreignId('server_id')
                ->constrained()->onDelete('cascade');

            $table->json('initial_config')->nullable();
            $table->json('previous_config')->nullable();
            $table->json('current_config')->nullable();

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
