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
            $table->string('password',64);
            $table->boolean('email_verify')->default(false);
            $table->string('phone',8);
            $table->enum("role",array("Admin","Client","Product Manager"));
            $table->string("avatar",70)->default("default-avatar.png");
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
