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
        Schema::create('delivery_company', function (Blueprint $table) {
            $table->id();
            $table->string("name",100);
            $table->string("address");
            $table->string("phone",8);
            $table->string("mail",100);
            $table->double("fee")->default(7);
            $table->string("duration");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivery_company');
    }
};
