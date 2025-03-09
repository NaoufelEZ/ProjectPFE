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
            ["subcategories"=>"Clothes"],
            ["subcategories"=>"Shoes"],
        ]);
    }
}
