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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->integer("quantity");
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("product_id");
            $table->foreign("user_id")->references("id")->on("users");
            $table->foreign("product_id")->references("id")->on("products");
            $table->string("status")->default("Pending");
            $table->timestamp("order_date")->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
