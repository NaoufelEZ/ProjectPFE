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
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("address_id");
            $table->foreign("user_id")->references("id")->on("users");
            $table->foreign("address_id")->references("id")->on("addresses")->onDelete("cascade");
            $table->string("status")->default("Pending");
            $table->string("method_payment");
            $table->string("delivery_company")->nullable();
            $table->boolean("delivery_pay")->default(true);
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
