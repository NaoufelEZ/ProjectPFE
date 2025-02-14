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
        Schema::create('password', function (Blueprint $table) {
            $table->id();
            $table->string("email");
            $table->string("code",6);
            $table->string("token",20);
            $table->boolean("is_verified")->default(false);
            $table->timestamp("created_at")->useCurrent();
            $table->timestamp("expiry_at")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('password');
    }
};
