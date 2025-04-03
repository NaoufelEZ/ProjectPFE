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
            ["product_id" => 1, "color" => "Black", "product_picture" => "1742831767_67e1809707bc1.webp", "size" => "S", "quantity" => 7],
            ["product_id" => 1, "color" => "Black", "product_picture" => "1742831767_67e1809709918.webp", "size" => "L", "quantity" => 12],
            ["product_id" => 1, "color" => "White", "product_picture" => "1742831767_67e180970a960.webp", "size" => "S", "quantity" => 32],
            ["product_id" => 1, "color" => "White", "product_picture" => "1742831767_67e180970b6d1.webp", "size" => "M", "quantity" => 20],
            ["product_id" => 1, "color" => "Beige", "product_picture" => "1742831767_67e180970c3a9.webp", "size" => "S", "quantity" => 12],
            ["product_id" => 1, "color" => "Beige", "product_picture" => "1742831767_67e180970d714.webp", "size" => "L", "quantity" => 22],
            ["product_id" => 1, "color" => "Green", "product_picture" => "1742831767_67e180970e5e2.webp", "size" => "M", "quantity" => 15],
            ["product_id" => 1, "color" => "Green", "product_picture" => "1742831767_67e180970f378.webp", "size" => "L", "quantity" => 12],
            
            ["product_id" => 2, "color" => "Black", "product_picture" => "1743339712_67e940c0136e6.jpg", "size" => "42", "quantity" => 32],
            ["product_id" => 2, "color" => "White", "product_picture" => "1743339712_67e940c015325.jpg", "size" => "43", "quantity" => 23],
        ]);
    }
}
