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
            ["categoryDetails"=>"Jackets and blazers","category_id"=>2,"subcategory_id"=>3],
            ["categoryDetails"=>"Dresses and Jumpsuits","category_id"=>2,"subcategory_id"=>3],
            ["categoryDetails"=>"Jeans","category_id"=>2,"subcategory_id"=>3],
            ["categoryDetails"=>"Trousers","category_id"=>2,"subcategory_id"=>3,"category_details_image"=>"1741797605_67d1b8e57405d.jpg"],
            ["categoryDetails"=>"Skirts","category_id"=>2,"subcategory_id"=>3],
            ["categoryDetails"=>"Shorts and bermudas","category_id"=>2,"subcategory_id"=>3],
            ["categoryDetails"=>"Tops and bodysuits","category_id"=>2,"subcategory_id"=>3],
            ["categoryDetails"=>"T-shirts","category_id"=>2,"subcategory_id"=>3],
            ["categoryDetails"=>"Shirts and blouses","category_id"=>2,"subcategory_id"=>3],
            ["categoryDetails"=>"Sweatshirts and hoodies","category_id"=>2,"subcategory_id"=>3],
            ["categoryDetails"=>"Sweaters and cardigans","category_id"=>2,"subcategory_id"=>3],
            
            ["categoryDetails"=>"Boots and Ankle Boots","category_id"=>2,"subcategory_id"=>3],
            ["categoryDetails"=>"Heeled shoes","category_id"=>2,"subcategory_id"=>4],
            ["categoryDetails"=>"Flat shoes","category_id"=>2,"subcategory_id"=>4],
            ["categoryDetails"=>"Trainers","category_id"=>2,"subcategory_id"=>4],
            ["categoryDetails"=>"SandalsNew Items","category_id"=>2,"subcategory_id"=>4],
            
            ["categoryDetails"=>"Basics","category_id"=>1,"subcategory_id"=>1,"category_details_image"=>"1742912093_67e2ba5d9ec4b.jpg"],
            ["categoryDetails"=>"Jackets and coats","category_id"=>1,"subcategory_id"=>1,"category_details_image"=>"1742912317_67e2bb3dc1ff8.jpg"],
            ["categoryDetails"=>"Sweatshirts and hoodies","category_id"=>1,"subcategory_id"=>1,"category_details_image"=>"1742912523_67e2bc0b73328.jpg"],
            ["categoryDetails"=>"Knitwear","category_id"=>1,"subcategory_id"=>1,"category_details_image"=>"1741797773_67d1b98dd77ea.jpg"],
            ["categoryDetails"=>"Sweaters and cardigans","category_id"=>1,"subcategory_id"=>1,"category_details_image"=>"1742912613_67e2bc650a6b3.jpg"],
            ["categoryDetails"=>"Jeans","category_id"=>1,"subcategory_id"=>1,"category_details_image"=>"1741797727_67d1b95f64d86.jpg"],
            ["categoryDetails"=>"Shirts","category_id"=>1,"subcategory_id"=>1,"category_details_image"=>"1741797659_67d1b91b55cc6.jpg"],
            ["categoryDetails"=>"T-shirts","category_id"=>1,"subcategory_id"=>1,"category_details_image"=>"1741797697_67d1b9417b459.jpg"],

            ["categoryDetails"=>"Ankle boots","category_id"=>1,"subcategory_id"=>2],
            ["categoryDetails"=>"Ankle boots","category_id"=>1,"subcategory_id"=>2],
            ["categoryDetails"=>"Trainers","category_id"=>1,"subcategory_id"=>2],
            ["categoryDetails"=>"Sneakers","category_id"=>1,"subcategory_id"=>2],
            ["categoryDetails"=>"Smart Shoes","category_id"=>1,"subcategory_id"=>2],
        ]);
    }
}
