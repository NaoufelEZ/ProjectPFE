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
            ["category_id"=>2,"subcategories"=>"Clothes","subcategories_image"=>"1741710390_67d06436678c2.jpg"],
            ["category_id"=>2,"subcategories"=>"Shoes","subcategories_image"=>"1741710440_67d0646882d3a.jpg"],
            ["category_id"=>1,"subcategories"=>"New","subcategories_image"=>"1741709376_67d0604068eac.jpg"],
            ["category_id"=>2,"subcategories"=>"New","subcategories_image"=>"1741709322_67d0600ac664a.jpg"],
        ]);
    }
}
