<?php

namespace Database\Seeders;

use App\Models\Subcategories;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubcategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Subcategories::factory()->createMany([
            ["category_id"=>1,"subcategories"=>"Clothes","subcategories_image"=>"1741709376_67d0604068eac.jpg"],
            ["category_id"=>1,"subcategories"=>"Shoes","subcategories_image"=>"1741709322_67d0600ac664a.jpg"],
            ["category_id"=>2,"subcategories"=>"Clothes","subcategories_image"=>"00688710060-a7o.jpg"],
            ["category_id"=>2,"subcategories"=>"Shoes","subcategories_image"=>"11759560001-05-a7o.jpg"],
            ["category_id"=>1,"subcategories"=>"New","subcategories_image"=>"01387109800-13-a7o.jpg"],
            ["category_id"=>2,"subcategories"=>"New","subcategories_image"=>"03229360800-a7o.jpg"],
        ]);
    }
}
