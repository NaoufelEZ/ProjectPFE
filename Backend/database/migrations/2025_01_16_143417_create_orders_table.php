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
            $table->string("reference",16);
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("address_id");
            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
            $table->foreign("address_id")->references("id")->on("addresses")->onDelete("cascade");
            $table->string("status")->default("Pending");
            $table->string("method_payment");
            $table->unsignedBigInteger("company_id")->nullable();
            $table->foreign("company_id")->references("id")->on("delivery_company")->onDelete("cascade");
            $table->string("delivery_company")->delete();
            $table->boolean("delivery_pay")->default(true);
            $table->boolean("dot_notify")->default(false);
            $table->timestamp("order_date")->useCurrent();
            $table->timestamp("order_update")->useCurrent();
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
