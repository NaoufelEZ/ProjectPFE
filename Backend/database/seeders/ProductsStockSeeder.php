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
            ["product_id" => 6, "color" => "Red", "product_picture" => "1743117018_67e5dadad8364.webp", "size" => "S", "quantity" => 12],
            ["product_id" => 6, "color" => "Red", "product_picture" => "1743117018_67e5dadad8364.webp", "size" => "M", "quantity" => 12],
            ["product_id" => 6, "color" => "Black", "product_picture" => "1743117018_67e5dadad8364.webp", "size" => "L", "quantity" => 15],
            ["product_id" => 6, "color" => "White", "product_picture" => "1743117018_67e5dadad8364.webp", "size" => "M", "quantity" => 20],
        ]);
    }
}
