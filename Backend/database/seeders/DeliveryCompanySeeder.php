<?php

namespace Database\Seeders;

use App\Models\DeliveryCompany;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeliveryCompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DeliveryCompany::factory()->create(
            [
                'name' => 'DHL',
                'address' => '1001, BP 585, 2, 1 Rue Sinbad, Tunis 1001, Tunisia',
                'phone' => '31323334',
                'mail' => 'dhltn@yahoo.fr',
                'fee' => 9,
                'duration' => 3,
            ]
        );
        
    }
}
