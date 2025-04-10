<?php

namespace Database\Seeders;

use App\Models\Categories;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Categories::factory(10)->create();
        Categories::factory()->createMany([
            ["category" => "Men"],
            ["category" => "Women"],
        ]);
    }
}
