<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::factory()->create([
            'first_name' => 'Naoufel',
            'last_name' => 'Abdelli',
            'email' => 'admin@admin.com',
            'password' => Hash::make("123456"),
            'email_verify' => true,
            'phone' => "24365390",
            'role' => 'Super Admin',
        ]);
        User::factory()->create([
            'first_name' => 'Nidhal',
            'last_name' => 'Abdelli',
            'email' => 'productmanager@gmail.com',
            'password' => Hash::make("123456"),
            'email_verify' => true,
            'phone' => "55205429",
            'role' => 'Product Manager',
        ]);
    }
}
