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
            ["category_id"=>2,"subcategories"=>"Clothes","subcategories_image"=>"maxim-shibakov-U8DXIS7h52Y-unsplash.jpg"],
            ["category_id"=>2,"subcategories"=>"Shoes","subcategories_image"=>"fray-bekele-DDzjU627-eI-unsplash.jpg"],
            ["category_id"=>1,"subcategories"=>"New","subcategories_image"=>"clark-street-mercantile-qnKhZJPKFD8-unsplash.jpg"],
            ["category_id"=>2,"subcategories"=>"New","subcategories_image"=>"freestocks-_3Q3tsJ01nc-unsplash.jpg"],
        ]);
    }
}
