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
        Schema::create('category_details', function (Blueprint $table) {
            $table->id();
            $table->string("categoryDetails");
            $table->unsignedBigInteger("category_id");
            $table->foreign("category_id")->references("id")->on("categories")->onDelete("cascade");
            $table->unsignedBigInteger("subcategory_id");
            $table->foreign("subcategory_id")->references("id")->on("subcategories")->onDelete("cascade");
            $table->string("category_details_image",100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_details');

    }
};
