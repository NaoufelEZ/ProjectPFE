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
//JACKETS AND COATS for Men
["product_id" => 1, "color" => "Black", "product_picture" => "01596730800-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 1, "color" => "Black", "product_picture" => "01596730800-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 1, "color" => "Black", "product_picture" => "01596730800-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 1, "color" => "Espresso", "product_picture" => "01596730700-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 1, "color" => "Espresso", "product_picture" => "01596730700-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 1, "color" => "Espresso", "product_picture" => "01596730700-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 1, "color" => "Nocturnal Blue", "product_picture" => "01549074401-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 1, "color" => "Nocturnal Blue", "product_picture" => "01549074401-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 1, "color" => "Nocturnal Blue", "product_picture" => "01549074401-a4o.jpg", "size" => "L", "quantity" => 20],


//JEANS for Men
["product_id" => 2, "color" => "Midnight Steel", "product_picture" => "00336074400-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 2, "color" => "Midnight Steel", "product_picture" => "00336074400-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 2, "color" => "Midnight Steel", "product_picture" => "00336074400-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 2, "color" => "Black", "product_picture" => "00337335809-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 2, "color" => "Black", "product_picture" => "00337335809-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 2, "color" => "Black", "product_picture" => "00337335809-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 2, "color" => "Sandy Taupe", "product_picture" => "00343074500-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 2, "color" => "Sandy Taupe", "product_picture" => "00343074500-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 2, "color" => "Sandy Taupe", "product_picture" => "00343074500-a4o.jpg", "size" => "L", "quantity" => 20],

//SHIRTS for Men
["product_id" => 3, "color" => "White", "product_picture" => "01238073251-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 3, "color" => "White", "product_picture" => "01238073251-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 3, "color" => "White", "product_picture" => "01238073251-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 3, "color" => "Black", "product_picture" => "01238073800-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 3, "color" => "Black", "product_picture" => "01238073800-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 3, "color" => "Black", "product_picture" => "01238073800-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 3, "color" => "Charcoal Gray", "product_picture" => "01244388809-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 3, "color" => "Charcoal Gray", "product_picture" => "01244388809-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 3, "color" => "Charcoal Gray", "product_picture" => "01244388809-a4o.jpg", "size" => "L", "quantity" => 20],

//Contrast sweater for Men
["product_id" => 4, "color" => "White", "product_picture" => "02194663250-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 4, "color" => "White", "product_picture" => "02194663250-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 4, "color" => "White", "product_picture" => "02194663250-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 4, "color" => "Black", "product_picture" => "02196376800-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 4, "color" => "Black", "product_picture" => "02196376800-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 4, "color" => "Black", "product_picture" => "02196376800-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 4, "color" => "Blue", "product_picture" => "02213663400-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 4, "color" => "Blue", "product_picture" => "02213663400-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 4, "color" => "Blue", "product_picture" => "02213663400-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 4, "color" => "Gray", "product_picture" => "02205376800-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 4, "color" => "Gray", "product_picture" => "02205376800-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 4, "color" => "Gray", "product_picture" => "02205376800-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 4, "color" => "Olive Khaki", "product_picture" => "02218069711-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 4, "color" => "Olive Khaki", "product_picture" => "02218069711-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 4, "color" => "Olive Khaki", "product_picture" => "02218069711-a4o.jpg", "size" => "L", "quantity" => 20],

//SWEATSHIRTS AND HOODIES for Men
["product_id" => 5, "color" => "Cafe Mocha", "product_picture" => "02257538700-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 5, "color" => "Cafe Mocha", "product_picture" => "02257538700-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 5, "color" => "Cafe Mocha", "product_picture" => "02257538700-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 5, "color" => "White", "product_picture" => "02257538712-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 5, "color" => "White", "product_picture" => "02257538712-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 5, "color" => "White", "product_picture" => "02257538712-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 5, "color" => "Blue", "product_picture" => "02244732428-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 5, "color" => "Blue", "product_picture" => "02244732428-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 5, "color" => "Blue", "product_picture" => "02244732428-a4o.jpg", "size" => "L", "quantity" => 20],
// TROUSERS for Men

["product_id" => 6, "color" => "Black", "product_picture" => "00463478800-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 6, "color" => "Black", "product_picture" => "00463478800-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 6, "color" => "Black", "product_picture" => "00463478800-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 6, "color" => "White", "product_picture" => "00463478812-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 6, "color" => "White", "product_picture" => "00463478812-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 6, "color" => "White", "product_picture" => "00463478812-a4o.jpg", "size" => "L", "quantity" => 20],

//T-SHIRTS for Men
["product_id" => 7, "color" => "Deep Teal", "product_picture" => "02811152594-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 7, "color" => "Deep Teal", "product_picture" => "02811152594-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 7, "color" => "Deep Teal", "product_picture" => "02811152594-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 7, "color" => "White", "product_picture" => "02811154250-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 7, "color" => "White", "product_picture" => "02811154250-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 7, "color" => "White", "product_picture" => "02811154250-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 7, "color" => "Black", "product_picture" => "02811152800-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 7, "color" => "Black", "product_picture" => "02811152800-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 7, "color" => "Black", "product_picture" => "02811152800-a4o.jpg", "size" => "L", "quantity" => 20],

//ANKLE BOOTS for Men
["product_id" => 8, "color" => "Black", "product_picture" => "12100560040-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 8, "color" => "Black", "product_picture" => "12100560040-a4o.jpg", "size" => "41", "quantity" => 20],
["product_id" => 8, "color" => "Black", "product_picture" => "12100560040-a4o.jpg", "size" => "42", "quantity" => 20],
["product_id" => 8, "color" => "Black", "product_picture" => "12100560040-a4o.jpg", "size" => "43", "quantity" => 20],
//SANDALS for Men
["product_id" => 9, "color" => "Autumn Bronze", "product_picture" => "12701560107-a4o.jpg", "size" => "38", "quantity" => 20],
["product_id" => 9, "color" => "Autumn Bronze", "product_picture" => "12701560107-a4o.jpg", "size" => "39", "quantity" => 20],
["product_id" => 9, "color" => "Autumn Bronze", "product_picture" => "12701560107-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 9, "color" => "Autumn Bronze", "product_picture" => "12701560107-a4o.jpg", "size" => "41", "quantity" => 20],
["product_id" => 9, "color" => "Autumn Bronze", "product_picture" => "12701560107-a4o.jpg", "size" => "42", "quantity" => 20],
["product_id" => 9, "color" => "Golden Sand", "product_picture" => "12701560131-a4o.jpg", "size" => "39", "quantity" => 20],
["product_id" => 9, "color" => "Golden Sand", "product_picture" => "12701560131-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 9, "color" => "Golden Sand", "product_picture" => "12701560131-a4o.jpg", "size" => "41", "quantity" => 20],
["product_id" => 9, "color" => "Golden Sand", "product_picture" => "12701560131-a4o.jpg", "size" => "42", "quantity" => 20],

//SMART SHOES for Men
["product_id" => 10, "color" => "White", "product_picture" => "12604460202-b.jpg", "size" => "40", "quantity" => 20],
["product_id" => 10, "color" => "White", "product_picture" => "12604460202-b.jpg", "size" => "41", "quantity" => 20],
["product_id" => 10, "color" => "White", "product_picture" => "12604460202-b.jpg", "size" => "42", "quantity" => 20],
["product_id" => 10, "color" => "Black", "product_picture" => "12616560040-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 10, "color" => "Black", "product_picture" => "12616560040-a4o.jpg", "size" => "41", "quantity" => 20],
["product_id" => 10, "color" => "Black", "product_picture" => "12616560040-a4o.jpg", "size" => "42", "quantity" => 20],
["product_id" => 10, "color" => "Crimson Chestnut", "product_picture" => "12622560022-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 10, "color" => "Crimson Chestnut", "product_picture" => "12622560022-a4o.jpg", "size" => "41", "quantity" => 20],
["product_id" => 10, "color" => "Crimson Chestnut", "product_picture" => "12622560022-a4o.jpg", "size" => "42", "quantity" => 20],
["product_id" => 10, "color" => "Olive Drift", "product_picture" => "12628560131-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 10, "color" => "Olive Drift", "product_picture" => "12628560131-a4o.jpg", "size" => "41", "quantity" => 20],
["product_id" => 10, "color" => "Olive Drift", "product_picture" => "12628560131-a4o.jpg", "size" => "42", "quantity" => 20],

//SNEAKERS for Men
["product_id" => 11, "color" => "Black", "product_picture" => "12302560040-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 11, "color" => "Black", "product_picture" => "12302560040-a4o.jpg", "size" => "41", "quantity" => 20],
["product_id" => 11, "color" => "Black", "product_picture" => "12302560040-a4o.jpg", "size" => "42", "quantity" => 20],
["product_id" => 11, "color" => "White", "product_picture" => "12375560202-a4o.jpg", "size" => "39", "quantity" => 20],
["product_id" => 11, "color" => "White", "product_picture" => "12375560202-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 11, "color" => "White", "product_picture" => "12375560202-a4o.jpg", "size" => "41", "quantity" => 20],
["product_id" => 11, "color" => "White", "product_picture" => "12375560202-a4o.jpg", "size" => "42", "quantity" => 20],

//TRAINERS for Men
["product_id" => 12, "color" => "Moss Taupe", "product_picture" => "12420560004-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 12, "color" => "Moss Taupe", "product_picture" => "12420560004-a4o.jpg", "size" => "41", "quantity" => 20],
["product_id" => 12, "color" => "Moss Taupe", "product_picture" => "12420560004-a4o.jpg", "size" => "42", "quantity" => 20],
["product_id" => 12, "color" => "Moss Taupe", "product_picture" => "12420560004-a4o.jpg", "size" => "43", "quantity" => 20],
["product_id" => 12, "color" => "Black", "product_picture" => "12448460040-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 12, "color" => "Black", "product_picture" => "12448460040-a4o.jpg", "size" => "41", "quantity" => 20],
["product_id" => 12, "color" => "Black", "product_picture" => "12448460040-a4o.jpg", "size" => "42", "quantity" => 20],
["product_id" => 12, "color" => "Black", "product_picture" => "12448460040-a4o.jpg", "size" => "43", "quantity" => 20],
["product_id" => 12, "color" => "White", "product_picture" => "12454360001-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 12, "color" => "White", "product_picture" => "12454360001-a4o.jpg", "size" => "41", "quantity" => 20],
["product_id" => 12, "color" => "White", "product_picture" => "12454360001-a4o.jpg", "size" => "42", "quantity" => 20],
["product_id" => 12, "color" => "White", "product_picture" => "12454360001-a4o.jpg", "size" => "43", "quantity" => 20],

//Dresses and Jumpsuits for Women
["product_id" => 13, "color" => "Gray", "product_picture" => "00700187802-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 13, "color" => "Gray", "product_picture" => "00700187802-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 13, "color" => "Gray", "product_picture" => "00700187802-a4o", "size" => "L", "quantity" => 20],
["product_id" => 13, "color" => "White", "product_picture" => "00744494100-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 13, "color" => "White", "product_picture" => "00744494100-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 13, "color" => "White", "product_picture" => "00744494100-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 13, "color" => "Black", "product_picture" => "00698187800-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 13, "color" => "Black", "product_picture" => "00698187800-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 13, "color" => "Black", "product_picture" => "00698187800-a4o.jpg", "size" => "L", "quantity" => 20],

//Jackets and blazers for Women
["product_id" => 14, "color" => "Ivory Lace", "product_picture" => "01487706321-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 14, "color" => "Ivory Lace", "product_picture" => "01487706321-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 14, "color" => "Ivory Lace", "product_picture" => "01487706321-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 14, "color" => "Cloudy Taupe", "product_picture" => "01487706812-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 14, "color" => "Cloudy Taupe", "product_picture" => "01487706812-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 14, "color" => "Cloudy Taupe", "product_picture" => "01487706812-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 14, "color" => "Black", "product_picture" => "01524718800-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 14, "color" => "Black", "product_picture" => "01524718800-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 14, "color" => "Black", "product_picture" => "01524718800-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 14, "color" => "Redwood", "product_picture" => "01524719605-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 14, "color" => "Redwood", "product_picture" => "01524719605-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 14, "color" => "Redwood", "product_picture" => "01524719605-a4o.jpg", "size" => "L", "quantity" => 20],

//Jeans for Women
["product_id" => 15, "color" => "Blue", "product_picture" => "00037156428-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 15, "color" => "Blue", "product_picture" => "00037156428-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 15, "color" => "Blue", "product_picture" => "00037156428-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 15, "color" => "White", "product_picture" => "00037156712-b.jpg", "size" => "S", "quantity" => 20],
["product_id" => 15, "color" => "White", "product_picture" => "00037156712-b.jpg", "size" => "M", "quantity" => 20],
["product_id" => 15, "color" => "White", "product_picture" => "00037156712-b.jpg", "size" => "L", "quantity" => 20],
["product_id" => 15, "color" => "Gray", "product_picture" => "00037156811-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 15, "color" => "Gray", "product_picture" => "00037156811-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 15, "color" => "Gray", "product_picture" => "00037156811-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 15, "color" => "Russet Brown", "product_picture" => "00037156700-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 15, "color" => "Russet Brown", "product_picture" => "00037156700-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 15, "color" => "Russet Brown", "product_picture" => "00037156700-a4o.jpg", "size" => "L", "quantity" => 20],

//Shirts and blouses for Women
["product_id" => 16, "color" => "White", "product_picture" => "06271692250-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 16, "color" => "White", "product_picture" => "06271692250-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 16, "color" => "White", "product_picture" => "06271692250-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 16, "color" => "Blue", "product_picture" => "06271028400-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 16, "color" => "Blue", "product_picture" => "06271028400-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 16, "color" => "Blue", "product_picture" => "06271028400-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 16, "color" => "Black", "product_picture" => "06190777800-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 16, "color" => "Black", "product_picture" => "06190777800-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 16, "color" => "Black", "product_picture" => "06190777800-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 16, "color" => "Buttermilk Cream", "product_picture" => "6190777711_2_4_0.jpg", "size" => "S", "quantity" => 20],
["product_id" => 16, "color" => "Buttermilk Cream", "product_picture" => "6190777711_2_4_0.jpg", "size" => "M", "quantity" => 20],
["product_id" => 16, "color" => "Buttermilk Cream", "product_picture" => "6190777711_2_4_0.jpg", "size" => "L", "quantity" => 20],

//Sweaters and cardigans for Women
["product_id" => 17, "color" => "Olive Grove", "product_picture" => "01763443505-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 17, "color" => "Olive Grove", "product_picture" => "01763443505-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 17, "color" => "Olive Grove", "product_picture" => "01763443505-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 17, "color" => "White", "product_picture" => "01763443712-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 17, "color" => "White", "product_picture" => "01763443712-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 17, "color" => "White", "product_picture" => "01763443712-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 17, "color" => "Gray", "product_picture" => "01763443812-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 17, "color" => "Gray", "product_picture" => "01763443812-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 17, "color" => "Gray", "product_picture" => "01763443812-a4o.jpg", "size" => "L", "quantity" => 20],

//Sweatshirts and hoodies for Women
["product_id" => 18, "color" => "White", "product_picture" => "07077033250-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 18, "color" => "White", "product_picture" => "07077033250-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 18, "color" => "White", "product_picture" => "07077033250-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 18, "color" => "Black", "product_picture" => "07055700800-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 18, "color" => "Black", "product_picture" => "07055700800-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 18, "color" => "Black", "product_picture" => "07055700800-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 18, "color" => "Blue", "product_picture" => "07055190462-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 18, "color" => "Blue", "product_picture" => "07055190462-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 18, "color" => "Blue", "product_picture" => "07055190462-a4o.jpg", "size" => "L", "quantity" => 20],

//Trousers for Women
["product_id" => 19, "color" => "Black", "product_picture" => "00135019800-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 19, "color" => "Black", "product_picture" => "00135019800-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 19, "color" => "Black", "product_picture" => "00135019800-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 19, "color" => "Red", "product_picture" => "00135360605-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 19, "color" => "Red", "product_picture" => "00135360605-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 19, "color" => "Red", "product_picture" => "00135360605-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 19, "color" => "White", "product_picture" => "00135360812-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 19, "color" => "White", "product_picture" => "00135360812-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 19, "color" => "White", "product_picture" => "00135360812-a4o.jpg", "size" => "S", "quantity" => 20],

//T-shirts for Women
["product_id" => 20, "color" => "Black", "product_picture" => "02420443800-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 20, "color" => "Black", "product_picture" => "02420443800-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 20, "color" => "Black", "product_picture" => "02420443800-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 20, "color" => "White", "product_picture" => "02666152251-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 20, "color" => "White", "product_picture" => "02666152251-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 20, "color" => "White", "product_picture" => "02666152251-a4o.jpg", "size" => "L", "quantity" => 20],
["product_id" => 20, "color" => "Blue", "product_picture" => "02428705106-a4o.jpg", "size" => "S", "quantity" => 20],
["product_id" => 20, "color" => "Blue", "product_picture" => "02428705106-a4o.jpg", "size" => "M", "quantity" => 20],
["product_id" => 20, "color" => "Blue", "product_picture" => "02428705106-a4o.jpg", "size" => "L", "quantity" => 20],

//BOOTS AND ANKLE BOOTS for Women
["product_id" => 21, "color" => "Black", "product_picture" => "11050460040-a4o.jpg", "size" => "35", "quantity" => 20],
["product_id" => 21, "color" => "Black", "product_picture" => "11050460040-a4o.jpg", "size" => "36", "quantity" => 20],
["product_id" => 21, "color" => "Black", "product_picture" => "11050460040-a4o.jpg", "size" => "37", "quantity" => 20],
["product_id" => 21, "color" => "Black", "product_picture" => "11050460040-a4o.jpg", "size" => "38", "quantity" => 20],
["product_id" => 21, "color" => "Black", "product_picture" => "11050460040-a4o.jpg", "size" => "39", "quantity" => 20],
["product_id" => 21, "color" => "Black", "product_picture" => "11050460040-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 21, "color" => "Black", "product_picture" => "11050460040-a4o.jpg", "size" => "41", "quantity" => 20],
["product_id" => 21, "color" => "Burgundy Brown", "product_picture" => "11052460025-b.jpg", "size" => "35", "quantity" => 20],
["product_id" => 21, "color" => "Burgundy Brown", "product_picture" => "11052460025-b.jpg", "size" => "36", "quantity" => 20],
["product_id" => 21, "color" => "Burgundy Brown", "product_picture" => "11052460025-b.jpg", "size" => "37", "quantity" => 20],
["product_id" => 21, "color" => "Burgundy Brown", "product_picture" => "11052460025-b.jpg", "size" => "38", "quantity" => 20],
["product_id" => 21, "color" => "Burgundy Brown", "product_picture" => "11052460025-b.jpg", "size" => "39", "quantity" => 20],
["product_id" => 21, "color" => "Burgundy Brown", "product_picture" => "11052460025-b.jpg", "size" => "40", "quantity" => 20],
["product_id" => 21, "color" => "Burgundy Brown", "product_picture" => "11052460025-b.jpg", "size" => "41", "quantity" => 20],
//FLAT SHOES for Women
["product_id" => 22, "color" => "White", "product_picture" => "11616560102-a4o.jpg", "size" => "35", "quantity" => 20],
["product_id" => 22, "color" => "White", "product_picture" => "11616560102-a4o.jpg", "size" => "36", "quantity" => 20],
["product_id" => 22, "color" => "White", "product_picture" => "11616560102-a4o.jpg", "size" => "37", "quantity" => 20],
["product_id" => 22, "color" => "White", "product_picture" => "11616560102-a4o.jpg", "size" => "38", "quantity" => 20],
["product_id" => 22, "color" => "White", "product_picture" => "11616560102-a4o.jpg", "size" => "39", "quantity" => 20],
["product_id" => 22, "color" => "White", "product_picture" => "11616560102-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 22, "color" => "White", "product_picture" => "11616560102-a4o.jpg", "size" => "41", "quantity" => 20],
["product_id" => 22, "color" => "Black", "product_picture" => "11626560040-a4o.jpg", "size" => "35", "quantity" => 20],
["product_id" => 22, "color" => "Black", "product_picture" => "11626560040-a4o.jpg", "size" => "36", "quantity" => 20],
["product_id" => 22, "color" => "Black", "product_picture" => "11626560040-a4o.jpg", "size" => "37", "quantity" => 20],
["product_id" => 22, "color" => "Black", "product_picture" => "11626560040-a4o.jpg", "size" => "38", "quantity" => 20],
["product_id" => 22, "color" => "Black", "product_picture" => "11626560040-a4o.jpg", "size" => "39", "quantity" => 20],
["product_id" => 22, "color" => "Black", "product_picture" => "11626560040-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 22, "color" => "Black", "product_picture" => "11626560040-a4o.jpg", "size" => "41", "quantity" => 20],
//HEELED SHOES for Women
["product_id" => 23, "color" => "White", "product_picture" => "11311560107-a4o.jpg", "size" => "35", "quantity" => 20],
["product_id" => 23, "color" => "White", "product_picture" => "11311560107-a4o.jpg", "size" => "36", "quantity" => 20],
["product_id" => 23, "color" => "White", "product_picture" => "11311560107-a4o.jpg", "size" => "37", "quantity" => 20],
["product_id" => 23, "color" => "White", "product_picture" => "11311560107-a4o.jpg", "size" => "38", "quantity" => 20],
["product_id" => 23, "color" => "White", "product_picture" => "11311560107-a4o.jpg", "size" => "39", "quantity" => 20],
["product_id" => 23, "color" => "White", "product_picture" => "11311560107-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 23, "color" => "White", "product_picture" => "11311560107-a4o.jpg", "size" => "41", "quantity" => 20],
["product_id" => 23, "color" => "Red", "product_picture" => "11314560020-b.jpg", "size" => "35", "quantity" => 20],
["product_id" => 23, "color" => "Red", "product_picture" => "11314560020-b.jpg", "size" => "36", "quantity" => 20],
["product_id" => 23, "color" => "Red", "product_picture" => "11314560020-b.jpg", "size" => "37", "quantity" => 20],
["product_id" => 23, "color" => "Red", "product_picture" => "11314560020-b.jpg", "size" => "38", "quantity" => 20],
["product_id" => 23, "color" => "Red", "product_picture" => "11314560020-b.jpg", "size" => "39", "quantity" => 20],
["product_id" => 23, "color" => "Red", "product_picture" => "11314560020-b.jpg", "size" => "40", "quantity" => 20],
["product_id" => 23, "color" => "Red", "product_picture" => "11314560020-b.jpg", "size" => "41", "quantity" => 20],
["product_id" => 23, "color" => "Black", "product_picture" => "11331360040-b.jpg", "size" => "35", "quantity" => 20],
["product_id" => 23, "color" => "Black", "product_picture" => "11331360040-b.jpg", "size" => "36", "quantity" => 20],
["product_id" => 23, "color" => "Black", "product_picture" => "11331360040-b.jpg", "size" => "37", "quantity" => 20],
["product_id" => 23, "color" => "Black", "product_picture" => "11331360040-b.jpg", "size" => "38", "quantity" => 20],
["product_id" => 23, "color" => "Black", "product_picture" => "11331360040-b.jpg", "size" => "39", "quantity" => 20],
["product_id" => 23, "color" => "Black", "product_picture" => "11331360040-b.jpg", "size" => "40", "quantity" => 20],
["product_id" => 23, "color" => "Black", "product_picture" => "11331360040-b.jpg", "size" => "41", "quantity" => 20],
["product_id" => 23, "color" => "Crimson Wine", "product_picture" => "11372460100-b.jpg", "size" => "35", "quantity" => 20],
["product_id" => 23, "color" => "Crimson Wine", "product_picture" => "11372460100-b.jpg", "size" => "36", "quantity" => 20],
["product_id" => 23, "color" => "Crimson Wine", "product_picture" => "11372460100-b.jpg", "size" => "37", "quantity" => 20],
["product_id" => 23, "color" => "Crimson Wine", "product_picture" => "11372460100-b.jpg", "size" => "38", "quantity" => 20],
["product_id" => 23, "color" => "Crimson Wine", "product_picture" => "11372460100-b.jpg", "size" => "39", "quantity" => 20],
["product_id" => 23, "color" => "Crimson Wine", "product_picture" => "11372460100-b.jpg", "size" => "40", "quantity" => 20],
["product_id" => 23, "color" => "Crimson Wine", "product_picture" => "11372460100-b.jpg", "size" => "41", "quantity" => 20],
//SANDALS for Women
["product_id" => 24, "color" => "Black", "product_picture" => "11760560100-a4o.jpg", "size" => "35", "quantity" => 20],
["product_id" => 24, "color" => "Black", "product_picture" => "11760560100-a4o.jpg", "size" => "36", "quantity" => 20],
["product_id" => 24, "color" => "Black", "product_picture" => "11760560100-a4o.jpg", "size" => "37", "quantity" => 20],
["product_id" => 24, "color" => "Black", "product_picture" => "11760560100-a4o.jpg", "size" => "38", "quantity" => 20],
["product_id" => 24, "color" => "Black", "product_picture" => "11760560100-a4o.jpg", "size" => "39", "quantity" => 20],
["product_id" => 24, "color" => "Black", "product_picture" => "11760560100-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 24, "color" => "Black", "product_picture" => "11760560100-a4o.jpg", "size" => "41", "quantity" => 20],
["product_id" => 24, "color" => "white", "product_picture" => "11762560001-a4o.jpg", "size" => "35", "quantity" => 20],
["product_id" => 24, "color" => "white", "product_picture" => "11762560001-a4o.jpg", "size" => "36", "quantity" => 20],
["product_id" => 24, "color" => "white", "product_picture" => "11762560001-a4o.jpg", "size" => "37", "quantity" => 20],
["product_id" => 24, "color" => "white", "product_picture" => "11762560001-a4o.jpg", "size" => "38", "quantity" => 20],
["product_id" => 24, "color" => "white", "product_picture" => "11762560001-a4o.jpg", "size" => "39", "quantity" => 20],
["product_id" => 24, "color" => "white", "product_picture" => "11762560001-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 24, "color" => "white", "product_picture" => "11762560001-a4o.jpg", "size" => "41", "quantity" => 20],
//TRAINERS for Women
["product_id" => 25, "color" => "white", "product_picture" => "11446560001-a4o.jpg", "size" => "35", "quantity" => 20],
["product_id" => 25, "color" => "white", "product_picture" => "11446560001-a4o.jpg", "size" => "36", "quantity" => 20],
["product_id" => 25, "color" => "white", "product_picture" => "11446560001-a4o.jpg", "size" => "37", "quantity" => 20],
["product_id" => 25, "color" => "white", "product_picture" => "11446560001-a4o.jpg", "size" => "38", "quantity" => 20],
["product_id" => 25, "color" => "white", "product_picture" => "11446560001-a4o.jpg", "size" => "39", "quantity" => 20],
["product_id" => 25, "color" => "white", "product_picture" => "11446560001-a4o.jpg", "size" => "40", "quantity" => 20],
["product_id" => 25, "color" => "white", "product_picture" => "11446560001-a4o.jpg", "size" => "41", "quantity" => 20],
["product_id" => 25, "color" => "Black", "product_picture" => "11400560040-b.jpg", "size" => "35", "quantity" => 20],
["product_id" => 25, "color" => "Black", "product_picture" => "11400560040-b.jpg", "size" => "36", "quantity" => 20],
["product_id" => 25, "color" => "Black", "product_picture" => "11400560040-b.jpg", "size" => "37", "quantity" => 20],
["product_id" => 25, "color" => "Black", "product_picture" => "11400560040-b.jpg", "size" => "38", "quantity" => 20],
["product_id" => 25, "color" => "Black", "product_picture" => "11400560040-b.jpg", "size" => "39", "quantity" => 20],
["product_id" => 25, "color" => "Black", "product_picture" => "11400560040-b.jpg", "size" => "40", "quantity" => 20],
["product_id" => 25, "color" => "Black", "product_picture" => "11400560040-b.jpg", "size" => "41", "quantity" => 20],       
]);
    }
}
