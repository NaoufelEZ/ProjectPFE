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
            ["title"=>"T-SHIRT","description"=>"Explorez la simplicité raffinée avec notre T-shirt Basique pour Homme, une pièce incontournable qui allie confort et polyvalence","price"=>29,"discount"=>0,"details_id"=>1],
            ["title"=>"Chunky techno trainers","description"=>"OrthoLite® insole for cushioning and breathability.","price"=>129,"discount"=>0,"details_id"=>27],
        ]);
    }
}
