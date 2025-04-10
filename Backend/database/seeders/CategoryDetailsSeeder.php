<?php

namespace Database\Seeders;

use App\Models\CategoryDetails;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoryDetailsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CategoryDetails::factory()->createMany([

 //---MEN/CLOTHES---

["categoryDetails"=>"JACKETS AND COATS","category_id"=>1,"subcategory_id"=>1,"category_details_image"=>"01576677800-21-a9o.jpg"],
["categoryDetails"=>"JEANS","category_id"=>1,"subcategory_id"=>1,"category_details_image"=>"05340352401-21-a9o.jpg"],
["categoryDetails"=>"SHIRTS","category_id"=>1,"subcategory_id"=>1,"category_details_image"=>"01248218712-p.jpg"],
["categoryDetails"=>"SWEATERS AND CARDIGANS","category_id"=>1,"subcategory_id"=>1,"category_details_image"=>"07326623251-21-a9o.jpg"],
["categoryDetails"=>"SWEATSHIRTS AND HOODIES","category_id"=>1,"subcategory_id"=>1,"category_details_image"=>"02240498812-21-a9o.jpg"],
["categoryDetails"=>"TROUSERS","category_id"=>1,"subcategory_id"=>1,"category_details_image"=>"00415054712-21-a9o.jpg"],
["categoryDetails"=>"T-SHIRTS","category_id"=>1,"subcategory_id"=>1,"category_details_image"=>"02869443106-a3o.jpg"],

//---MEN/SHOES---

["categoryDetails"=>"ANKLE BOOTS","category_id"=>1,"subcategory_id"=>2,"category_details_image"=>"12100560040-a4o.jpg"],
["categoryDetails"=>"SANDALS","category_id"=>1,"subcategory_id"=>2,"category_details_image"=>"12701560107-a4o.jpg"],
["categoryDetails"=>"SMART SHOES","category_id"=>1,"subcategory_id"=>2,"category_details_image"=>"12628560131-a4o.jpg"],
["categoryDetails"=>"SNEAKERS","category_id"=>1,"subcategory_id"=>2,"category_details_image"=>"12310560040-a4o.jpg"],
["categoryDetails"=>"TRAINERS","category_id"=>1,"subcategory_id"=>2,"category_details_image"=>"12420560004-a4o.jpg"],

//---WOMEN/CLOTHES---

["categoryDetails"=>"DRESSES AND JUMPSUITS","category_id"=>2,"subcategory_id"=>3,"category_details_image"=>"00700187802-a3o.jpg"],
["categoryDetails"=>"JACKETS AND BLAZERS","category_id"=>2,"subcategory_id"=>3,"category_details_image"=>"01524718700-28-a9o.jpg"],
["categoryDetails"=>"JEANS","category_id"=>2,"subcategory_id"=>3,"category_details_image"=>"05023335800-28-a10o.jpg"],
["categoryDetails"=>"SHIRTS AND BLOUSES","category_id"=>2,"subcategory_id"=>3,"category_details_image"=>"06271741401-28-a9o.jpg"],
["categoryDetails"=>"SWEATERS AND CARDIGANS","category_id"=>2,"subcategory_id"=>3,"category_details_image"=>"07262686711-p.jpg"],
["categoryDetails"=>"SWEATSHIRTS AND HOODIES","category_id"=>2,"subcategory_id"=>3,"category_details_image"=>"07077033250-p.jpg"],
["categoryDetails"=>"TROUSERS","category_id"=>2,"subcategory_id"=>3,"category_details_image"=>"00097478505-28-a7o.jpg"],
["categoryDetails"=>"T-SHIRTS","category_id"=>2,"subcategory_id"=>3,"category_details_image"=>"02428705106-a7o.jpg"],

//---WOMEN/SHOES---

["categoryDetails"=>"BOOTS AND ANKLE BOOTS","category_id"=>2,"subcategory_id"=>4,"category_details_image"=>"11050460040-a4o.jpg"],
["categoryDetails"=>"FLAT SHOES","category_id"=>2,"subcategory_id"=>4,"category_details_image"=>"11616560102-a4o.jpg"],
["categoryDetails"=>"HEELED SHOES","category_id"=>2,"subcategory_id"=>4,"category_details_image"=>"11326560004-w.jpg"],
["categoryDetails"=>"SANDALS","category_id"=>2,"subcategory_id"=>4,"category_details_image"=>"11815560040-01-w.jpg"],
["categoryDetails"=>"TRAINERS","category_id"=>2,"subcategory_id"=>4,"category_details_image"=>"11444560050-w.jpg"],

        ]);
    }
}
