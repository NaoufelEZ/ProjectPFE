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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("order_id");
            $table->unsignedBigInteger("product_id");
            $table->foreign("order_id")->references("id")->on("orders")->onDelete("cascade");
            $table->foreign("product_id")->references("id")->on("products");
            $table->string("color");
            $table->string("size");
            $table->integer("quantity");
            $table->double("price");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
