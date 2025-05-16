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
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('delivery_company');
            $table->unsignedBigInteger("company_id")->nullable()->after('method_payment');
            $table->foreign("company_id")->references("id")->on("delivery_company")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
        $table->dropForeign(['company_id']);
        $table->dropColumn('company_id');

        // Re-add the old delivery_company string column
        $table->string('delivery_company')->nullable();
        });
    }
};
