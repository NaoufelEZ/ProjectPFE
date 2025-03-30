<?php

namespace Database\Seeders;

use App\Models\ProductStock;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductsStockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductStock::factory()->createMany([
            ["product_id" => 3, "color" => "Red", "product_picture" => "", "size" => "S", "quantity" => 12],
            ["product_id" => 3, "color" => "Black", "product_picture" => "", "size" => "L", "quantity" => 15],
            ["product_id" => 3, "color" => "White", "product_picture" => "", "size" => "M", "quantity" => 20],
        ]);
    }
}
