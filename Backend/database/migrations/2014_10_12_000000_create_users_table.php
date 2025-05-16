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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name',25);
            $table->string('last_name',25);
            $table->string('email')->unique();
            $table->string('password',64)->nullable();
            $table->boolean('email_verify')->default(false);
            $table->string('phone',8)->nullable();
            $table->enum("role",array("Admin","Client","Product Manager","Super Admin"))->default("Client");
            $table->string('google_id')->nullable()->unique();
            $table->string('google_token')->nullable()->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
