<?php

namespace Database\Seeders;

use App\Models\ProductStock;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductsStockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductStock::factory()->createMany([
            // Product 1 - Leather effect jacket
            ["product_id" => 1, "color" => "Black","holder_product_picture" =>"01576677800-21-a10o.jpg", "product_picture" => "01576677800-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 1, "color" => "Black","holder_product_picture" =>"01576677800-21-a10o.jpg", "product_picture" => "01576677800-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 1, "color" => "Black","holder_product_picture" =>"01576677800-21-a10o.jpg", "product_picture" => "01576677800-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 2 - Denim trucker jacket
            ["product_id" => 2, "color" => "Midnight Steel", "holder_product_picture" =>"01555534401-a3o.jpg", "product_picture" => "01549074401-a4opo.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 2, "color" => "Midnight Steel", "holder_product_picture" =>"01555534401-a3o.jpg",  "product_picture" => "01549074401-a4opo.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 2, "color" => "Midnight Steel", "holder_product_picture" =>"01555534401-a3o.jpg",  "product_picture" => "01549074401-a4opo.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 2, "color" => "Black", "holder_product_picture" =>"01556534800-a3o.jpg",  "product_picture" => "01556534800-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 2, "color" => "Black", "holder_product_picture" =>"01556534800-a3o.jpg",  "product_picture" => "01556534800-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 2, "color" => "Black", "holder_product_picture" =>"01556534800-a3o.jpg",  "product_picture" => "01556534800-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 3 - Contrast jacket
            ["product_id" => 3, "color" => "Black", "holder_product_picture" =>"01596730800-p.jpg",  "product_picture" => "01596730800-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 3, "color" => "Black", "holder_product_picture" =>"01596730800-p.jpg",  "product_picture" => "01596730800-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 3, "color" => "Black", "holder_product_picture" =>"01596730800-p.jpg",  "product_picture" => "01596730800-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 3, "color" => "brown", "holder_product_picture" =>"01596730700-p.jpg",  "product_picture" => "01596730700-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 3, "color" => "brown", "holder_product_picture" =>"01596730700-p.jpg",  "product_picture" => "01596730700-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 3, "color" => "brown", "holder_product_picture" =>"01596730700-p.jpg",  "product_picture" => "01596730700-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 4 - Seersucker jacket
            ["product_id" => 4, "color" => "Merino", "holder_product_picture" =>"01591055712-p.jpg",  "product_picture" => "01591055712-b.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 4, "color" => "Merino", "holder_product_picture" =>"01591055712-p.jpg",  "product_picture" => "01591055712-b.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 4, "color" => "Merino", "holder_product_picture" =>"01591055712-p.jpg",  "product_picture" => "01591055712-b.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 4, "color" => "black", "holder_product_picture" =>"01591055800-p.jpg",  "product_picture" => "01591055800-b.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 4, "color" => "black", "holder_product_picture" =>"01591055800-p.jpg",  "product_picture" => "01591055800-b.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 4, "color" => "black", "holder_product_picture" =>"01591055800-p.jpg",  "product_picture" => "01591055800-b.jpg", "size" => "L", "quantity" => 20],

            // Product 5 - Technical hooded anorak jacket
            ["product_id" => 5, "color" => "Soft Amber", "holder_product_picture" =>"01594098700-p.jpg",  "product_picture" => "01594098700-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 5, "color" => "Soft Amber", "holder_product_picture" =>"01594098700-p.jpg",  "product_picture" => "01594098700-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 5, "color" => "Soft Amber", "holder_product_picture" =>"01594098700-p.jpg",  "product_picture" => "01594098700-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 6 - Baggy jacquard jeans
            ["product_id" => 6, "color" => "white", "holder_product_picture" =>"00359074712-p.jpg",  "product_picture" => "00359074712-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 6, "color" => "white", "holder_product_picture" =>"00359074712-p.jpg",  "product_picture" => "00359074712-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 6, "color" => "white", "holder_product_picture" =>"00359074712-p.jpg",  "product_picture" => "00359074712-a4o.jpg", "size" => "L", "quantity" => 20],
            

            // Product 7 - Baggy jogger jeans
            ["product_id" => 7, "color" => "Black", "holder_product_picture" =>"00368335401-p.jpg",  "product_picture" => "00368335401-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 7, "color" => "Black", "holder_product_picture" =>"00368335401-p.jpg",  "product_picture" => "00368335401-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 7, "color" => "Black", "holder_product_picture" =>"00368335401-p.jpg",  "product_picture" => "00368335401-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 7, "color" => "Geyser", "holder_product_picture" =>"00368335433-p.jpg",  "product_picture" => "00368335433-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 7, "color" => "Geyser", "holder_product_picture" =>"00368335433-p.jpg",  "product_picture" => "00368335433-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 7, "color" => "Geyser", "holder_product_picture" =>"00368335433-p.jpg",  "product_picture" => "00368335433-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 8 - Baggy printed jeans
            ["product_id" => 8, "color" => "Wild Blue Yonder", "holder_product_picture" =>"00355179433-p.jpg",  "product_picture" => "1745696040_680d352816c3d.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 8, "color" => "Wild Blue Yonder", "holder_product_picture" =>"00355179433-p.jpg",  "product_picture" => "1745696040_680d352816c3d.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 8, "color" => "Wild Blue Yonder", "holder_product_picture" =>"00355179433-p.jpg",  "product_picture" => "1745696040_680d352816c3d.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 8, "color" => "black", "holder_product_picture" =>"00337335809-p.jpg",  "product_picture" => "00337335809-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 8, "color" => "black", "holder_product_picture" =>"00337335809-p.jpg",  "product_picture" => "00337335809-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 8, "color" => "black", "holder_product_picture" =>"00337335809-p.jpg",  "product_picture" => "00337335809-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 8, "color" => "Soft Amber", "holder_product_picture" =>"00343074500-p.jpg",  "product_picture" => "00343074500-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 8, "color" => "Soft Amber", "holder_product_picture" =>"00343074500-p.jpg",  "product_picture" => "00343074500-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 8, "color" => "Soft Amber", "holder_product_picture" =>"00343074500-p.jpg",  "product_picture" => "00343074500-a4o.jpg", "size" => "L", "quantity" => 20],            
            // Product 9 - Balloon fit baggy jeans
            ["product_id" => 9, "color" => "Black", "holder_product_picture" =>"1745694769_680d30313ad27.webp",  "product_picture" => "00337335809-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 9, "color" => "Black", "holder_product_picture" =>"1745694769_680d30313ad27.webp",  "product_picture" => "00337335809-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 9, "color" => "Black", "holder_product_picture" =>"1745694769_680d30313ad27.webp",  "product_picture" => "00337335809-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 9, "color" => "White", "holder_product_picture" =>"1745694413_680d2ecd6ecc6.webp",  "product_picture" => "00343074500-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 9, "color" => "White", "holder_product_picture" =>"1745694413_680d2ecd6ecc6.webp",  "product_picture" => "00343074500-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 9, "color" => "White", "holder_product_picture" =>"1745694413_680d2ecd6ecc6.webp",  "product_picture" => "00343074500-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 10 - Faded-effect skater fit jeans
            ["product_id" => 10, "color" => "Light Blue Cloud", "holder_product_picture" =>"1745695202_680d31e20d2a7.jpg",  "product_picture" => "00336074400-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 10, "color" => "Light Blue Cloud", "holder_product_picture" =>"1745695202_680d31e20d2a7.jpg",  "product_picture" => "00336074400-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 10, "color" => "Light Blue Cloud", "holder_product_picture" =>"1745695202_680d31e20d2a7.jpg",  "product_picture" => "00336074400-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 10, "color" => "Light Blue Cloud", "holder_product_picture" =>"1745695202_680d31e20d2a7.jpg",  "product_picture" => "00337335809-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 10, "color" => "Light Blue Cloud", "holder_product_picture" =>"1745695202_680d31e20d2a7.jpg",  "product_picture" => "00337335809-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 10, "color" => "Light Blue Cloud", "holder_product_picture" =>"1745695202_680d31e20d2a7.jpg",  "product_picture" => "00337335809-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 11 - Flared jeans
            ["product_id" => 11, "color" => "Blue", "holder_product_picture" =>"00372352428-21-a9o.jpg",  "product_picture" => "00372352428-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 11, "color" => "Blue", "holder_product_picture" =>"00372352428-21-a9o.jpg",  "product_picture" => "00372352428-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 11, "color" => "Blue", "holder_product_picture" =>"00372352428-21-a9o.jpg",  "product_picture" => "00372352428-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 11, "color" => "Cloud", "holder_product_picture" =>"00372352811-21-a9o.jpg",  "product_picture" => "00372352811-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 11, "color" => "Cloud", "holder_product_picture" =>"00372352811-21-a9o.jpg",  "product_picture" => "00372352811-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 11, "color" => "Cloud", "holder_product_picture" =>"00372352811-21-a9o.jpg",  "product_picture" => "00372352811-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 12 - Loose-fit baggy jeans
            ["product_id" => 12, "color" => "Gun Powder", "holder_product_picture" =>"00334534401-p.jpg",  "product_picture" => "00334534401-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 12, "color" => "Gun Powder", "holder_product_picture" =>"00334534401-p.jpg",  "product_picture" => "00334534401-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 12, "color" => "Gun Powder", "holder_product_picture" =>"00334534401-p.jpg",  "product_picture" => "00334534401-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 12, "color" => "Kashmir Blue", "holder_product_picture" =>"00334534428-p.jpg",  "product_picture" => "00334534428-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 12, "color" => "Kashmir Blue", "holder_product_picture" =>"00334534428-p.jpg",  "product_picture" => "00334534428-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 12, "color" => "Kashmir Blue", "holder_product_picture" =>"00334534428-p.jpg",  "product_picture" => "00334534428-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 12, "color" => "Bright Gray", "holder_product_picture" =>"00334534811-p.jpg",  "product_picture" => "00334534811-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 12, "color" => "Bright Gray", "holder_product_picture" =>"00334534811-p.jpg",  "product_picture" => "00334534811-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 12, "color" => "Bright Gray", "holder_product_picture" =>"00334534811-p.jpg",  "product_picture" => "00334534811-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 13 - Skinny jeans
            ["product_id" => 13, "color" => "Black", "holder_product_picture" =>".jpg",  "product_picture" => "00337335809-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 13, "color" => "Black", "holder_product_picture" =>".jpg",  "product_picture" => "00337335809-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 13, "color" => "Black", "holder_product_picture" =>".jpg",  "product_picture" => "00337335809-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 13, "color" => "Blue", "holder_product_picture" =>".jpg",  "product_picture" => "00336074400-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 13, "color" => "Blue", "holder_product_picture" =>".jpg",  "product_picture" => "00336074400-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 13, "color" => "Blue", "holder_product_picture" =>".jpg",  "product_picture" => "00336074400-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 14 - Super baggy jeans
            ["product_id" => 14, "color" => "Black", "holder_product_picture" =>"00352089811-p.jpg",  "product_picture" => "00352089811-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 14, "color" => "Black", "holder_product_picture" =>"00352089811-p.jpg",  "product_picture" => "00352089811-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 14, "color" => "Black", "holder_product_picture" =>"00352089811-p.jpg",  "product_picture" => "00352089811-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 14, "color" => "blue", "holder_product_picture" =>"00352089426-p.jpg.jpg",  "product_picture" => "00352089426-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 14, "color" => "blue", "holder_product_picture" =>"00352089426-p.jpg.jpg",  "product_picture" => "00352089426-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 14, "color" => "blue", "holder_product_picture" =>"00352089426-p.jpg.jpg",  "product_picture" => "00352089426-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 15 - Super skinny ripped jeans
            ["product_id" => 15, "color" => "Black", "holder_product_picture" =>"00361335800-p.jpg",  "product_picture" => "00333666800-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 15, "color" => "Black", "holder_product_picture" =>"00361335800-p.jpg",  "product_picture" => "00333666800-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 15, "color" => "Black", "holder_product_picture" =>"00361335800-p.jpg",  "product_picture" => "00333666800-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 15, "color" => "Fiord", "holder_product_picture" =>"00361335428-p.jpg",  "product_picture" => "00333220400-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 15, "color" => "Fiord", "holder_product_picture" =>"00361335428-p.jpg",  "product_picture" => "00333220400-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 15, "color" => "Fiord", "holder_product_picture" =>"00361335428-p.jpg",  "product_picture" => "00333220400-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 16 - Embroidered short sleeve boxy fit shirt
            ["product_id" => 16, "color" => "Pearl Bush", "holder_product_picture" =>"01249710251-p.jpg",  "product_picture" => "01249710251-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 16, "color" => "Pearl Bush", "holder_product_picture" =>"01249710251-p.jpg",  "product_picture" => "01249710251-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 16, "color" => "Pearl Bush", "holder_product_picture" =>"01249710251-p.jpg",  "product_picture" => "01249710251-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 16, "color" => "Black", "holder_product_picture" =>"01249710800-p.jpg",  "product_picture" => "01249710800-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 16, "color" => "Black", "holder_product_picture" =>"01249710800-p.jpg",  "product_picture" => "01249710800-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 16, "color" => "Black", "holder_product_picture" =>"01249710800-p.jpg",  "product_picture" => "01249710800-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 17 - Oversize short sleeve poplin shirt
            ["product_id" => 17, "color" => "Periwinkle Gray", "holder_product_picture" =>"01271703400-p.jpg",  "product_picture" => "01271703400-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 17, "color" => "Periwinkle Gray", "holder_product_picture" =>"01271703400-p.jpg",  "product_picture" => "01271703400-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 17, "color" => "Periwinkle Gray", "holder_product_picture" =>"01271703400-p.jpg",  "product_picture" => "01271703400-a4o.jpg", "size" => "L", "quantity" => 20],
            

            // Product 18 - Relaxed fit short sleeve shirt
            ["product_id" => 18, "color" => "black", "holder_product_picture" =>"01231073829-p.jpg",  "product_picture" => "01231073829-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 18, "color" => "Black", "holder_product_picture" =>"01231073829-p.jpg",  "product_picture" => "01231073829-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 18, "color" => "Black", "holder_product_picture" =>"01231073829-p.jpg",  "product_picture" => "01231073829-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 18, "color" => "Thatch", "holder_product_picture" =>"01231073830-p.jpg",  "product_picture" => "01231073830-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 18, "color" => "Thatch", "holder_product_picture" =>"01231073830-p.jpg",  "product_picture" => "01231073830-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 18, "color" => "Thatch", "holder_product_picture" =>"01231073830-p.jpg",  "product_picture" => "01231073830-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 19 - Short sleeve boxy tailored fit shirt
            ["product_id" => 19, "color" => "Merino", "holder_product_picture" =>"01226710712-p.jpg",  "product_picture" => "01226710712-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 19, "color" => "Merino", "holder_product_picture" =>"01226710712-p.jpg",  "product_picture" => "01226710712-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 19, "color" => "Merino", "holder_product_picture" =>"01226710712-p.jpg",  "product_picture" => "01226710712-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 19, "color" => "Black", "holder_product_picture" =>"01226710800-p.jpg",  "product_picture" => "01226710800-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 19, "color" => "Black", "holder_product_picture" =>"01226710800-p.jpg",  "product_picture" => "01226710800-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 19, "color" => "Black", "holder_product_picture" =>"01226710800-p.jpg",  "product_picture" => "01226710800-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 19, "color" => "Akaroa", "holder_product_picture" =>"01226710742-p.jpg",  "product_picture" => "01226710742-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 19, "color" => "Akaroa", "holder_product_picture" =>"01226710742-p.jpg",  "product_picture" => "01226710742-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 19, "color" => "Akaroa", "holder_product_picture" =>"01226710742-p.jpg",  "product_picture" => "01226710742-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 20 - Short sleeve denim shirt
            ["product_id" => 20, "color" => "Bright Gray", "holder_product_picture" =>"01214534401-p.jpg",  "product_picture" => "01214534401-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 20, "color" => "Bright Gray", "holder_product_picture" =>"01214534401-p.jpg",  "product_picture" => "01214534401-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 20, "color" => "Bright Gray", "holder_product_picture" =>"01214534401-p.jpg",  "product_picture" => "01214534401-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 20, "color" => "Mystic", "holder_product_picture" =>"01214534433-p.jpg",  "product_picture" => "01214534433-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 20, "color" => "Mystic", "holder_product_picture" =>"01214534433-p.jpg",  "product_picture" => "01214534433-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 20, "color" => "Mystic", "holder_product_picture" =>"01214534433-p.jpg",  "product_picture" => "01214534433-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 21 - Textured short sleeve shirt
            ["product_id" => 21, "color" => "Pearl Bush", "holder_product_picture" =>"01261494251-p.jpg",  "product_picture" => "01261494251-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 21, "color" => "Pearl Bush", "holder_product_picture" =>"01261494251-p.jpg",  "product_picture" => "01261494251-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 21, "color" => "Pearl Bush", "holder_product_picture" =>"01261494251-p.jpg",  "product_picture" => "01261494251-a4o.jpg", "size" => "L", "quantity" => 20],
            

            // Product 22 - Contrast sweater
            ["product_id" => 22, "color" => "Black/White", "holder_product_picture" =>".jpg",  "product_picture" => "02196376800-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 22, "color" => "Black/White", "holder_product_picture" =>".jpg",  "product_picture" => "02196376800-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 22, "color" => "Black/White", "holder_product_picture" =>".jpg",  "product_picture" => "02196376800-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 22, "color" => "Gray/White", "holder_product_picture" =>".jpg",  "product_picture" => "02205376800-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 22, "color" => "Gray/White", "holder_product_picture" =>".jpg",  "product_picture" => "02205376800-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 22, "color" => "Gray/White", "holder_product_picture" =>".jpg",  "product_picture" => "02205376800-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 23 - Mesh boxy fit sweater
            ["product_id" => 23, "color" => "Black", "holder_product_picture" =>"1747319457_6825faa1ae8d9.jpg",  "product_picture" => "1747319457_6825faa1ae1d5.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 23, "color" => "Black", "holder_product_picture" =>"1747319457_6825faa1ae8d9.jpg",  "product_picture" => "1747319457_6825faa1ae1d5.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 23, "color" => "Black", "holder_product_picture" =>"1747319457_6825faa1ae8d9.jpg",  "product_picture" => "1747319457_6825faa1ae1d5.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 23, "color" => "White", "holder_product_picture" =>"1747319457_6825faa1b239d.jpg",  "product_picture" => "1747319457_6825faa1b1d81.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 23, "color" => "White", "holder_product_picture" =>"1747319457_6825faa1b239d.jpg",  "product_picture" => "1747319457_6825faa1b1d81.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 23, "color" => "White", "holder_product_picture" =>"1747319457_6825faa1b239d.jpg",  "product_picture" => "1747319457_6825faa1b1d81.jpg", "size" => "L", "quantity" => 20],

            // Product 24 - Ripped rustic boxy fit sweater
            ["product_id" => 24, "color" => "Brown", "holder_product_picture" =>".jpg",  "product_picture" => "02218069711-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 24, "color" => "Brown", "holder_product_picture" =>".jpg",  "product_picture" => "02218069711-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 24, "color" => "Brown", "holder_product_picture" =>".jpg",  "product_picture" => "02218069711-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 24, "color" => "Gray", "holder_product_picture" =>".jpg",  "product_picture" => "02205376800-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 24, "color" => "Gray", "holder_product_picture" =>".jpg",  "product_picture" => "02205376800-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 24, "color" => "Gray", "holder_product_picture" =>".jpg",  "product_picture" => "02205376800-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 25 - Cars boxy fit hooded sweatshirt
            ["product_id" => 25, "color" => "white", "holder_product_picture" =>"02245538812-p.jpg",  "product_picture" => "02245538812-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 25, "color" => "white", "holder_product_picture" =>"02245538812-p.jpg",  "product_picture" => "02245538812-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 25, "color" => "white", "holder_product_picture" =>"02245538812-p.jpg",  "product_picture" => "02245538812-a4o.jpg", "size" => "L", "quantity" => 20],
            

            // Product 26 - Cropped boxy fit zip-up hoodie
            ["product_id" => 26, "color" => "Black", "holder_product_picture" =>"01857732818-p.jpg",  "product_picture" => "01857732818-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 26, "color" => "Black", "holder_product_picture" =>"01857732818-p.jpg",  "product_picture" => "01857732818-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 26, "color" => "Black", "holder_product_picture" =>"01857732818-p.jpg",  "product_picture" => "01857732818-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 26, "color" => "white", "holder_product_picture" =>"01857732802-p.jpg",  "product_picture" => "01857732802-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 26, "color" => "white", "holder_product_picture" =>"01857732802-p.jpg",  "product_picture" => "01857732802-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 26, "color" => "white", "holder_product_picture" =>"01857732802-p.jpg",  "product_picture" => "01857732802-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 27 - Hoodie
            ["product_id" => 27, "color" => "Fiord", "holder_product_picture" =>"07371498477-p.jpg",  "product_picture" => "0a09fa8adbb8e004ba47599f60cc7f83-7371498477_2_4_0.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 27, "color" => "Fiord", "holder_product_picture" =>"07371498477-p.jpg",  "product_picture" => "0a09fa8adbb8e004ba47599f60cc7f83-7371498477_2_4_0.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 27, "color" => "Fiord", "holder_product_picture" =>"07371498477-p.jpg",  "product_picture" => "0a09fa8adbb8e004ba47599f60cc7f83-7371498477_2_4_0.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 27, "color" => "white", "holder_product_picture" =>"07371498251-p.jpg",  "product_picture" => "07371498251-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 27, "color" => "white", "holder_product_picture" =>"07371498251-p.jpg",  "product_picture" => "07371498251-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 27, "color" => "white", "holder_product_picture" =>"07371498251-p.jpg",  "product_picture" => "07371498251-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 28 - Polo collar sweatshirt
            ["product_id" => 28, "color" => "Lynch", "holder_product_picture" =>"02249003400-a2d.jpg",  "product_picture" => "02249003400-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 28, "color" => "Lynch", "holder_product_picture" =>"02249003400-a2d.jpg",  "product_picture" => "02249003400-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 28, "color" => "Lynch", "holder_product_picture" =>"02249003400-a2d.jpg",  "product_picture" => "02249003400-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 28, "color" => "Tapa", "holder_product_picture" =>"02249003818-a2d.jpg",  "product_picture" => "02249003818-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 28, "color" => "Tapa", "holder_product_picture" =>"02249003818-a2d.jpg",  "product_picture" => "02249003818-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 28, "color" => "Tapa", "holder_product_picture" =>"02249003818-a2d.jpg",  "product_picture" => "02249003818-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 29 - Printed sweatshirt with polo collar
            ["product_id" => 29, "color" => "black", "holder_product_picture" =>"02253498500-p.jpg",  "product_picture" => "02253498500-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 29, "color" => "Black", "holder_product_picture" =>"02253498500-p.jpg",  "product_picture" => "02253498500-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 29, "color" => "Black", "holder_product_picture" =>"02253498500-p.jpg",  "product_picture" => "02253498500-a4o.jpg", "size" => "L", "quantity" => 20],
            

            // Product 30 - Printed sweatshirt with zip
            ["product_id" => 30, "color" => "Bone", "holder_product_picture" =>"01861003514-p.jpg",  "product_picture" => "01861003514-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 30, "color" => "Bone", "holder_product_picture" =>"01861003514-p.jpg",  "product_picture" => "01861003514-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 30, "color" => "Bone", "holder_product_picture" =>"01861003514-p.jpg",  "product_picture" => "01861003514-a4o.jpg", "size" => "L", "quantity" => 20],
            

            // Product 31 - Balloon fit printed trousers
            ["product_id" => 31, "color" => "White Rock", "holder_product_picture" =>"00415054712-21-a9o.jpg",  "product_picture" => "00415054712-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 31, "color" => "White Rock", "holder_product_picture" =>"00415054712-21-a9o.jpg",  "product_picture" => "00415054712-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 31, "color" => "White Rock", "holder_product_picture" =>"00415054712-21-a9o.jpg",  "product_picture" => "00415054712-a4o.jpg", "size" => "L", "quantity" => 20],
            

            // Product 32 - Flared plush baggy trousers
            ["product_id" => 32, "color" => "Black", "holder_product_picture" =>"00460478810-p.jpg",  "product_picture" => "00460478810-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 32, "color" => "Black", "holder_product_picture" =>"00460478810-p.jpg",  "product_picture" => "00460478810-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 32, "color" => "Black", "holder_product_picture" =>"00460478810-p.jpg", "product_picture" => "00460478810-a4o.jpg", "size" => "L", "quantity" => 20],
            

            // Product 33 - Flowing baggy jogger trousers
            ["product_id" => 33, "color" => "Fuscous Gray", "holder_product_picture" =>"00426777802-p.jpg",  "product_picture" => "00426777802-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 33, "color" => "Fuscous Gray", "holder_product_picture" =>"00426777802-p.jpg",  "product_picture" => "00426777802-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 33, "color" => "Fuscous Gray", "holder_product_picture" =>"00426777802-p.jpg",  "product_picture" => "00426777802-a4o.jpg", "size" => "L", "quantity" => 20],
            

            // Product 34 - Plush balloon fit trousers
            ["product_id" => 34, "color" => "Black", "holder_product_picture" =>"00455003800-p.jpg",  "product_picture" => "00455003800-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 34, "color" => "Black", "holder_product_picture" =>"00455003800-p.jpg",  "product_picture" => "00455003800-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 34, "color" => "Black", "holder_product_picture" =>"00455003800-p.jpg",  "product_picture" => "00455003800-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 34, "color" => "Zorba", "holder_product_picture" =>"00455003707-p.jpg",  "product_picture" => "00455003707-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 34, "color" => "Zorba", "holder_product_picture" =>"00455003707-p.jpg",  "product_picture" => "00455003707-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 34, "color" => "Zorba", "holder_product_picture" =>"00455003707-p.jpg",  "product_picture" => "00455003707-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 34, "color" => "French Gray", "holder_product_picture" =>"00455003812-p.jpg",  "product_picture" => "00455003812-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 34, "color" => "French Gray", "holder_product_picture" =>"00455003812-p.jpg",  "product_picture" => "00455003812-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 34, "color" => "French Gray", "holder_product_picture" =>"00455003812-p.jpg",  "product_picture" => "00455003812-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 35 - Super baggy parachute trousers
            ["product_id" => 35, "color" => "Black", "holder_product_picture" =>"00437335800-p.jpg",  "product_picture" => "00437335800-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 35, "color" => "Black", "holder_product_picture" =>"00437335800-p.jpg",  "product_picture" => "00437335800-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 35, "color" => "Black", "holder_product_picture" =>"00437335800-p.jpg",  "product_picture" => "00437335800-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 35, "color" => "Soft Amber", "holder_product_picture" =>"00437335711-p.jpg", "product_picture" => "00437335711-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 35, "color" => "Soft Amber", "holder_product_picture" =>"00437335711-p.jpg",  "product_picture" => "00437335711-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 35, "color" => "Soft Amber", "holder_product_picture" =>"00437335711-p.jpg", "product_picture" => "00437335711-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 36 - Super baggy printed trousers
            ["product_id" => 36, "color" => "Makara", "holder_product_picture" =>"00433054829-21-a10o.jpg",  "product_picture" => "00433054829-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 36, "color" => "Makara", "holder_product_picture" =>"00433054829-21-a10o.jpg",  "product_picture" => "00433054829-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 36, "color" => "Makara", "holder_product_picture" =>"00433054829-21-a10o.jpg",  "product_picture" => "00433054829-a4o.jpg", "size" => "L", "quantity" => 20],
            

            // Product 37 - Super baggy trousers with detachable detail
            ["product_id" => 37, "color" => "Judge Gray", "holder_product_picture" =>"00432054505-21-a9o.jpg",  "product_picture" => "00432054505-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 37, "color" => "Judge Gray", "holder_product_picture" =>"00432054505-21-a9o.jpg",  "product_picture" => "00432054505-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 37, "color" => "Judge Gray", "holder_product_picture" =>"00432054505-21-a9o.jpg",  "product_picture" => "00432054505-a4o.jpg", "size" => "L", "quantity" => 20],
        

            // Product 38 - Sweatshirt and wide-leg trousers pack
            ["product_id" => 38, "color" => "Black", "holder_product_picture" =>"07046111001-a3o.jpg",  "product_picture" => "07046111001-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 38, "color" => "Black", "holder_product_picture" =>"07046111001-a3o.jpg",  "product_picture" => "07046111001-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 38, "color" => "Black", "holder_product_picture" =>"07046111001-a3o.jpg",  "product_picture" => "07046111001-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 38, "color" => "white", "holder_product_picture" =>"07046111002-a3f.jpg",  "product_picture" => "07046111002-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 38, "color" => "white", "holder_product_picture" =>"07046111002-a3f.jpg",  "product_picture" => "07046111002-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 38, "color" => "white", "holder_product_picture" =>"07046111002-a3f.jpg",  "product_picture" => "07046111002-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 39 - Textured wide-leg trousers
            ["product_id" => 39, "color" => "white", "holder_product_picture" =>"00434494251-p.jpg",  "product_picture" => "00434494251-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 39, "color" => "white", "holder_product_picture" =>"00434494251-p.jpg",  "product_picture" => "00434494251-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 39, "color" => "white", "holder_product_picture" =>"00434494251-p.jpg",  "product_picture" => "00434494251-a4o.jpg", "size" => "L", "quantity" => 20],
            

            // Product 40 - Wide-leg linen blend jogger trousers
            ["product_id" => 40, "color" => "Black", "holder_product_picture" =>"00409665800-p.jpg",  "product_picture" => "00409665800-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 40, "color" => "Black", "holder_product_picture" =>"00409665800-p.jpg",  "product_picture" => "00409665800-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 40, "color" => "Black", "holder_product_picture" =>"00409665800-p.jpg",  "product_picture" => "00409665800-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 40, "color" => "Bone", "holder_product_picture" =>"00409665711-p.jpg",  "product_picture" => "00409665711-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 40, "color" => "Bone", "holder_product_picture" =>"00409665711-p.jpg",  "product_picture" => "00409665711-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 40, "color" => "Bone", "holder_product_picture" =>"00409665711-p.jpg",  "product_picture" => "00409665711-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 40, "color" => "White", "holder_product_picture" =>"00409665250-p.jpg",  "product_picture" => "00409665250-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 40, "color" => "White", "holder_product_picture" =>"00409665250-p.jpg",  "product_picture" => "00409665250-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 40, "color" => "White", "holder_product_picture" =>"00409665250-p.jpg",  "product_picture" => "00409665250-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 41 - Faded short sleeve T-shirt
            ["product_id" => 41, "color" => "Malta", "holder_product_picture" =>"02899498707-p.jpg",  "product_picture" => "02899498707-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 41, "color" => "Malta", "holder_product_picture" =>"02899498707-p.jpg",  "product_picture" => "02899498707-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 41, "color" => "Malta", "holder_product_picture" =>"02899498707-p.jpg",  "product_picture" => "02899498707-a4o.jpg", "size" => "L", "quantity" => 20],
            

            // Product 42 - Faded-effect short sleeve ripped T-shirt
            ["product_id" => 42, "color" => "Satin Linen", "holder_product_picture" =>"02946443710-p.jpg",  "product_picture" => "02946443710-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 42, "color" => "Satin Linen", "holder_product_picture" =>"02946443710-p.jpg",  "product_picture" => "02946443710-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 42, "color" => "Satin Linen", "holder_product_picture" =>"02946443710-p.jpg",  "product_picture" => "02946443710-a4o.jpg", "size" => "L", "quantity" => 20],
            

            // Product 43 - Oversize short sleeve T-shirt
            ["product_id" => 43, "color" => "White", "holder_product_picture" =>"02809443812-p.jpg",  "product_picture" => "02809443812-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 43, "color" => "White", "holder_product_picture" =>"02809443812-p.jpg",  "product_picture" => "02809443812-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 43, "color" => "White", "holder_product_picture" =>"02809443812-p.jpg",  "product_picture" => "02809443812-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 43, "color" => "Black", "holder_product_picture" =>"02809443800-a3o.jpg",  "product_picture" => "02809443800-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 43, "color" => "Black", "holder_product_picture" =>"02809443800-a3o.jpg",  "product_picture" => "02809443800-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 43, "color" => "Black", "holder_product_picture" =>"02809443800-a3o.jpg",  "product_picture" => "02809443800-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 43, "color" => "Rock Blue", "holder_product_picture" =>"02809443428-p.jpg",  "product_picture" => "02809443428-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 43, "color" => "Rock Blue", "holder_product_picture" =>"02809443428-p.jpg",  "product_picture" => "02809443428-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 43, "color" => "Rock Blue", "holder_product_picture" =>"02809443428-p.jpg",  "product_picture" => "02809443428-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 44 - Rustic polo shirt
            ["product_id" => 44, "color" => "Janna", "holder_product_picture" =>"03431693712-p.jpg",  "product_picture" => "03431693712-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 44, "color" => "Janna", "holder_product_picture" =>"03431693712-p.jpg",  "product_picture" => "03431693712-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 44, "color" => "Janna", "holder_product_picture" =>"03431693712-p.jpg",  "product_picture" => "03431693712-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 45 - Short sleeve cropped piqué T-shirt
            ["product_id" => 45, "color" => "Oyster Pink", "holder_product_picture" =>"08160777622-p.jpg",  "product_picture" => "08160777622-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 45, "color" => "Oyster Pink", "holder_product_picture" =>"08160777622-p.jpg",  "product_picture" => "08160777622-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 45, "color" => "Oyster Pink", "holder_product_picture" =>"08160777622-p.jpg",  "product_picture" => "08160777622-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 45, "color" => "Black", "holder_product_picture" =>"08160777800-p.jpg",  "product_picture" => "08160777800-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 45, "color" => "Black", "holder_product_picture" =>"08160777800-p.jpg",  "product_picture" => "08160777800-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 45, "color" => "Black", "holder_product_picture" =>"08160777800-p.jpg",  "product_picture" => "08160777800-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 46 - Short sleeve sport print T-shirt 
            ["product_id" => 46, "color" => "White", "holder_product_picture" =>"02887478250-p.jpg",  "product_picture" => "02887478250-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 46, "color" => "White", "holder_product_picture" =>"02887478250-p.jpg",  "product_picture" => "02887478250-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 46, "color" => "White", "holder_product_picture" =>"02887478250-p.jpg",  "product_picture" => "02887478250-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 47 - Slub effect print sleeveless T-shirt
            ["product_id" => 47, "color" => "White", "holder_product_picture" =>"02942443251-p.jpg",  "product_picture" => "02942443251-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 47, "color" => "White", "holder_product_picture" =>"02942443251-p.jpg",  "product_picture" => "02942443251-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 47, "color" => "White", "holder_product_picture" =>"02942443251-p.jpg",  "product_picture" => "02942443251-a4o.jpg", "size" => "L", "quantity" => 20],

            // Product 48 - Textured polo shirt
            ["product_id" => 48, "color" => "White", "holder_product_picture" =>"08562777251-p.jpg",  "product_picture" => "08562777251-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 48, "color" => "White", "holder_product_picture" =>"08562777251-p.jpg",  "product_picture" => "08562777251-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 48, "color" => "White", "holder_product_picture" =>"08562777251-p.jpg",  "product_picture" => "08562777251-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 48, "color" => "Tasman", "holder_product_picture" =>"08562777537-p.jpg",  "product_picture" => "08562777537-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 48, "color" => "Tasman", "holder_product_picture" =>"08562777537-p.jpg",  "product_picture" => "08562777537-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 48, "color" => "Tasman", "holder_product_picture" =>"08562777537-p.jpg",  "product_picture" => "08562777537-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 48, "color" => "Stark White", "holder_product_picture" =>"08562777707-p.jpg",  "product_picture" => "08562777707-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 48, "color" => "Stark White", "holder_product_picture" =>"08562777707-p.jpg",  "product_picture" => "08562777707-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 48, "color" => "Stark White", "holder_product_picture" =>"08562777707-p.jpg",  "product_picture" => "08562777707-a4o.jpg", "size" => "L", "quantity" => 20],
            ["product_id" => 48, "color" => "black", "holder_product_picture" =>"08562777800-p.jpg",  "product_picture" => "08562777800-a4o.jpg", "size" => "S", "quantity" => 20],
            ["product_id" => 48, "color" => "Black", "holder_product_picture" =>"08562777800-p.jpg",  "product_picture" => "08562777800-a4o.jpg", "size" => "M", "quantity" => 20],
            ["product_id" => 48, "color" => "Black", "holder_product_picture" =>"08562777800-p.jpg",  "product_picture" => "08562777800-a4o.jpg", "size" => "L", "quantity" => 20],


            // Product 49 - Leather Ankle Boots
            ["product_id" => 49, "color" => "Black", "holder_product_picture" =>".jpg",  "product_picture" => "12100560040-a4o.jpg", "size" => "40", "quantity" => 20],
            ["product_id" => 49, "color" => "Black", "holder_product_picture" =>".jpg",  "product_picture" => "12100560040-a4o.jpg", "size" => "41", "quantity" => 20],
            ["product_id" => 49, "color" => "Black", "holder_product_picture" =>".jpg",  "product_picture" => "12100560040-a4o.jpg", "size" => "42", "quantity" => 20],
            ["product_id" => 49, "color" => "Brown", "holder_product_picture" =>".jpg",  "product_picture" => "12100560025-a4o.jpg", "size" => "40", "quantity" => 20],
            ["product_id" => 49, "color" => "Brown", "holder_product_picture" =>".jpg",  "product_picture" => "12100560025-a4o.jpg", "size" => "41", "quantity" => 20],
            ["product_id" => 49, "color" => "Brown", "holder_product_picture" =>".jpg",  "product_picture" => "12100560025-a4o.jpg", "size" => "42", "quantity" => 20],

            // Product 50 - buckled flat slider sandals
            ["product_id" => 50, "color" => "Yellow Metal", "holder_product_picture" =>"12701560107-b1o.jpg",  "product_picture" => "12701560107-a4o.jpg", "size" => "39", "quantity" => 20],
            ["product_id" => 50, "color" => "Yellow Metal", "holder_product_picture" =>"12701560107-b1o.jpg",  "product_picture" => "12701560107-a4o.jpg", "size" => "40", "quantity" => 20],
            ["product_id" => 50, "color" => "Yellow Metal", "holder_product_picture" =>"12701560107-b1o.jpg",  "product_picture" => "12701560107-a4o.jpg", "size" => "41", "quantity" => 20],
            ["product_id" => 50, "color" => "Pastel Brown", "holder_product_picture" =>"12701560131-b1o.jpg",  "product_picture" => "12701560131-a4o.jpg", "size" => "39", "quantity" => 20],
            ["product_id" => 50, "color" => "Pastel Brown", "holder_product_picture" =>"12701560131-b1o.jpg",  "product_picture" => "12701560131-a4o.jpg", "size" => "40", "quantity" => 20],
            ["product_id" => 50, "color" => "Pastel Brown", "holder_product_picture" =>"12701560131-b1o.jpg",  "product_picture" => "12701560131-a4o.jpg", "size" => "41", "quantity" => 20],

            // Product 51 - Deck shoes with keyring detail
            ["product_id" => 51, "color" => "black", "holder_product_picture" =>"12623560040-01-w.jpg",  "product_picture" => "12623560040-a4o.jpg", "size" => "40", "quantity" => 20],
            ["product_id" => 51, "color" => "black", "holder_product_picture" =>"12623560040-01-w.jpg",  "product_picture" => "12623560040-a4o.jpg", "size" => "41", "quantity" => 20],
            ["product_id" => 51, "color" => "Black", "holder_product_picture" =>"12623560040-01-w.jpg",  "product_picture" => "12623560040-a4o.jpg", "size" => "42", "quantity" => 20],
            

            // Product 52 - Deck shoes with moc toe
            ["product_id" => 52, "color" => "Brown", "holder_product_picture" =>"12639560100-02-b1o.jpg",  "product_picture" => "12639560100-a4o.jpg", "size" => "40", "quantity" => 20],
            ["product_id" => 52, "color" => "Brown", "holder_product_picture" =>"12639560100-02-b1o.jpg",  "product_picture" => "12639560100-a4o.jpg", "size" => "41", "quantity" => 20],
            ["product_id" => 52, "color" => "Brown", "holder_product_picture" =>"12639560100-02-b1o.jpg",  "product_picture" => "12639560100-a4o.jpg", "size" => "42", "quantity" => 20],
            

            // Product 53 - Fringed loafers with tassel
            ["product_id" => 53, "color" => "Seal Brown", "holder_product_picture" =>"12622560022-b3o.jpg",  "product_picture" => "12622560022-a4o.jpg", "size" => "40", "quantity" => 20],
            ["product_id" => 53, "color" => "Seal Brown", "holder_product_picture" =>"12622560022-b3o.jpg",  "product_picture" => "12622560022-a4o.jpg", "size" => "41", "quantity" => 20],
            ["product_id" => 53, "color" => "Seal Brown", "holder_product_picture" =>"12622560022-b3o.jpg",  "product_picture" => "12622560022-a4o.jpg", "size" => "42", "quantity" => 20],
            ["product_id" => 53, "color" => "Black", "holder_product_picture" =>"1262256004001-w.jpg",  "product_picture" => "12622560040-a4o.jpg", "size" => "40", "quantity" => 20],
            ["product_id" => 53, "color" => "Black", "holder_product_picture" =>"1262256004001-w.jpg",  "product_picture" => "12622560040-a4o.jpg", "size" => "41", "quantity" => 20],
            ["product_id" => 53, "color" => "Black", "holder_product_picture" =>"1262256004001-w.jpg",  "product_picture" => "12622560040-a4o.jpg", "size" => "42", "quantity" => 20],

            // Product 54 - Loafers with thin sole
            ["product_id" => 54, "color" => "Black", "holder_product_picture" =>"12616560040-01-w.jpg",  "product_picture" => "12616560040-a4o.jpg", "size" => "40", "quantity" => 20],
            ["product_id" => 54, "color" => "Black", "holder_product_picture" =>"12616560040-01-w.jpg",  "product_picture" => "12616560040-a4o.jpg", "size" => "41", "quantity" => 20],
            ["product_id" => 54, "color" => "Black", "holder_product_picture" =>"12616560040-01-w.jpg",  "product_picture" => "12616560040-a4o.jpg", "size" => "42", "quantity" => 20],

            // Product 55 - Trainers with thin soles
            ["product_id" => 55, "color" => "Black", "holder_product_picture" =>"12305560040-01-w.jpg",  "product_picture" => "12305560040-a4o.jpg", "size" => "40", "quantity" => 20],
            ["product_id" => 55, "color" => "Black", "holder_product_picture" =>"12305560040-01-w.jpg",  "product_picture" => "12305560040-a4o.jpg", "size" => "41", "quantity" => 20],
            ["product_id" => 55, "color" => "Black", "holder_product_picture" =>"12305560040-01-w.jpg",  "product_picture" => "12305560040-a4o.jpg", "size" => "42", "quantity" => 20],
                        // Product 56 - Contrast studded sole trainers
                        ["product_id" => 56, "color" => "Black", "holder_product_picture" =>"12310560040-05-w.jpg",  "product_picture" => "12310560040-a4o.jpg", "size" => "40", "quantity" => 20],
                        ["product_id" => 56, "color" => "Black", "holder_product_picture" =>"12310560040-05-w.jpg",  "product_picture" => "12310560040-a4o.jpg", "size" => "41", "quantity" => 20],
                        ["product_id" => 56, "color" => "Black", "holder_product_picture" =>"12310560040-05-w.jpg",  "product_picture" => "12310560040-a4o.jpg", "size" => "42", "quantity" => 20],
                       
            
                        // Product 57 - Contrast sneakers
                        ["product_id" => 57, "color" => "Black/White", "holder_product_picture" =>"12375560202-b1o.jpg",  "product_picture" => "12375560202-a4o.jpg", "size" => "40", "quantity" => 20],
                        ["product_id" => 57, "color" => "Black/White", "holder_product_picture" =>"12375560202-b1o.jpg",  "product_picture" => "12375560202-a4o.jpg", "size" => "41", "quantity" => 20],
                        ["product_id" => 57, "color" => "Black/White", "holder_product_picture" =>"12375560202-b1o.jpg",  "product_picture" => "12375560202-a4o.jpg", "size" => "42", "quantity" => 20],
                        ["product_id" => 57, "color" => "Blue/White", "holder_product_picture" =>"12375560202-b1o.jpg",  "product_picture" => "12375560202-a4o.jpg", "size" => "40", "quantity" => 20],
                        ["product_id" => 57, "color" => "Blue/White", "holder_product_picture" =>"12375560202-b1o.jpg",  "product_picture" => "12375560202-a4o.jpg", "size" => "41", "quantity" => 20],
                        ["product_id" => 57, "color" => "Blue/White", "holder_product_picture" =>"12375560202-b1o.jpg",  "product_picture" => "12375560202-a4o.jpg", "size" => "42", "quantity" => 20],
            
                        // Product 58 - Chunky LEATHER techno trainers
                        ["product_id" => 58, "color" => "Roman Coffee", "holder_product_picture" =>"12450560131-b1o.jpg",  "product_picture" => "12450560131-a4o.jpg", "size" => "40", "quantity" => 20],
                        ["product_id" => 58, "color" => "Roman Coffee", "holder_product_picture" =>"12450560131-b1o.jpg",  "product_picture" => "12450560131-a4o.jpg", "size" => "41", "quantity" => 20],
                        ["product_id" => 58, "color" => "Roman Coffee", "holder_product_picture" =>"12450560131-b1o.jpg",  "product_picture" => "12450560131-a4o.jpg", "size" => "42", "quantity" => 20],
                        ["product_id" => 58, "color" => "Roman Coffee", "holder_product_picture" =>"12450560131-b1o.jpg",  "product_picture" => "12450560131-a4o.jpg", "size" => "40", "quantity" => 20],
                        ["product_id" => 58, "color" => "Roman Coffee", "holder_product_picture" =>"12450560131-b1o.jpg",  "product_picture" => "12450560131-a4o.jpg", "size" => "41", "quantity" => 20],
                        ["product_id" => 58, "color" => "Roman Coffee", "holder_product_picture" =>"12450560131-b1o.jpg",  "product_picture" => "12450560131-a4o.jpg", "size" => "42", "quantity" => 20],
            
                        // Product 59 - Chunky skater trainers
                        ["product_id" => 59, "color" => "Black", "holder_product_picture" =>"12448460040-w.jpg",  "product_picture" => "12448460040-a4o.jpg", "size" => "40", "quantity" => 20],
                        ["product_id" => 59, "color" => "Black", "holder_product_picture" =>"12448460040-w.jpg",  "product_picture" => "12448460040-a4o.jpg", "size" => "41", "quantity" => 20],
                        ["product_id" => 59, "color" => "Black", "holder_product_picture" =>"12448460040-w.jpg",  "product_picture" => "12448460040-a4o.jpg", "size" => "42", "quantity" => 20],
                        ["product_id" => 59, "color" => "white", "holder_product_picture" =>"12454360001-01-b1o.jpg",  "product_picture" => "2454360001_2_4_0.jpg", "size" => "40", "quantity" => 20],
                        ["product_id" => 59, "color" => "white", "holder_product_picture" =>"12454360001-01-b1o.jpg",  "product_picture" => "2454360001_2_4_0.jpg", "size" => "41", "quantity" => 20],
                        ["product_id" => 59, "color" => "white", "holder_product_picture" =>"12454360001-01-b1o.jpg",  "product_picture" => "2454360001_2_4_0.jpg", "size" => "42", "quantity" => 20],
            
                        // Product 60 - LEATHER skater trainers
                        ["product_id" => 60, "color" => "Black", "holder_product_picture" =>"12489560040-b3o.jpg",  "product_picture" => "12489560040-a4o.jpg", "size" => "40", "quantity" => 20],
                        ["product_id" => 60, "color" => "Black", "holder_product_picture" =>"12489560040-b3o.jpg",  "product_picture" => "12489560040-a4o.jpg", "size" => "41", "quantity" => 20],
                        ["product_id" => 60, "color" => "Black", "holder_product_picture" =>"12489560040-b3o.jpg",  "product_picture" => "12489560040-a4o.jpg", "size" => "42", "quantity" => 20],
                       
            
                        // Product 61 - Minimalist lace-up trainers
                        ["product_id" => 61, "color" => "White", "holder_product_picture" =>"12488560001-b1o.jpg",  "product_picture" => "12488560001-a4o.jpg", "size" => "40", "quantity" => 20],
                        ["product_id" => 61, "color" => "White", "holder_product_picture" =>"12488560001-b1o.jpg",  "product_picture" => "12488560001-a4o.jpg", "size" => "41", "quantity" => 20],
                        ["product_id" => 61, "color" => "White", "holder_product_picture" =>"12488560001-b1o.jpg",  "product_picture" => "12488560001-a4o.jpg", "size" => "42", "quantity" => 20],
                        
            
                        // Product 62 - Multi-layered trainers
                        ["product_id" => 62, "color" => "White", "holder_product_picture" =>"12474560001-b1o.jpg",  "product_picture" => "12474560001-a4o.jpg", "size" => "40", "quantity" => 20],
                        ["product_id" => 62, "color" => "White", "holder_product_picture" =>"12474560001-b1o.jpg",  "product_picture" => "12474560001-a4o.jpg", "size" => "41", "quantity" => 20],
                        ["product_id" => 62, "color" => "White", "holder_product_picture" =>"12474560001-b1o.jpg",  "product_picture" => "12474560001-a4o.jpg", "size" => "42", "quantity" => 20],
                        
            
                        // Product 63 - Multi-piece skate trainers
                        ["product_id" => 63, "color" => "Black", "holder_product_picture" =>"1747087056_68226ed09a54b.webp",  "product_picture" => "12487560040-a4o.jpg", "size" => "40", "quantity" => 20],
                        ["product_id" => 63, "color" => "Black", "holder_product_picture" =>"1747087056_68226ed09a54b.webp",  "product_picture" => "12487560040-a4o.jpg", "size" => "41", "quantity" => 20],
                        ["product_id" => 63, "color" => "Black", "holder_product_picture" =>"1747087056_68226ed09a54b.webp",  "product_picture" => "12487560040-a4o.jpg", "size" => "42", "quantity" => 20],
                        ["product_id" => 63, "color" => "Pale Oyster", "holder_product_picture" =>"12465560131-b1o.jpg",  "product_picture" => "12465560131-a4o.jpg", "size" => "40", "quantity" => 20],
                        ["product_id" => 63, "color" => "Pale Oyster", "holder_product_picture" =>"12465560131-b1o.jpg",  "product_picture" => "12465560131-a4o.jpg", "size" => "41", "quantity" => 20],
                        ["product_id" => 63, "color" => "Pale Oyster", "holder_product_picture" =>"12465560131-b1o.jpg",  "product_picture" => "12465560131-a4o.jpg", "size" => "42", "quantity" => 20],
            
                        // Product 64 - Retro chunky trainers
                        ["product_id" => 64, "color" => "black", "holder_product_picture" =>"12481560040-01-b1o.jpg",  "product_picture" => "12481560040-01-a4o.jpg", "size" => "40", "quantity" => 20],
                        ["product_id" => 64, "color" => "black", "holder_product_picture" =>"12481560040-01-b1o.jpg",  "product_picture" => "12481560040-01-a4o.jpg", "size" => "41", "quantity" => 20],
                        ["product_id" => 64, "color" => "black", "holder_product_picture" =>"12481560040-01-b1o.jpg",  "product_picture" => "12481560040-01-a4o.jpg", "size" => "42", "quantity" => 20],
            
                        // Product 65 - Retro trainers
                        ["product_id" => 65, "color" => "white", "holder_product_picture" =>"12478560001-01-b1o.jpg",  "product_picture" => "12478560001-01-a4o.jpg", "size" => "40", "quantity" => 20],
                        ["product_id" => 65, "color" => "White", "holder_product_picture" =>"12478560001-01-b1o.jpg",  "product_picture" => "12478560001-01-a4o.jpg", "size" => "41", "quantity" => 20],
                        ["product_id" => 65, "color" => "White", "holder_product_picture" =>"12478560001-01-b1o.jpg",  "product_picture" => "12478560001-01-a4o.jpg", "size" => "42", "quantity" => 20],
                       
            
                        // Product 66 - Asymmetric midi dress with ring detail
                        ["product_id" => 66, "color" => "Black", "holder_product_picture" =>"00699187800-a3o.jpg",  "product_picture" => "00699187800-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 66, "color" => "Black", "holder_product_picture" =>"00699187800-a3o.jpg",  "product_picture" => "00699187800-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 66, "color" => "Black", "holder_product_picture" =>"00699187800-a3o.jpg",  "product_picture" => "00699187800-a4o.jpg", "size" => "L", "quantity" => 20],
                        
            
                        // Product 67 - Asymmetric tulle midi dress
                        ["product_id" => 67, "color" => "black", "holder_product_picture" =>"00582222700-p.jpg",  "product_picture" => "00582222700-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 67, "color" => "black", "holder_product_picture" =>"00582222700-p.jpg",  "product_picture" => "00582222700-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 67, "color" => "black", "holder_product_picture" =>"00582222700-p.jpg",  "product_picture" => "00582222700-a4o.jpg", "size" => "L", "quantity" => 20],
                        
            
                        // Product 68 - Halter mini dress with ring detail
                        ["product_id" => 68, "color" => "Thunder", "holder_product_picture" =>"00650693700-p.jpg",  "product_picture" => "00650693700-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 68, "color" => "Thunder", "holder_product_picture" =>"00650693700-p.jpg",  "product_picture" => "00650693700-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 68, "color" => "Thunder", "holder_product_picture" =>"00650693700-p.jpg",  "product_picture" => "00650693700-a4o.jpg", "size" => "L", "quantity" => 20],
                        
            
                        // Product 69 - Printed waffle-knit mini dress
                        ["product_id" => 69, "color" => "White", "holder_product_picture" =>"00931028060-a1t.jpg",  "product_picture" => "00931028060-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 69, "color" => "White", "holder_product_picture" =>"00931028060-a1t.jpg",  "product_picture" => "00931028060-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 69, "color" => "White", "holder_product_picture" =>"00931028060-a1t.jpg",  "product_picture" => "00931028060-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 69, "color" => "red", "holder_product_picture" =>"00931028600-a3o.jpg",  "product_picture" => "00931028600-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 69, "color" => "red", "holder_product_picture" =>"00931028600-a3o.jpg",  "product_picture" => "00931028600-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 69, "color" => "red", "holder_product_picture" =>"00931028600-a3o.jpg",  "product_picture" => "00931028600-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 70 - Ruffled mini dress
                        ["product_id" => 70, "color" => "white", "holder_product_picture" =>"00742494711-a3o.jpg",  "product_picture" => "00742494711-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 70, "color" => "white", "holder_product_picture" =>"00742494711-a3o.jpg",  "product_picture" => "00742494711-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 70, "color" => "white", "holder_product_picture" =>"00742494711-a3o.jpg",  "product_picture" => "00742494711-a4o.jpg", "size" => "L", "quantity" => 20],
                        
            
                        // Product 71 - Textured printed midi dress
                        ["product_id" => 71, "color" => "Grey Cloud", "holder_product_picture" =>"00752692712-a2d.jpg",  "product_picture" => "00752015712-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 71, "color" => "Grey Cloud", "holder_product_picture" =>"00752692712-a2d.jpg",  "product_picture" => "00752015712-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 71, "color" => "Grey Cloud", "holder_product_picture" =>"00752692712-a2d.jpg",  "product_picture" => "00752015712-a4o.jpg", "size" => "L", "quantity" => 20],
                        
            
                        // Product 72 - Buttoned blazer
                        ["product_id" => 72, "color" => "white", "holder_product_picture" =>"00732777250-p.jpg",  "product_picture" => "00732777250-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 72, "color" => "white", "holder_product_picture" =>"00732777250-p.jpg",  "product_picture" => "00732777250-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 72, "color" => "white", "holder_product_picture" =>"00732777250-p.jpg",  "product_picture" => "00732777250-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 72, "color" => "dark", "holder_product_picture" =>"01490752401-p.jpg",  "product_picture" => "01490752401-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 72, "color" => "dark", "holder_product_picture" =>"01490752401-p.jpg",  "product_picture" => "01490752401-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 72, "color" => "dark", "holder_product_picture" =>"01490752401-p.jpg",  "product_picture" => "01490752401-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 72, "color" => "silver", "holder_product_picture" =>"01490752812-p.jpg",  "product_picture" => "01490752812-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 72, "color" => "silver", "holder_product_picture" =>"01490752812-p.jpg",  "product_picture" => "01490752812-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 72, "color" => "silver", "holder_product_picture" =>"01490752812-p.jpg",  "product_picture" => "01490752812-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 73 - Cropped denim jacket
                        ["product_id" => 73, "color" => "dark", "holder_product_picture" =>"01397335401-a7o.jpg",  "product_picture" => "01397335401-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 73, "color" => "dark", "holder_product_picture" =>"01397335401-a7o.jpg",  "product_picture" => "01397335401-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 73, "color" => "dark", "holder_product_picture" =>"01397335401-a7o.jpg",  "product_picture" => "01397335401-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 73, "color" => "Geyser", "holder_product_picture" =>"01397335433-a5o.jpg",  "product_picture" => "01397335433-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 73, "color" => "Geyser", "holder_product_picture" =>"01397335433-a5o.jpg",  "product_picture" => "01397335433-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 73, "color" => "Geyser", "holder_product_picture" =>"01397335433-a5o.jpg",  "product_picture" => "01397335433-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 74 - Faux leather oversize jacket
                        ["product_id" => 74, "color" => "Black", "holder_product_picture" =>"01524718800-a2d.jpg",  "product_picture" => "01524718800-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 74, "color" => "Black", "holder_product_picture" =>"01524718800-a2d.jpg",  "product_picture" => "01524718800-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 74, "color" => "Black", "holder_product_picture" =>"01524718800-a2d.jpg",  "product_picture" => "01524718800-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 74, "color" => "Congo Brown", "holder_product_picture" =>"01524719605-a3o.jpg",  "product_picture" => "01524719605-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 74, "color" => "Congo Brown", "holder_product_picture" =>"01524719605-a3o.jpg",  "product_picture" => "01524719605-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 74, "color" => "Congo Brown", "holder_product_picture" =>"01524719605-a3o.jpg",  "product_picture" => "01524719605-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 74, "color" => "Black Cow", "holder_product_picture" =>"01524718700-28-a9o.jpg",  "product_picture" => "01524741700-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 74, "color" => "Black Cow", "holder_product_picture" =>"01524718700-28-a9o.jpg",  "product_picture" => "01524741700-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 74, "color" => "Black Cow", "holder_product_picture" =>"01524718700-28-a9o.jpg",  "product_picture" => "01524741700-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 75 - Soft cropped jacket
                        ["product_id" => 75, "color" => "White Rock", "holder_product_picture" =>"06621742712-a3o.jpg",  "product_picture" => "06621742712-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 75, "color" => "White Rock", "holder_product_picture" =>"06621742712-a3o.jpg",  "product_picture" => "06621742712-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 75, "color" => "White Rock", "holder_product_picture" =>"06621742712-a3o.jpg",  "product_picture" => "06621742712-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 75, "color" => "black", "holder_product_picture" =>"06621741800-p.jpg",  "product_picture" => "06621706800-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 75, "color" => "black", "holder_product_picture" =>"06621741800-p.jpg",  "product_picture" => "06621706800-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 75, "color" => "black", "holder_product_picture" =>"06621741800-p.jpg",  "product_picture" => "06621706800-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 75, "color" => "Davy Grey", "holder_product_picture" =>"06621706807-a5o.jpg",  "product_picture" => "06621706807-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 75, "color" => "Davy Grey", "holder_product_picture" =>"06621706807-a5o.jpg",  "product_picture" => "06621706807-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 75, "color" => "Davy Grey", "holder_product_picture" =>"06621706807-a5o.jpg",  "product_picture" => "06621706807-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 76 - Boyfriend jeans
                        ["product_id" => 76, "color" => "Blue", "holder_product_picture" =>"05023666432-p.jpg",  "product_picture" => "05023335432-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 76, "color" => "Blue", "holder_product_picture" =>"05023666432-p.jpg",  "product_picture" => "05023335432-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 76, "color" => "Blue", "holder_product_picture" =>"05023666432-p.jpg",  "product_picture" => "05023335432-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 76, "color" => "grey", "holder_product_picture" =>"05023666811-a2d.jpg",  "product_picture" => "05023666811-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 76, "color" => "grey", "holder_product_picture" =>"05023666811-a2d.jpg",  "product_picture" => "05023666811-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 76, "color" => "grey", "holder_product_picture" =>"05023666811-a2d.jpg",  "product_picture" => "05023666811-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 76, "color" => "Black", "holder_product_picture" =>"05023666800-a7o.jpg",  "product_picture" => "05023666800-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 76, "color" => "Black", "holder_product_picture" =>"05023666800-a7o.jpg",  "product_picture" => "05023666800-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 76, "color" => "Black", "holder_product_picture" =>"05023666800-a7o.jpg",  "product_picture" => "05023666800-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 77 - Flared jeans
                        ["product_id" => 77, "color" => "Slate Blue", "holder_product_picture" =>"00017211428-a2d.jpg",  "product_picture" => "00017211428-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 77, "color" => "Slate Blue", "holder_product_picture" =>"00017211428-a2d.jpg",  "product_picture" => "00017211428-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 77, "color" => "Slate Blue", "holder_product_picture" =>"00017211428-a2d.jpg",  "product_picture" => "00017211428-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 77, "color" => "ghost", "holder_product_picture" =>"00017211433-p.jpg",  "product_picture" => "00017211433-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 77, "color" => "ghost", "holder_product_picture" =>"00017211433-p.jpg",  "product_picture" => "00017211433-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 77, "color" => "ghost", "holder_product_picture" =>"00017211433-p.jpg",  "product_picture" => "00017211433-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 77, "color" => "black", "holder_product_picture" =>"00017211800-a3o.jpg",  "product_picture" => "00017211800-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 77, "color" => "black", "holder_product_picture" =>"00017211800-a3o.jpg",  "product_picture" => "00017211800-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 77, "color" => "black", "holder_product_picture" =>"00017211800-a3o.jpg",  "product_picture" => "00017211800-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 78 - Multi-pocket cargo jeans
                        ["product_id" => 78, "color" => "Cloudy Blue", "holder_product_picture" =>"00010534428-a1t.jpg",  "product_picture" => "00010534428-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 78, "color" => "Cloudy Blue", "holder_product_picture" =>"00010534428-a1t.jpg",  "product_picture" => "00010534428-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 78, "color" => "Cloudy Blue", "holder_product_picture" =>"00010534428-a1t.jpg",  "product_picture" => "00010534428-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 78, "color" => "Black", "holder_product_picture" =>"00010534800-p.jpg",  "product_picture" => "00010534800-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 78, "color" => "Black", "holder_product_picture" =>"00010534800-p.jpg",  "product_picture" => "00010534800-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 78, "color" => "Black", "holder_product_picture" =>"00010534800-p.jpg",  "product_picture" => "00010534800-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 78, "color" => "Geyser", "holder_product_picture" =>"00010534433-p.jpg",  "product_picture" => "00010534433-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 78, "color" => "Geyser", "holder_product_picture" =>"00010534433-p.jpg",  "product_picture" => "00010534433-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 78, "color" => "Geyser", "holder_product_picture" =>"00010534433-p.jpg",  "product_picture" => "00010534433-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 79 - Shimmery '90s wide-leg jeans
                        ["product_id" => 79, "color" => "ghost", "holder_product_picture" =>"00014156428-a3f.jpg",  "product_picture" => "00014156428-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 79, "color" => "ghost", "holder_product_picture" =>"00014156428-a3f.jpg",  "product_picture" => "00014156428-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 79, "color" => "ghost", "holder_product_picture" =>"00014156428-a3f.jpg",  "product_picture" => "00014156428-a4o.jpg", "size" => "L", "quantity" => 20],
                        
            
                        // Product 80 - Studded barrel jeans
                        ["product_id" => 80, "color" => "Dark Blue Grey", "holder_product_picture" =>"00311074401-p.jpg",  "product_picture" => "00311074401-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 80, "color" => "Dark Blue Grey", "holder_product_picture" =>"00311074401-p.jpg",  "product_picture" => "00311074401-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 80, "color" => "Dark Blue Grey", "holder_product_picture" =>"00311074401-p.jpg",  "product_picture" => "00311074401-a4o.jpg", "size" => "L", "quantity" => 20],
                        
            
                        // Product 81 - Wide-leg low-waist jeans
                        ["product_id" => 81, "color" => "Rock Blue", "holder_product_picture" =>"00019180428-p.jpg",  "product_picture" => "00019180428-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 81, "color" => "Rock Blue", "holder_product_picture" =>"00019180428-p.jpg",  "product_picture" => "00019180428-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 81, "color" => "Rock Blue", "holder_product_picture" =>"00019180428-p.jpg",  "product_picture" => "00019180428-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 81, "color" => "Sandstone", "holder_product_picture" =>"00019180809-a1t.jpg",  "product_picture" => "00019180809-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 81, "color" => "Sandstone", "holder_product_picture" =>"00019180809-a1t.jpg",  "product_picture" => "00019180809-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 81, "color" => "Sandstone", "holder_product_picture" =>"00019180809-a1t.jpg",  "product_picture" => "00019180809-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 81, "color" => "Grey Chateau", "holder_product_picture" =>"00019180811-p.jpg",  "product_picture" => "00019180811-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 81, "color" => "Grey Chateau", "holder_product_picture" =>"00019180811-p.jpg",  "product_picture" => "00019180811-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 81, "color" => "Grey Chateau", "holder_product_picture" =>"00019180811-p.jpg",  "product_picture" => "00019180811-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 82 - Fitted shirt with flared sleeves
                        ["product_id" => 82, "color" => "White", "holder_product_picture" =>"52c8be71a35e431c7633e46fabf44285-6271741250_2_18_0.jpg",  "product_picture" => "06271692250-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 82, "color" => "White", "holder_product_picture" =>"52c8be71a35e431c7633e46fabf44285-6271741250_2_18_0.jpg",  "product_picture" => "06271692250-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 82, "color" => "White", "holder_product_picture" =>"52c8be71a35e431c7633e46fabf44285-6271741250_2_18_0.jpg",  "product_picture" => "06271692250-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 82, "color" => "black", "holder_product_picture" =>"01149710800-p.jpg",  "product_picture" => "01149710800-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 82, "color" => "Black", "holder_product_picture" =>"01149710800-p.jpg",  "product_picture" => "01149710800-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 82, "color" => "Black", "holder_product_picture" =>"01149710800-p.jpg",  "product_picture" => "01149710800-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 82, "color" => "Ship Grey", "holder_product_picture" =>"06271741401-a9o.jpg",  "product_picture" => "06271710401-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 82, "color" => "Ship Grey", "holder_product_picture" =>"06271741401-a9o.jpg",  "product_picture" => "06271710401-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 82, "color" => "Ship Grey", "holder_product_picture" =>"06271741401-a9o.jpg",  "product_picture" => "06271710401-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 82, "color" => "White Rock", "holder_product_picture" =>"06271741902-p.jpg",  "product_picture" => "06271777902-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 82, "color" => "White Rock", "holder_product_picture" =>"06271741902-p.jpg",  "product_picture" => "06271777902-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 82, "color" => "White Rock", "holder_product_picture" =>"06271741902-p.jpg",  "product_picture" => "06271777902-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 83 - Long sleeve oversize poplin shirt
                        ["product_id" => 83, "color" => "Wild Blue Yonder", "holder_product_picture" =>"06287028477-a2d.jpg",  "product_picture" => "06287028477-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 83, "color" => "Wild Blue Yonder", "holder_product_picture" =>"06287028477-a2d.jpg",  "product_picture" => "06287028477-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 83, "color" => "Wild Blue Yonder", "holder_product_picture" =>"06287028477-a2d.jpg",  "product_picture" => "06287028477-a4o.jpg", "size" => "L", "quantity" => 20],
                        
            
                        // Product 84 - Off-the-shoulder blouse with tie detail
                        ["product_id" => 84, "color" => "Geyser", "holder_product_picture" =>"01150207103-p.jpg",  "product_picture" => "01150207103-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 84, "color" => "Geyser", "holder_product_picture" =>"01150207103-p.jpg",  "product_picture" => "01150207103-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 84, "color" => "Geyser", "holder_product_picture" =>"01150207103-p.jpg",  "product_picture" => "01150207103-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 84, "color" => "White", "holder_product_picture" =>"01150207712-p.jpg",  "product_picture" => "01150207712-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 84, "color" => "White", "holder_product_picture" =>"01150207712-p.jpg",  "product_picture" => "01150207712-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 84, "color" => "White", "holder_product_picture" =>"01150207712-p.jpg",  "product_picture" => "01150207712-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 84, "color" => "Woody Brown", "holder_product_picture" =>"01150207700-p.jpg",  "product_picture" => "01150207700-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 84, "color" => "Woody Brown", "holder_product_picture" =>"01150207700-p.jpg",  "product_picture" => "01150207700-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 84, "color" => "Woody Brown", "holder_product_picture" =>"01150207700-p.jpg",  "product_picture" => "01150207700-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 85 - Short sleeve shirt with Peter pan collar
                        ["product_id" => 85, "color" => "White", "holder_product_picture" =>"01161692250-p.jpg",  "product_picture" => "01161692250-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 85, "color" => "White", "holder_product_picture" =>"01161692250-p.jpg",  "product_picture" => "01161692250-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 85, "color" => "White", "holder_product_picture" =>"01161692250-p.jpg",  "product_picture" => "01161692250-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 85, "color" => "Lavender Mist", "holder_product_picture" =>"01161692400-28-a9o.jpg",  "product_picture" => "01161692400-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 85, "color" => "Lavender Mist", "holder_product_picture" =>"01161692400-28-a9o.jpg",  "product_picture" => "01161692400-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 85, "color" => "Lavender Mist", "holder_product_picture" =>"01161692400-28-a9o.jpg",  "product_picture" => "01161692400-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 86 - Textured rustic short sleeve shirt
                        ["product_id" => 86, "color" => "pink", "holder_product_picture" =>"01152710141-a3o.jpg",  "product_picture" => "01152335141-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 86, "color" => "pink", "holder_product_picture" =>"01152710141-a3o.jpg",  "product_picture" => "01152335141-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 86, "color" => "pink", "holder_product_picture" =>"01152710141-a3o.jpg",  "product_picture" => "01152335141-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 86, "color" => "white", "holder_product_picture" =>"01152710250-a3o.jpg",  "product_picture" => "01152335250-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 86, "color" => "white", "holder_product_picture" =>"01152710250-a3o.jpg",  "product_picture" => "01152335250-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 86, "color" => "white", "holder_product_picture" =>"01152710250-a3o.jpg",  "product_picture" => "01152335250-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 87 - Buttoned cardigan with top
                        ["product_id" => 87, "color" => "Tobacco Brown", "holder_product_picture" =>"01759714730-a1t.jpg",  "product_picture" => "01759714730-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 87, "color" => "Tobacco Brown", "holder_product_picture" =>"01759714730-a1t.jpg",  "product_picture" => "01759714730-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 87, "color" => "Tobacco Brown", "holder_product_picture" =>"01759714730-a1t.jpg",  "product_picture" => "01759714730-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 87, "color" => "Gravel", "holder_product_picture" =>"01759714829-a3o.jpg",  "product_picture" => "01759714829-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 87, "color" => "Gravel", "holder_product_picture" =>"01759714829-a3o.jpg",  "product_picture" => "01759714829-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 87, "color" => "Gravel", "holder_product_picture" =>"01759714829-a3o.jpg",  "product_picture" => "01759714829-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 88 - Cable-knit Bardot cardigan with zip
                        ["product_id" => 88, "color" => "White", "holder_product_picture" =>"06982596712-p.jpg",  "product_picture" => "06982596712-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 88, "color" => "White", "holder_product_picture" =>"06982596712-p.jpg",  "product_picture" => "06982596712-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 88, "color" => "White", "holder_product_picture" =>"06982596712-p.jpg",  "product_picture" => "06982596712-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 88, "color" => "Gravel", "holder_product_picture" =>"06982596802-p.jpg",  "product_picture" => "06982596802-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 88, "color" => "Gravel", "holder_product_picture" =>"06982596802-p.jpg",  "product_picture" => "06982596802-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 88, "color" => "Gravel", "holder_product_picture" =>"06982596802-p.jpg",  "product_picture" => "06982596802-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 89 - Cable-knit zip cardigan with polo collar
                        ["product_id" => 89, "color" => "dark", "holder_product_picture" =>"01770376400-p.jpg",  "product_picture" => "01770376400-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 89, "color" => "dark", "holder_product_picture" =>"01770376400-p.jpg",  "product_picture" => "01770376400-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 89, "color" => "dark", "holder_product_picture" =>"01770376400-p.jpg",  "product_picture" => "01770376400-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 89, "color" => "white", "holder_product_picture" =>"01770376712-p.jpg",  "product_picture" => "01770376712-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 89, "color" => "white", "holder_product_picture" =>"01770376712-p.jpg",  "product_picture" => "01770376712-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 89, "color" => "white", "holder_product_picture" =>"01770376712-p.jpg",  "product_picture" => "01770376712-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 90 - Cropped V-neck sweater
                        ["product_id" => 90, "color" => "Albescent White", "holder_product_picture" =>"07262686711-a3o.jpg",  "product_picture" => "07262686711-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 90, "color" => "Albescent White", "holder_product_picture" =>"07262686711-a3o.jpg",  "product_picture" => "07262686711-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 90, "color" => "Albescent White", "holder_product_picture" =>"07262686711-a3o.jpg",  "product_picture" => "07262686711-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 90, "color" => "Grey Goose", "holder_product_picture" =>"07262686802-a5o.jpg",  "product_picture" => "07262686802-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 90, "color" => "Grey Goose", "holder_product_picture" =>"07262686802-a5o.jpg",  "product_picture" => "07262686802-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 90, "color" => "Grey Goose", "holder_product_picture" =>"07262686802-a5o.jpg",  "product_picture" => "07262686802-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 91 - Oversize V-neck sweater
                        ["product_id" => 91, "color" => "Cinder", "holder_product_picture" =>"07108686400-p.jpg",  "product_picture" => "07108686400-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 91, "color" => "Cinder", "holder_product_picture" =>"07108686400-p.jpg",  "product_picture" => "07108686400-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 91, "color" => "Cinder", "holder_product_picture" =>"07108686400-p.jpg",  "product_picture" => "07108686400-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 91, "color" => "white", "holder_product_picture" =>"07108686712-p.jpg",  "product_picture" => "07108686712-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 91, "color" => "white", "holder_product_picture" =>"07108686712-p.jpg",  "product_picture" => "07108686712-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 91, "color" => "white", "holder_product_picture" =>"07108686712-p.jpg",  "product_picture" => "07108686712-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 92 - Round neck sweater
                        ["product_id" => 92, "color" => "Cinder", "holder_product_picture" =>"07112376400-a11o.jpg",  "product_picture" => "07112777400-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 92, "color" => "Cinder", "holder_product_picture" =>"07112376400-a11o.jpg",  "product_picture" => "07112777400-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 92, "color" => "Cinder", "holder_product_picture" =>"07112376400-a11o.jpg",  "product_picture" => "07112777400-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 92, "color" => "Cocoa Bean", "holder_product_picture" =>"07112777605-p.jpg",  "product_picture" => "07112777605-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 92, "color" => "Cocoa Bean", "holder_product_picture" =>"07112777605-p.jpg",  "product_picture" => "07112777605-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 92, "color" => "Cocoa Bean", "holder_product_picture" =>"07112777605-p.jpg",  "product_picture" => "07112777605-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 93 - Rustic cropped openwork sweater
                        ["product_id" => 93, "color" => "Mushroom", "holder_product_picture" =>"02168376830-a3o.jpg",  "product_picture" => "02168376830-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 93, "color" => "Mushroom", "holder_product_picture" =>"02168376830-a3o.jpg",  "product_picture" => "02168376830-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 93, "color" => "Mushroom", "holder_product_picture" =>"02168376830-a3o.jpg",  "product_picture" => "02168376830-a4o.jpg", "size" => "L", "quantity" => 20],
                        
            
                        // Product 94 - Cars hoodie
                        ["product_id" => 94, "color" => "White", "holder_product_picture" =>"07077033250-a2d.jpg",  "product_picture" => "07077033250-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 94, "color" => "White", "holder_product_picture" =>"07077033250-a2d.jpg",  "product_picture" => "07077033250-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 94, "color" => "White", "holder_product_picture" =>"07077033250-a2d.jpg",  "product_picture" => "07077033250-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 95 - Corvette hoodie
                        ["product_id" => 95, "color" => "Black Eel", "holder_product_picture" =>"01986309809-a1t.jpg",  "product_picture" => "01986309809-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 95, "color" => "Black Eel", "holder_product_picture" =>"01986309809-a1t.jpg",  "product_picture" => "01986309809-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 95, "color" => "Black Eel", "holder_product_picture" =>"01986309809-a1t.jpg",  "product_picture" => "01986309809-a4o.jpg", "size" => "L", "quantity" => 20],
                        
            
                        // Product 96 - Oversize hoodie
                        ["product_id" => 96, "color" => "white", "holder_product_picture" =>"01892727812-a3o.jpg",  "product_picture" => "01892727812-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 96, "color" => "white", "holder_product_picture" =>"01892727812-a3o.jpg",  "product_picture" => "01892727812-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 96, "color" => "white", "holder_product_picture" =>"01892727812-a3o.jpg",  "product_picture" => "01892727812-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 96, "color" => "Antique White", "holder_product_picture" =>"01892727300-p.jpg",  "product_picture" => "01892727300-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 96, "color" => "Antique White", "holder_product_picture" =>"01892727300-p.jpg",  "product_picture" => "01892727300-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 96, "color" => "Antique White", "holder_product_picture" =>"01892727300-p.jpg",  "product_picture" => "01892727300-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 97 - Printed hoodie
                        ["product_id" => 97, "color" => "Spring Wood", "holder_product_picture" => "02155033712-a2d.jpg", "product_picture" => "02155033712-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 97, "color" => "Spring Wood", "holder_product_picture" => "02155033712-a2d.jpg", "product_picture" => "02155033712-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 97, "color" => "Spring Wood", "holder_product_picture" => "02155033712-a2d.jpg", "product_picture" => "02155033712-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 97, "color" => "Mercury", "holder_product_picture" => "02155173812-p.jpg", "product_picture" => "02155173812-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 97, "color" => "Mercury", "holder_product_picture" => "02155173812-p.jpg", "product_picture" => "02155173812-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 97, "color" => "Mercury", "holder_product_picture" => "02155173812-p.jpg", "product_picture" => "02155173812-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 97, "color" => "White", "holder_product_picture" => "02155189959-a2d.jpg", "product_picture" => "02155189959-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 97, "color" => "White", "holder_product_picture" => "02155189959-a2d.jpg", "product_picture" => "02155189959-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 97, "color" => "White", "holder_product_picture" => "02155189959-a2d.jpg", "product_picture" => "02155189959-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 98 - Ripped hoodie
                        ["product_id" => 98, "color" => "Lavender Mist", "holder_product_picture" => "01898187406-a2d.jpg", "product_picture" => "01898187406-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 98, "color" => "Lavender Mist", "holder_product_picture" => "01898187406-a2d.jpg", "product_picture" => "01898187406-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 98, "color" => "Lavender Mist", "holder_product_picture" => "01898187406-a2d.jpg", "product_picture" => "01898187406-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 99 - Zip-up hoodie
                        ["product_id" => 99, "color" => "Link Water", "holder_product_picture" => "01820727406-a3o.jpg", "product_picture" => "01820727406-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 99, "color" => "Link Water", "holder_product_picture" => "01820727406-a3o.jpg", "product_picture" => "01820727406-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 99, "color" => "Link Water", "holder_product_picture" => "01820727406-a3o.jpg", "product_picture" => "01820727406-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 99, "color" => "Fantasy", "holder_product_picture" => "01820727712-p.jpg", "product_picture" => "01820727712-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 99, "color" => "Fantasy", "holder_product_picture" => "01820727712-p.jpg", "product_picture" => "01820727712-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 99, "color" => "Fantasy", "holder_product_picture" => "01820727712-p.jpg", "product_picture" => "01820727712-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 99, "color" => "white", "holder_product_picture" => "01820727812-a9o.jpg", "product_picture" => "01820727812-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 99, "color" => "white", "holder_product_picture" => "01820727812-a9o.jpg", "product_picture" => "01820727812-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 99, "color" => "white", "holder_product_picture" => "01820727812-a9o.jpg", "product_picture" => "01820727812-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 100 - Linen blend trousers with an elasticated waistband
                        ["product_id" => 100, "color" => "Bistre", "holder_product_picture" => "00093741700-28-a9o.jpg", "product_picture" => "00093741700-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 100, "color" => "Bistre", "holder_product_picture" => "00093741700-28-a9o.jpg", "product_picture" => "00093741700-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 100, "color" => "Bistre", "holder_product_picture" => "00093741700-28-a9o.jpg", "product_picture" => "00093741700-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 100, "color" => "White", "holder_product_picture" => "00093741711-a3o.jpg", "product_picture" => "00093741711-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 100, "color" => "White", "holder_product_picture" => "00093741711-a3o.jpg", "product_picture" => "00093741711-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 100, "color" => "White", "holder_product_picture" => "00093741711-a3o.jpg", "product_picture" => "00093741711-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 101 - Plush barrel printed trousers
                        ["product_id" => 101, "color" => "Quill Grey", "holder_product_picture" => "05089033711-p.jpg", "product_picture" => "05089057711-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 101, "color" => "Quill Grey", "holder_product_picture" => "05089033711-p.jpg", "product_picture" => "05089057711-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 101, "color" => "Quill Grey", "holder_product_picture" => "05089033711-p.jpg", "product_picture" => "05089057711-a4o.jpg", "size" => "L", "quantity" => 20],
                        
            
                        // Product 102 - Plush barrel trousers
                        ["product_id" => 102, "color" => "English Walnut", "holder_product_picture" => "00097478700-28-a11o.jpg", "product_picture" => "00097478700-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 102, "color" => "English Walnut", "holder_product_picture" => "00097478700-28-a11o.jpg", "product_picture" => "00097478700-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 102, "color" => "English Walnut", "holder_product_picture" => "00097478700-28-a11o.jpg", "product_picture" => "00097478700-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 102, "color" => "Lavender Pinocchio", "holder_product_picture" => "00097478812-28-p1.jpg", "product_picture" => "00097478812-b.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 102, "color" => "Lavender Pinocchio", "holder_product_picture" => "00097478812-28-p1.jpg", "product_picture" => "00097478812-b.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 102, "color" => "Lavender Pinocchio", "holder_product_picture" => "00097478812-28-p1.jpg", "product_picture" => "00097478812-b.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 103 - Straight-leg trousers
                        ["product_id" => 103, "color" => "Muesli", "holder_product_picture" => "00087714730-p.jpg", "product_picture" => "00087714730-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 103, "color" => "Muesli", "holder_product_picture" => "00087714730-p.jpg", "product_picture" => "00087714730-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 103, "color" => "Muesli", "holder_product_picture" => "00087714730-p.jpg", "product_picture" => "00087714730-a4o.jpg", "size" => "L", "quantity" => 20],
                        
            
                        // Product 104 - Tailored fit balloon trousers
                        ["product_id" => 104, "color" => "Mirage", "holder_product_picture" => "00089741401-a3o.jpg", "product_picture" => "00089741401-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 104, "color" => "Mirage", "holder_product_picture" => "00089741401-a3o.jpg", "product_picture" => "00089741401-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 104, "color" => "Mirage", "holder_product_picture" => "00089741401-a3o.jpg", "product_picture" => "00089741401-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 104, "color" => "Pearl Bush", "holder_product_picture" => "00089741712-a3o.jpg", "product_picture" => "00089741712-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 104, "color" => "Pearl Bush", "holder_product_picture" => "00089741712-a3o.jpg", "product_picture" => "00089741712-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 104, "color" => "Pearl Bushy", "holder_product_picture" => "00089741712-a3o.jpg", "product_picture" => "00089741712-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 105 - Technical balloon parachute trousers
                        ["product_id" => 105, "color" => "Finch", "holder_product_picture" => "00110741505-p.jpg", "product_picture" => "00110741505-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 105, "color" => "Finch", "holder_product_picture" => "00110741505-p.jpg", "product_picture" => "00110741505-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 105, "color" => "Finch", "holder_product_picture" => "00110741505-p.jpg", "product_picture" => "00110741505-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 105, "color" => "White Rock", "holder_product_picture" => "00110741712-a2d.jpg", "product_picture" => "00110741712-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 105, "color" => "White Rock", "holder_product_picture" => "00110741712-a2d.jpg", "product_picture" => "00110741712-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 105, "color" => "White Rock", "holder_product_picture" => "00110741712-a2d.jpg", "product_picture" => "00110741712-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 106 - Long sleeved button neck top
                        ["product_id" => 106, "color" => "White", "holder_product_picture" => "07601443251-a5o.jpg", "product_picture" => "07601443251-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 106, "color" => "White", "holder_product_picture" => "07601443251-a5o.jpg", "product_picture" => "07601443251-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 106, "color" => "White", "holder_product_picture" => "07601443251-a5o.jpg", "product_picture" => "07601443251-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 106, "color" => "Firefly", "holder_product_picture" => "07601443462-a2d.jpg", "product_picture" => "07601443462-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 106, "color" => "Firefly", "holder_product_picture" => "07601443462-a2d.jpg", "product_picture" => "07601443462-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 106, "color" => "Firefly", "holder_product_picture" => "07601443462-a2d.jpg", "product_picture" => "07601443462-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 106, "color" => "Merino", "holder_product_picture" => "07601443726-a3o.jpg", "product_picture" => "07601443726-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 106, "color" => "Merino", "holder_product_picture" => "07601443726-a3o.jpg", "product_picture" => "07601443726-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 106, "color" => "Merino", "holder_product_picture" => "07601443726-a3o.jpg", "product_picture" => "07601443726-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 106, "color" => "Grey Nickel", "holder_product_picture" => "07601443812-a3o.jpg", "product_picture" => "07601443812-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 106, "color" => "Grey Nickel", "holder_product_picture" => "07601443812-a3o.jpg", "product_picture" => "07601443812-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 106, "color" => "Grey Nickel", "holder_product_picture" => "07601443812-a3o.jpg", "product_picture" => "07601443812-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 107 - Oversize short sleeve T-shirt with feathers
                        ["product_id" => 107, "color" => "White", "holder_product_picture" => "02390777712-p.jpg", "product_picture" => "02390777712-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 107, "color" => "White", "holder_product_picture" => "02390777712-p.jpg", "product_picture" => "02390777712-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 107, "color" => "White", "holder_product_picture" => "02390777712-p.jpg", "product_picture" => "02390777712-a4o.jpg", "size" => "L", "quantity" => 20],
                        
            
                        // Product 108 - Oversized short-sleeved cotton T-shirt
                        ["product_id" => 108, "color" => "White", "holder_product_picture" => "02333443251-a3o.jpg", "product_picture" => "02333443251-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 108, "color" => "White", "holder_product_picture" => "02333443251-a3o.jpg", "product_picture" => "02333443251-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 108, "color" => "White", "holder_product_picture" => "02333443251-a3o.jpg", "product_picture" => "02333443251-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 108, "color" => "Geyser", "holder_product_picture" => "02333443428-p.jpg", "product_picture" => "02333443428-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 108, "color" => "Geyser", "holder_product_picture" => "02333443428-p.jpg", "product_picture" => "02333443428-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 108, "color" => "Geyser", "holder_product_picture" => "02333443428-p.jpg", "product_picture" => "02333443428-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 108, "color" => "Carousel Pink", "holder_product_picture" => "02333443629-a3o.jpg", "product_picture" => "02333443629-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 108, "color" => "Carousel Pink", "holder_product_picture" => "02333443629-a3o.jpg", "product_picture" => "02333443629-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 108, "color" => "Carousel Pink", "holder_product_picture" => "02333443629-a3o.jpg", "product_picture" => "02333443629-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 109 - Short sleeve Billie Eilish print T-shirt
                        
                        ["product_id" => 109, "color" => "White", "holder_product_picture" => "02438160251-a3o.jpg", "product_picture" => "02438160251-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 109, "color" => "White", "holder_product_picture" => "02438160251-a3o.jpg", "product_picture" => "02438160251-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 109, "color" => "White", "holder_product_picture" => "02438160251-a3o.jpg", "product_picture" => "02438160251-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 110 - Short sleeve Billie Eilish print T-shirty
                        ["product_id" => 110, "color" => "Black", "holder_product_picture" => "02431160800-p.jpg", "product_picture" => "02431160800-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 110, "color" => "Black", "holder_product_picture" => "02431160800-p.jpg", "product_picture" => "02431160800-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 110, "color" => "Black", "holder_product_picture" => "02431160800-p.jpg", "product_picture" => "02431160800-a4o.jpg", "size" => "L", "quantity" => 20],
                        
            
                        // Product 111 - Short sleeve crew neck T-shirt
                        ["product_id" => 111, "color" => "Lavender Mist", "holder_product_picture" => "02666152106-a3o.jpg", "product_picture" => "02666152106-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 111, "color" => "Lavender Mist", "holder_product_picture" => "02666152106-a3o.jpg", "product_picture" => "02666152106-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 111, "color" => "Lavender Mist", "holder_product_picture" => "02666152106-a3o.jpg", "product_picture" => "02666152106-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 111, "color" => "Antique White", "holder_product_picture" => "02666152621-a2d.jpg", "product_picture" => "02666152621-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 111, "color" => "Antique White", "holder_product_picture" => "02666152621-a2d.jpg", "product_picture" => "02666152621-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 111, "color" => "Antique White", "holder_product_picture" => "02666152621-a2d.jpg", "product_picture" => "02666152621-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 111, "color" => "Black", "holder_product_picture" => "02666152800-a3o.jpg", "product_picture" => "02666152800-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 111, "color" => "Black", "holder_product_picture" => "02666152800-a3o.jpg", "product_picture" => "02666152800-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 111, "color" => "Black", "holder_product_picture" => "02666152800-a3o.jpg", "product_picture" => "02666152800-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 112 - Short sleeve Sabrina Carpenter print T-shirt
                        ["product_id" => 112, "color" => "White", "holder_product_picture" => "01576677802-21-a10o.jpg", "product_picture" => "01576677802-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 112, "color" => "White", "holder_product_picture" => "01576677802-21-a10o.jpg", "product_picture" => "01576677802-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 112, "color" => "White", "holder_product_picture" => "01576677802-21-a10o.jpg", "product_picture" => "01576677802-a4o.jpg", "size" => "L", "quantity" => 20],
                        ["product_id" => 112, "color" => "Pink", "holder_product_picture" => "01576677822-21-a10o.jpg", "product_picture" => "01576677822-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 112, "color" => "Pink", "holder_product_picture" => "01576677822-21-a10o.jpg", "product_picture" => "01576677822-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 112, "color" => "Pink", "holder_product_picture" => "01576677822-21-a10o.jpg", "product_picture" => "01576677822-a4o.jpg", "size" => "L", "quantity" => 20],
            
                        // Product 113 - Short sleeve Sabrina Carpenter print T-shirtt
                        ["product_id" => 113, "color" => "Fantasy", "holder_product_picture" => "02427705321-a2d.jpg", "product_picture" => "02427705321-a4o.jpg", "size" => "S", "quantity" => 20],
                        ["product_id" => 113, "color" => "Fantasy", "holder_product_picture" => "02427705321-a2d.jpg", "product_picture" => "02427705321-a4o.jpg", "size" => "M", "quantity" => 20],
                        ["product_id" => 113, "color" => "Fantasy", "holder_product_picture" => "02427705321-a2d.jpg", "product_picture" => "02427705321-a4o.jpg", "size" => "L", "quantity" => 20],
                        
            
                        // Product 114 - Block heel boots
                        ["product_id" => 114, "color" => "Black", "holder_product_picture" => "12100560040-a3o.jpg", "product_picture" => "12100560040-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 114, "color" => "Black", "holder_product_picture" => "12100560040-a3o.jpg", "product_picture" => "12100560040-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 114, "color" => "Black", "holder_product_picture" => "12100560040-a3o.jpg", "product_picture" => "12100560040-a4o.jpg", "size" => "38", "quantity" => 20],
                        ["product_id" => 114, "color" => "Brown", "holder_product_picture" => "12100560025-a3o.jpg", "product_picture" => "12100560025-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 114, "color" => "Brown", "holder_product_picture" => "12100560025-a3o.jpg", "product_picture" => "12100560025-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 114, "color" => "Brown", "holder_product_picture" => "12100560025-a3o.jpg", "product_picture" => "12100560025-a4o.jpg", "size" => "38", "quantity" => 20],
            
                        // Product 115 - Mid-calf flat biker boots
                        ["product_id" => 115, "color" => "Thunder", "holder_product_picture" => "11032560100-w.jpg", "product_picture" => "11032560100-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 115, "color" => "Thunder", "holder_product_picture" => "11032560100-w.jpg", "product_picture" => "11032560100-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 115, "color" => "Thunder", "holder_product_picture" => "11032560100-w.jpg", "product_picture" => "11032560100-a4o.jpg", "size" => "38", "quantity" => 20],
                        
            
                        // Product 116 - Sock-style platform ankle boots
                        ["product_id" => 116, "color" => "Black", "holder_product_picture" => "1745339651_6807c50384d23.webp", "product_picture" => "12100560040-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 116, "color" => "Black", "holder_product_picture" => "1745339651_6807c50384d23.webp", "product_picture" => "12100560040-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 116, "color" => "Black", "holder_product_picture" => "1745339651_6807c50384d23.webp", "product_picture" => "12100560040-a4o.jpg", "size" => "38", "quantity" => 20],
                        ["product_id" => 116, "color" => "Gray", "holder_product_picture" => "12100560011-a3o.jpg", "product_picture" => "12100560011-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 116, "color" => "Gray", "holder_product_picture" => "12100560011-a3o.jpg", "product_picture" => "12100560011-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 116, "color" => "Gray", "holder_product_picture" => "12100560011-a3o.jpg", "product_picture" => "12100560011-a4o.jpg", "size" => "38", "quantity" => 20],
            
                        // Product 117 - Chunky sole deck shoes
                        
                        ["product_id" => 117, "color" => "Black", "holder_product_picture" => "1164056004001-b1o.jpg", "product_picture" => "11640560040-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 117, "color" => "Black", "holder_product_picture" => "1164056004001-b1o.jpg", "product_picture" => "11640560040-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 117, "color" => "Black", "holder_product_picture" => "1164056004001-b1o.jpg", "product_picture" => "11640560040-a4o.jpg", "size" => "38", "quantity" => 20],
            
                        // Product 118 - Loafers with gathered detail
                        ["product_id" => 118, "color" => "Irish Coffee", "holder_product_picture" => "11638560100-b1o.jpg", "product_picture" => "11638560100-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 118, "color" => "Irish Coffee", "holder_product_picture" => "11638560100-b1o.jpg", "product_picture" => "11638560100-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 118, "color" => "Irish Coffee", "holder_product_picture" => "11638560100-b1o.jpg", "product_picture" => "11638560100-a4o.jpg", "size" => "38", "quantity" => 20],
                        
            
                        // Product 119 - Block heel slingback shoes
                        ["product_id" => 119, "color" => "white", "holder_product_picture" => "11332560102-01-w.jpg", "product_picture" => "11332560102-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 119, "color" => "while", "holder_product_picture" => "11332560102-01-w.jpg", "product_picture" => "11332560102-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 119, "color" => "while", "holder_product_picture" => "11332560102-01-w.jpg", "product_picture" => "11332560102-a4o.jpg", "size" => "38", "quantity" => 20],
                        
            
                        // Product 120 - Kitten heel shoes
                        ["product_id" => 120, "color" => "Stone", "holder_product_picture" => "11336560030-02-b1o.jpg", "product_picture" => "11336560030-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 120, "color" => "Stone", "holder_product_picture" => "11336560030-02-b1o.jpg", "product_picture" => "11336560030-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 120, "color" => "Stone", "holder_product_picture" => "11336560030-02-b1o.jpg", "product_picture" => "11336560030-a4o.jpg", "size" => "38", "quantity" => 20],
                        ["product_id" => 120, "color" => "Light Apricot", "holder_product_picture" => "11336560090-02-b1o.jpg", "product_picture" => "11336560090-02-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 120, "color" => "Light Apricot", "holder_product_picture" => "11336560090-02-b1o.jpg", "product_picture" => "11336560090-02-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 120, "color" => "Light Apricot", "holder_product_picture" => "11336560090-02-b1o.jpg", "product_picture" => "11336560090-02-a4o.jpg", "size" => "38", "quantity" => 20],
            
                        // Product 121 - Monogram kitten heel shoes
                        ["product_id" => 121, "color" => "Deep Bronze", "holder_product_picture" => "11374560202-01-b1o.jpg", "product_picture" => "11374560202-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 121, "color" => "Deep Bronze", "holder_product_picture" => "11374560202-01-b1o.jpg", "product_picture" => "11374560202-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 121, "color" => "Deep Bronze", "holder_product_picture" => "11374560202-01-b1o.jpg", "product_picture" => "11374560202-a4o.jpg", "size" => "38", "quantity" => 20],
                        
            
                        // Product 122 - Slingback high-heel football shoes
                        ["product_id" => 122, "color" => "Star Dust", "holder_product_picture" => "11326560004-01-b1o.jpg", "product_picture" => "11326560004-01-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 122, "color" => "Star Dust", "holder_product_picture" => "11326560004-01-b1o.jpg", "product_picture" => "11326560004-01-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 122, "color" => "Star Dust", "holder_product_picture" => "11326560004-01-b1o.jpg", "product_picture" => "11326560004-01-a4o.jpg", "size" => "38", "quantity" => 20],
                        
            
                        // Product 123 - Flat lace-up sandals with metal detail
                        ["product_id" => 123, "color" => "black", "holder_product_picture" => "11802560040-b1o.jpg", "product_picture" => "11802560040-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 123, "color" => "black", "holder_product_picture" => "11802560040-b1o.jpg", "product_picture" => "11802560040-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 123, "color" => "black", "holder_product_picture" => "11802560040-b1o.jpg", "product_picture" => "11802560040-a4o.jpg", "size" => "38", "quantity" => 20],
                        ["product_id" => 123, "color" => "Judge Grey", "holder_product_picture" => "11803560100-w.jpg", "product_picture" => "11803560100-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 123, "color" => "Judge Grey", "holder_product_picture" => "11803560100-w.jpg", "product_picture" => "11803560100-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 123, "color" => "Judge Grey", "holder_product_picture" => "11803560100-w.jpg", "product_picture" => "11803560100-a4o.jpg", "size" => "38", "quantity" => 20],
            
                        // Product 124 - High-heel slingback wedge sandals
                        ["product_id" => 124, "color" => "Pickled Bean", "holder_product_picture" => "11724560105-01-b1o.jpg", "product_picture" => "11724560105-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 124, "color" => "Pickled Bean", "holder_product_picture" => "11724560105-01-b1o.jpg", "product_picture" => "11724560105-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 124, "color" => "Pickled Bean", "holder_product_picture" => "11724560105-01-b1o.jpg", "product_picture" => "11724560105-a4o.jpg", "size" => "38", "quantity" => 20],
                        
            
                        // Product 125 - Jute platform sandals
                        ["product_id" => 125, "color" => "Black Cat", "holder_product_picture" => "11760560100-01-b1o.jpg", "product_picture" => "11760560100-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 125, "color" => "Black Cat", "holder_product_picture" => "11760560100-01-b1o.jpg", "product_picture" => "11760560100-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 125, "color" => "Black Cat", "holder_product_picture" => "11760560100-01-b1o.jpg", "product_picture" => "11760560100-a4o.jpg", "size" => "38", "quantity" => 20],
                        
            
                        // Product 126 - Kitten heel sandals with floral detail
                        ["product_id" => 126, "color" => "White", "holder_product_picture" => "11759560001-01-w.jpg", "product_picture" => "11759560001-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 126, "color" => "White", "holder_product_picture" => "11759560001-01-w.jpg", "product_picture" => "11759560001-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 126, "color" => "White", "holder_product_picture" => "11759560001-01-w.jpg", "product_picture" => "11759560001-a4o.jpg", "size" => "38", "quantity" => 20],
                        ["product_id" => 126, "color" => "Pink", "holder_product_picture" => "11759560001-01-w.jpg", "product_picture" => "11790560050-a1t.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 126, "color" => "Pink", "holder_product_picture" => "11759560001-01-w.jpg", "product_picture" => "11790560050-a1t.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 126, "color" => "Pink", "holder_product_picture" => "11759560001-01-w.jpg", "product_picture" => "11790560050-a1t.jpg", "size" => "38", "quantity" => 20],
            
                        // Product 127 - Studded flat sandals
                        ["product_id" => 127, "color" => "Black", "holder_product_picture" => "11815560040-01-w.jpg", "product_picture" => "11815560040-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 127, "color" => "Black", "holder_product_picture" => "11815560040-01-w.jpg", "product_picture" => "11815560040-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 127, "color" => "Black", "holder_product_picture" => "11815560040-01-w.jpg", "product_picture" => "11815560040-a4o.jpg", "size" => "38", "quantity" => 20],
                        
            
                        // Product 128 - Animal print skater trainers
                        ["product_id" => 128, "color" => "Pickled Bean", "holder_product_picture" => "11438560202-b1o.jpg", "product_picture" => "11438560202-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 128, "color" => "Pickled Bean", "holder_product_picture" => "11438560202-b1o.jpg", "product_picture" => "11438560202-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 128, "color" => "Pickled Bean", "holder_product_picture" => "11438560202-b1o.jpg", "product_picture" => "11438560202-a4o.jpg", "size" => "38", "quantity" => 20],
                        
            
                        // Product 129 - Chunky skater trainers
                        ["product_id" => 129, "color" => "Rodeo Dust", "holder_product_picture" => "11444560050-w.jpg", "product_picture" => "11444560050-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 129, "color" => "Rodeo Dust", "holder_product_picture" => "11444560050-w.jpg", "product_picture" => "11444560050-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 129, "color" => "Rodeo Dust", "holder_product_picture" => "11444560050-w.jpg", "product_picture" => "11444560050-a4o.jpg", "size" => "38", "quantity" => 20],
                        
            
                        // Product 130 - Chunky sole trainers
                        ["product_id" => 130, "color" => "White", "holder_product_picture" => "11434560001-01-b1o.jpg", "product_picture" => "11434560001-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 130, "color" => "White", "holder_product_picture" => "11434560001-01-b1o.jpg", "product_picture" => "11434560001-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 130, "color" => "White", "holder_product_picture" => "11434560001-01-b1o.jpg", "product_picture" => "11434560001-a4o.jpg", "size" => "38", "quantity" => 20],
                        
            
                        // Product 131 - High-top trainers with inner wedge
                        ["product_id" => 131, "color" => "Dark Taupe", "holder_product_picture" => "11506560131-b1o.jpg", "product_picture" => "11506560131-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 131, "color" => "Dark Taupe", "holder_product_picture" => "11506560131-b1o.jpg", "product_picture" => "11506560131-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 131, "color" => "Dark Taupe", "holder_product_picture" => "11506560131-b1o.jpg", "product_picture" => "11506560131-a4o.jpg", "size" => "38", "quantity" => 20],
                        
            
                        // Product 132 - Multi-piece sneakers
                        ["product_id" => 132, "color" => "White", "holder_product_picture" => "11518560202-b1o.jpg", "product_picture" => "11518560202-a4o.jpg", "size" => "36", "quantity" => 20],
                        ["product_id" => 132, "color" => "White", "holder_product_picture" => "11518560202-b1o.jpg", "product_picture" => "11518560202-a4o.jpg", "size" => "37", "quantity" => 20],
                        ["product_id" => 132, "color" => "White", "holder_product_picture" => "11518560202-b1o.jpg", "product_picture" => "11518560202-a4o.jpg", "size" => "38", "quantity" => 20],
                        
                    ]);
                }
            }