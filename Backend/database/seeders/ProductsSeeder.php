<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::factory()->createMany([
            // Men's Products
            [
                "title" => "Premium Leather Jacket",
                "description" => "High-quality genuine leather jacket with sleek design, perfect for any occasion. Features front zipper closure, multiple pockets, and comfortable fit.",
                "price" => 199,
                "discount" => 0,
                "details_id" => 1
            ],
            [
                "title" => "Slim Fit Jeans",
                "description" => "Classic slim fit jeans made with stretch denim for comfort. Perfect for casual wear with any top.",
                "price" => 79,
                "discount" => 0,
                "details_id" => 2
            ],
            [
                "title" => "Classic Oxford Shirt",
                "description" => "Versatile button-down shirt in premium cotton. Ideal for both formal and casual occasions.",
                "price" => 59,
                "discount" => 0,
                "details_id" => 3
            ],
            [
                "title" => "Contrast Trim Sweater",
                "description" => "Warm knit sweater with stylish contrast trim details. Perfect for layering in cooler weather.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 4
            ],
            [
                "title" => "Logo Hoodie",
                "description" => "Comfortable cotton hoodie with subtle brand logo. Features kangaroo pocket and adjustable drawstrings.",
                "price" => 69,
                "discount" => 0,
                "details_id" => 5
            ],
            [
                "title" => "Tailored Fit Trousers",
                "description" => "Smart trousers with perfect tailored fit. Made from durable fabric that resists wrinkles.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 6
            ],
            [
                "title" => "Essential Crewneck T-Shirt",
                "description" => "Basic crewneck tee made from soft cotton. Available in multiple colors for everyday wear.",
                "price" => 29,
                "discount" => 0,
                "details_id" => 7
            ],
            [
                "title" => "Leather Ankle Boots",
                "description" => "Stylish leather ankle boots with durable rubber sole. Perfect for urban style.",
                "price" => 149,
                "discount" => 0,
                "details_id" => 8
            ],
            [
                "title" => "Leather Sandals",
                "description" => "Comfortable leather sandals with adjustable straps. Ideal for summer wear.",
                "price" => 79,
                "discount" => 0,
                "details_id" => 9
            ],
            [
                "title" => "Classic Derby Shoes",
                "description" => "Elegant derby shoes in premium leather. Perfect for formal occasions.",
                "price" => 129,
                "discount" => 0,
                "details_id" => 10
            ],
            [
                "title" => "Low-Top Sneakers",
                "description" => "Casual sneakers with cushioned sole for all-day comfort. Available in multiple colors.",
                "price" => 99,
                "discount" => 0,
                "details_id" => 11
            ],
            [
                "title" => "Chunky Techno Trainers",
                "description" => "OrthoLite® insole for cushioning and breathability. Bold design with chunky sole.",
                "price" => 129,
                "discount" => 0,
                "details_id" => 12
            ],

            // Women's Products
            [
                "title" => "Floral Midi Dress",
                "description" => "Elegant floral print dress with puff sleeves and flattering midi length. Perfect for special occasions.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 13
            ],
            [
                "title" => "Tailored Blazer",
                "description" => "Sophisticated blazer with structured shoulders and flattering fit. Ideal for work or formal events.",
                "price" => 119,
                "discount" => 0,
                "details_id" => 14
            ],
            [
                "title" => "High-Waist Jeans",
                "description" => "Flattering high-waist jeans with stretch fabric for comfort. Available in multiple washes.",
                "price" => 79,
                "discount" => 0,
                "details_id" => 15
            ],
            [
                "title" => "Silk Blouse",
                "description" => "Luxurious silk blouse with delicate details. Perfect for elevating any outfit.",
                "price" => 99,
                "discount" => 0,
                "details_id" => 16
            ],
            [
                "title" => "Cable Knit Sweater",
                "description" => "Cozy sweater with classic cable knit pattern. Perfect for cold weather layering.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 17
            ],
            [
                "title" => "Oversized Hoodie",
                "description" => "Comfortable oversized hoodie with soft fleece lining. Ideal for casual days.",
                "price" => 69,
                "discount" => 0,
                "details_id" => 18
            ],
            [
                "title" => "Wide-Leg Trousers",
                "description" => "Trendy wide-leg trousers with high waist. Made from flowing fabric for elegant drape.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 19
            ],
            [
                "title" => "Graphic T-Shirt",
                "description" => "Casual tee with stylish graphic print. Made from soft cotton for everyday comfort.",
                "price" => 35,
                "discount" => 0,
                "details_id" => 20
            ],
            [
                "title" => "Ankle Strap Heels",
                "description" => "Elegant heels with secure ankle strap. Perfect for evening wear or special occasions.",
                "price" => 119,
                "discount" => 0,
                "details_id" => 21
            ],
            [
                "title" => "Ballet Flats",
                "description" => "Classic ballet flats with cushioned insole. Ideal for all-day comfort and style.",
                "price" => 79,
                "discount" => 0,
                "details_id" => 22
            ],
            [
                "title" => "Stiletto Pumps",
                "description" => "Sophisticated pumps with sleek stiletto heel. Available in multiple colors.",
                "price" => 109,
                "discount" => 0,
                "details_id" => 23
            ],
            [
                "title" => "Strappy Sandals",
                "description" => "Feminine sandals with delicate straps. Perfect for summer outfits.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 24
            ],
            [
                "title" => "Platform Sneakers",
                "description" => "Trendy sneakers with comfortable platform sole. Combines style and comfort.",
                "price" => 99,
                "discount" => 0,
                "details_id" => 25
            ]
        ]);
    }
}