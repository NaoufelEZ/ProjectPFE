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
        Categories::factory()->create([
            "category"=>"Man"
        ]);
        Categories::factory()->create([
            "category"=>"Women"
        ]);
    }
}
