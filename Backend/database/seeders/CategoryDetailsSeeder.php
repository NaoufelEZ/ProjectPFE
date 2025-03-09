<?php

namespace Database\Seeders;

use App\Models\CategoryDetails;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryDetailsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CategoryDetails::factory()->createMany([
            ["categoryDetails"=>"Jackets and blazers","category_id"=>2,"subcategory_id"=>1],
            ["categoryDetails"=>"Dresses and Jumpsuits","category_id"=>2,"subcategory_id"=>1],
            ["categoryDetails"=>"Jeans","category_id"=>2,"subcategory_id"=>1],
            ["categoryDetails"=>"Trousers","category_id"=>2,"subcategory_id"=>1],
            ["categoryDetails"=>"Skirts","category_id"=>2,"subcategory_id"=>1],
            ["categoryDetails"=>"Shorts and bermudas","category_id"=>2,"subcategory_id"=>1],
            ["categoryDetails"=>"Tops and bodysuits","category_id"=>2,"subcategory_id"=>1],
            ["categoryDetails"=>"T-shirts","category_id"=>2,"subcategory_id"=>1],
            ["categoryDetails"=>"Shirts and blouses","category_id"=>2,"subcategory_id"=>1],
            ["categoryDetails"=>"Sweatshirts and hoodies","category_id"=>2,"subcategory_id"=>1],
            ["categoryDetails"=>"Sweaters and cardigans","category_id"=>2,"subcategory_id"=>1],
            
            ["categoryDetails"=>"Boots and Ankle Boots","category_id"=>2,"subcategory_id"=>2],
            ["categoryDetails"=>"Heeled shoes","category_id"=>2,"subcategory_id"=>2],
            ["categoryDetails"=>"Flat shoes","category_id"=>2,"subcategory_id"=>2],
            ["categoryDetails"=>"Trainers","category_id"=>2,"subcategory_id"=>2],
            ["categoryDetails"=>"SandalsNew Items","category_id"=>2,"subcategory_id"=>2],
            
            ["categoryDetails"=>"Basics","category_id"=>1,"subcategory_id"=>1],
            ["categoryDetails"=>"Jackets and coats","category_id"=>1,"subcategory_id"=>1],
            ["categoryDetails"=>"Sweatshirts and hoodies","category_id"=>1,"subcategory_id"=>1],
            ["categoryDetails"=>"Knitwear","category_id"=>1,"subcategory_id"=>1],
            ["categoryDetails"=>"Sweaters and cardigans","category_id"=>1,"subcategory_id"=>1],
            ["categoryDetails"=>"Jeans","category_id"=>1,"subcategory_id"=>1],
            ["categoryDetails"=>"Shirts","category_id"=>1,"subcategory_id"=>1],
            ["categoryDetails"=>"T-shirts","category_id"=>1,"subcategory_id"=>1],

            ["categoryDetails"=>"Ankle boots","category_id"=>1,"subcategory_id"=>2],
            ["categoryDetails"=>"Ankle boots","category_id"=>1,"subcategory_id"=>2],
            ["categoryDetails"=>"Trainers","category_id"=>1,"subcategory_id"=>2],
            ["categoryDetails"=>"Sneakers","category_id"=>1,"subcategory_id"=>2],
            ["categoryDetails"=>"Smart Shoes","category_id"=>1,"subcategory_id"=>2],
        ]);
    }
}
