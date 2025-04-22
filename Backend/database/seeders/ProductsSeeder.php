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
            // Men's Products
            [
                "title" => "Leather effect jacket",
                "description" => "High-quality faux leather jacket with sleek design, perfect for any occasion. Features front zipper closure, multiple pockets, and comfortable fit.",
                "price" => 129,
                "discount" => 0,
                "details_id" => 1
            ],
            [
                "title" => "Denim trucker jacket",
                "description" => "Classic denim jacket with trucker style design. Features button-front closure, chest pockets, and durable construction for everyday wear.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 1
            ],
            [
                "title" => "Contrast jacket",
                "description" => "Modern jacket with bold contrast panel design. Made from lightweight materials with zip-front closure and stand-up collar.",
                "price" => 79,
                "discount" => 0,
                "details_id" => 1
            ],
            [
                "title" => "Seersucker jacket",
                "description" => "Breathable seersucker fabric jacket with textured pattern. Perfect for summer wear with a relaxed fit and button-front closure.",
                "price" => 95,
                "discount" => 0,
                "details_id" => 1
            ],
            [
                "title" => "Technical hooded anorak jacket",
                "description" => "Water-resistant anorak jacket with technical fabric. Features adjustable hood, front zipper, and multiple utility pockets.",
                "price" => 110,
                "discount" => 0,
                "details_id" => 1
            ],
            [
                "title" => "Baggy jacquard jeans",
                "description" => "Fashion-forward jeans with jacquard patterned fabric. Loose baggy fit with elastic waistband for maximum comfort.",
                "price" => 85,
                "discount" => 0,
                "details_id" => 2
            ],
            [
                "title" => "Baggy jogger jeans",
                "description" => "Hybrid jeans combining jogger comfort with denim style. Features elastic cuffs and multiple pockets for functionality.",
                "price" => 79,
                "discount" => 0,
                "details_id" => 2
            ],
            [
                "title" => "Baggy printed jeans",
                "description" => "Statement jeans with all-over print design. Oversized fit with distressed details for urban streetwear look.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 2
            ],
            [
                "title" => "Balloon fit baggy jeans",
                "description" => "Ultra-wide leg jeans with balloon silhouette. High waist design with exaggerated volume through the leg.",
                "price" => 92,
                "discount" => 0,
                "details_id" => 2
            ],
            [
                "title" => "Faded-effect skater fit jeans",
                "description" => "Vintage-inspired jeans with faded wash and relaxed skater fit. Medium rise with slightly tapered leg.",
                "price" => 75,
                "discount" => 0,
                "details_id" => 2
            ],
            [
                "title" => "Flared jeans",
                "description" => "70s revival flared jeans with dramatic leg opening. Stretch denim for comfort with retro styling.",
                "price" => 88,
                "discount" => 0,
                "details_id" => 2
            ],
            [
                "title" => "Loose-fit baggy jeans",
                "description" => "Extremely loose fit jeans with dropped crotch. Heavyweight denim with raw hem details.",
                "price" => 82,
                "discount" => 0,
                "details_id" => 2
            ],
            [
                "title" => "Skinny jeans",
                "description" => "Classic skinny fit jeans made with stretch denim for comfort. Perfect for casual wear with any top.",
                "price" => 69,
                "discount" => 0,
                "details_id" => 2
            ],
            [
                "title" => "Super baggy jeans",
                "description" => "Extreme oversized jeans with exaggerated proportions. Multiple pocket detailing and raw edge finishes.",
                "price" => 95,
                "discount" => 0,
                "details_id" => 2
            ],
            [
                "title" => "super skinny ripped jeans",
                "description" => "Ultra-slim fit jeans with distressed detailing. Heavy stretch fabric with multiple rips and tears.",
                "price" => 78,
                "discount" => 0,
                "details_id" => 2
            ],
            [
                "title" => "Embroidered short sleeve boxy fit shirt",
                "description" => "Contemporary boxy fit shirt with intricate embroidery details. Short sleeves with button-front closure.",
                "price" => 65,
                "discount" => 0,
                "details_id" => 3
            ],
            [
                "title" => "Oversize short sleeve poplin shirt",
                "description" => "Breathable poplin oversize shirt with dropped shoulders. Relaxed fit with curved hemline.",
                "price" => 59,
                "discount" => 0,
                "details_id" => 3
            ],
            [
                "title" => "Relaxed fit short sleeve shirt",
                "description" => "Casual short sleeve shirt with easy relaxed fit. Made from lightweight cotton with button-front closure.",
                "price" => 55,
                "discount" => 0,
                "details_id" => 3
            ],
            [
                "title" => "Short sleeve boxy tailored fit shirt",
                "description" => "Structured boxy shirt with tailored details. Short sleeves with contrast interior stitching.",
                "price" => 62,
                "discount" => 0,
                "details_id" => 3
            ],
            [
                "title" => "Short sleeve denim shirt",
                "description" => "Classic denim shirt in short sleeve version. Medium wash with pearl snap buttons.",
                "price" => 68,
                "discount" => 0,
                "details_id" => 3
            ],
            [
                "title" => "Textured short sleeve shirt",
                "description" => "Unique textured fabric shirt with short sleeves. Subtle pattern with button-front placket.",
                "price" => 59,
                "discount" => 0,
                "details_id" => 3
            ],
            [
                "title" => "Contrast sweater",
                "description" => "Knit sweater with bold contrast trim details. Ribbed cuffs and hem with crew neckline.",
                "price" => 79,
                "discount" => 0,
                "details_id" => 4
            ],
            [
                "title" => "Mesh boxy fit sweater",
                "description" => "Open-knit mesh sweater with oversized boxy silhouette. Lightweight with dropped shoulders.",
                "price" => 85,
                "discount" => 0,
                "details_id" => 4
            ],
            [
                "title" => "Ripped rustic boxy fit sweater",
                "description" => "Distressed knit sweater with rustic texture. Oversized fit with intentional frayed details.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 4
            ],
            [
                "title" => "Cars boxy fit hooded sweatshirt",
                "description" => "Nostalgic graphic hoodie featuring vintage car print. Boxy fit with kangaroo pocket.",
                "price" => 65,
                "discount" => 0,
                "details_id" => 5
            ],
            [
                "title" => "Cropped boxy fit zip-up hoodie",
                "description" => "Modern cropped hoodie with full zip front. Oversized fit with ribbed trims.",
                "price" => 69,
                "discount" => 0,
                "details_id" => 5
            ],
            [
                "title" => "Hoodie",
                "description" => "Classic pullover hoodie with adjustable drawstring hood. Made from soft cotton blend fabric.",
                "price" => 59,
                "discount" => 0,
                "details_id" => 5
            ],
            [
                "title" => "Polo collar sweatshirt",
                "description" => "Elevated sweatshirt with polo collar detail. Structured neckline with button placket.",
                "price" => 62,
                "discount" => 0,
                "details_id" => 5
            ],
            [
                "title" => "Printed sweatshirt with polo collar",
                "description" => "Graphic print sweatshirt with polo collar styling. Contrast panel details on sleeves.",
                "price" => 68,
                "discount" => 0,
                "details_id" => 5
            ],
            [
                "title" => "Printed sweatshirt with zip",
                "description" => "Half-zip sweatshirt with all-over print design. Stand collar with zip-front closure.",
                "price" => 72,
                "discount" => 0,
                "details_id" => 5
            ],
            [
                "title" => "Balloon fit printed trousers",
                "description" => "Statement trousers with exaggerated balloon silhouette. All-over print design with elastic waist.",
                "price" => 95,
                "discount" => 0,
                "details_id" => 6
            ],
            [
                "title" => "Flared plush baggy trousers",
                "description" => "Luxurious plush fabric trousers with wide flared legs. High waist with belt loops.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 6
            ],
            [
                "title" => "Flowing baggy jogger trousers",
                "description" => "Hybrid trousers combining jogger comfort with wide leg flow. Elastic cuffs with drawstring waist.",
                "price" => 82,
                "discount" => 0,
                "details_id" => 6
            ],
            [
                "title" => "Plush balloon fit trousers",
                "description" => "Soft plush fabric trousers with voluminous balloon shape. Elasticated waistband for comfort.",
                "price" => 92,
                "discount" => 0,
                "details_id" => 6
            ],
            [
                "title" => "Super baggy parachute trousers",
                "description" => "Ultra-wide leg trousers with parachute silhouette. Multiple utility pockets with drawstring waist.",
                "price" => 98,
                "discount" => 0,
                "details_id" => 6
            ],
            [
                "title" => "Super baggy printed trousers",
                "description" => "Oversized trousers with bold all-over print. Dropped crotch with extreme wide legs.",
                "price" => 95,
                "discount" => 0,
                "details_id" => 6
            ],
            [
                "title" => "Super baggy trousers with detachable detail",
                "description" => "Innovative design with removable panel details. Extreme wide leg with adjustable elements.",
                "price" => 105,
                "discount" => 0,
                "details_id" => 6
            ],
            [
                "title" => "Sweatshirt and wide-leg trousers pack",
                "description" => "Coordinated set including matching sweatshirt and wide-leg trousers. Elastic waist with drawstring.",
                "price" => 120,
                "discount" => 0,
                "details_id" => 6
            ],
            [
                "title" => "Textured wide-leg trousers",
                "description" => "Tailored wide-leg trousers with textured fabric. High waist with front pleat detailing.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 6
            ],
            [
                "title" => "Wide-leg linen blend jogger trousers",
                "description" => "Breathable linen blend trousers with jogger details. Wide leg with elastic ankle cuffs.",
                "price" => 85,
                "discount" => 0,
                "details_id" => 6
            ],
            [
                "title" => "Faded short sleeve T-shirt",
                "description" => "Vintage wash tee with faded graphic print. Relaxed fit with crew neckline.",
                "price" => 32,
                "discount" => 0,
                "details_id" => 7
            ],
            [
                "title" => "Faded-effect short sleeve ripped T-shirt",
                "description" => "Distressed tee with intentional fading and rips. Oversized fit with raw edge hem.",
                "price" => 35,
                "discount" => 0,
                "details_id" => 7
            ],
            [
                "title" => "Oversize short sleeve T-shirt",
                "description" => "Extra roomy tee with dropped shoulders. Extended length with curved hem.",
                "price" => 29,
                "discount" => 0,
                "details_id" => 7
            ],
            [
                "title" => "Rustic polo shirt",
                "description" => "Textured polo shirt with rustic washed effect. Button placket with ribbed collar.",
                "price" => 39,
                "discount" => 0,
                "details_id" => 7
            ],
            [
                "title" => "Short sleeve cropped piqué T-shirt",
                "description" => "Structured piqué cotton cropped tee. Banded hem with short sleeves.",
                "price" => 34,
                "discount" => 0,
                "details_id" => 7
            ],
            [
                "title" => "Short sleeve sport print T-shirt",
                "description" => "Athletic-inspired tee with sporty graphic print. Regular fit with crew neck.",
                "price" => 29,
                "discount" => 0,
                "details_id" => 7
            ],
            [
                "title" => "Slub effect print sleeveless T-shirt",
                "description" => "Textured slub fabric tank with all-over print. Muscle fit with wide armholes.",
                "price" => 27,
                "discount" => 0,
                "details_id" => 7
            ],
            [
                "title" => "Textured polo shirt",
                "description" => "Elevated polo shirt with unique fabric texture. Three-button placket with ribbed trim.",
                "price" => 42,
                "discount" => 0,
                "details_id" => 7
            ],
            [
                "title" => "Leather Ankle Boots",
                "description" => "Stylish leather ankle boots with durable rubber sole. Perfect for urban style.",
                "price" => 149,
                "discount" => 0,
                "details_id" => 8
            ],
            [
                "title" => "buckled flat slider sandals",
                "description" => "Minimalist sandals with adjustable buckle straps. Lightweight sole for summer comfort.",
                "price" => 59,
                "discount" => 0,
                "details_id" => 9
            ],
            [
                "title" => "Deck shoes with keyring detail",
                "description" => "Classic deck shoes with nautical-inspired keychain detail. Non-marking rubber sole.",
                "price" => 99,
                "discount" => 0,
                "details_id" => 10
            ],
            [
                "title" => "Deck shoes with moc toe",
                "description" => "Traditional moc-toe deck shoes in premium leather. Stitched detailing with contrast sole.",
                "price" => 109,
                "discount" => 0,
                "details_id" => 10
            ],
            [
                "title" => "Fringed loafers with tassel",
                "description" => "Sophisticated loafers with fringe and tassel details. Leather upper with cushioned insole.",
                "price" => 119,
                "discount" => 0,
                "details_id" => 10
            ],
            [
                "title" => "Loafers with thin sole",
                "description" => "Sleek minimalist loafers with slim profile sole. Unlined leather for flexible fit.",
                "price" => 95,
                "discount" => 0,
                "details_id" => 10
            ],
            [
                "title" => "Trainers with thin soles",
                "description" => "Low-profile sneakers with minimal cushioning. Breathable mesh upper with rubber sole.",
                "price" => 79,
                "discount" => 0,
                "details_id" => 11
            ],
            [
                "title" => "Contrast studded sole trainers",
                "description" => "Bold sneakers with studded rubber sole and contrast paneling. Lace-up closure.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 11
            ],
            [
                "title" => "Contrast sneakers",
                "description" => "High-contrast colorblock sneakers with padded collar. Durable rubber outsole.",
                "price" => 85,
                "discount" => 0,
                "details_id" => 11
            ],
            [
                "title" => "Chunky LEATHER techno trainers",
                "description" => "Futuristic leather sneakers with exaggerated platform sole. OrthoLite® insole technology.",
                "price" => 149,
                "discount" => 0,
                "details_id" => 12
            ],
            [
                "title" => "Chunky skater trainers",
                "description" => "Skate-inspired sneakers with thick cushioned sole. Suede and canvas upper.",
                "price" => 129,
                "discount" => 0,
                "details_id" => 12
            ],
            [
                "title" => "LEATHER skater trainers",
                "description" => "Premium leather skate shoes with padded collar. Shock-absorbing rubber sole.",
                "price" => 139,
                "discount" => 0,
                "details_id" => 12
            ],
            [
                "title" => "Minimalist lace-up trainers",
                "description" => "Clean-lined sneakers with simple lace-up design. Leather upper with minimal branding.",
                "price" => 119,
                "discount" => 0,
                "details_id" => 12
            ],
            [
                "title" => "Multi-layered trainers",
                "description" => "Deconstructed sneakers with layered panel construction. Textured materials throughout.",
                "price" => 135,
                "discount" => 0,
                "details_id" => 12
            ],
            [
                "title" => "Multi-piece skate trainers",
                "description" => "Skateboard-inspired shoes with multiple material panels. Reinforced toe cap.",
                "price" => 125,
                "discount" => 0,
                "details_id" => 12
            ],
            [
                "title" => "Retro chunky trainers",
                "description" => "90s-inspired sneakers with chunky silhouette. Contrast color blocking.",
                "price" => 119,
                "discount" => 0,
                "details_id" => 12
            ],
            [
                "title" => "Retro trainers",
                "description" => "Vintage-style running shoes with retro colorway. Cushioned midsole for comfort.",
                "price" => 109,
                "discount" => 0,
                "details_id" => 12
            ],
            // Women's Products
            [
                "title" => "Asymmetric midi dress with ring detail",
                "description" => "Elegant asymmetrical hem dress with metal ring accents. Flowy fabric with wrap-style bodice.",
                "price" => 99,
                "discount" => 0,
                "details_id" => 13
            ],
            [
                "title" => "Asymmetric tulle midi dress",
                "description" => "Romantic tulle dress with uneven hemline. Layered skirt with fitted bodice.",
                "price" => 119,
                "discount" => 0,
                "details_id" => 13
            ],
            [
                "title" => "Halter mini dress with ring detail",
                "description" => "Sexy halter neck mini with metal ring strap details. Bodycon fit with ruched sides.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 13
            ],[
                "title" => "Printed waffle-knit mini dress",
                "description" => "Textured waffle knit dress with all-over print. Short sleeves with crew neckline.",
                "price" => 79,
                "discount" => 0,
                "details_id" => 13
            ],
            [
                "title" => "Ruffled mini dress",
                "description" => "Feminine mini with cascading ruffle details. Smocked bodice with flared skirt.",
                "price" => 95,
                "discount" => 0,
                "details_id" => 13
            ],[
                "title" => "Textured printed midi dress",
                "description" => "Unique textured fabric dress with abstract print. Button-front closure with tie waist.",
                "price" => 109,
                "discount" => 0,
                "details_id" => 13
            ],
            
            [
                "title" => "Buttoned blazer",
                "description" => "Sophisticated structured blazer with peak lapels. Dual button closure with flap pockets.",
                "price" => 129,
                "discount" => 0,
                "details_id" => 14
            ],
            [
                "title" => "Cropped denim jacket",
                "description" => "Stylish cropped denim jacket with raw hem edges. Classic five-pocket styling.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 14
            ],
            [
                "title" => "Faux leather oversize jacket",
                "description" => "Edgy vegan leather jacket with exaggerated proportions. Asymmetric zip closure.",
                "price" => 109,
                "discount" => 0,
                "details_id" => 14
            ],
            [
                "title" => "Soft cropped jacket",
                "description" => "Lightweight cropped jacket with drapey silhouette. Hidden snap button closure.",
                "price" => 95,
                "discount" => 0,
                "details_id" => 14
            ],
            [
                "title" => "Boyfriend jeans",
                "description" => "Relaxed fit jeans with masculine boyfriend styling. Medium wash with distressed details.",
                "price" => 79,
                "discount" => 0,
                "details_id" => 15
            ],
            [
                "title" => "Flared jeans",
                "description" => "70s-inspired flared jeans with high waist. Stretch denim with vintage wash.",
                "price" => 85,
                "discount" => 0,
                "details_id" => 15
            ],
            [
                "title" => "Multi-pocket cargo jeans",
                "description" => "Utilitarian jeans with multiple cargo pockets. Relaxed fit with adjustable waist tabs.",
                "price" => 92,
                "discount" => 0,
                "details_id" => 15
            ],
            [
                "title" => "Shimmery '90s wide-leg jeans",
                "description" => "Metallic finish wide leg jeans with 90s silhouette. High waist with belt loops.",
                "price" => 99,
                "discount" => 0,
                "details_id" => 15
            ],
            [
                "title" => "Studded barrel jeans",
                "description" => "Statement jeans with studded detailing. Barrel leg shape with raw hem.",
                "price" => 109,
                "discount" => 0,
                "details_id" => 15
            ],
            [
                "title" => "Wide-leg low-waist jeans",
                "description" => "Y2K-inspired low rise wide leg jeans. Light wash with whiskering details.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 15
            ],
            [
                "title" => "Fitted shirt with flared sleeves",
                "description" => "Tailored shirt with dramatic flared cuffs. Fitted bodice with button-front closure.",
                "price" => 69,
                "discount" => 0,
                "details_id" => 16
            ],
            [
                "title" => "Long sleeve oversize poplin shirt",
                "description" => "Breathable oversized shirt in crisp poplin. Dropped shoulders with curved hem.",
                "price" => 59,
                "discount" => 0,
                "details_id" => 16
            ],
            [
                "title" => "Off-the-shoulder blouse with tie detail",
                "description" => "Romantic blouse with off-shoulder neckline. Flowy sleeves with tie accents.",
                "price" => 65,
                "discount" => 0,
                "details_id" => 16
            ],
            [
                "title" => "Short sleeve shirt with Peter pan collar",
                "description" => "Preppy-inspired shirt with rounded peter pan collar. Short sleeves with front pleats.",
                "price" => 55,
                "discount" => 0,
                "details_id" => 16
            ],
            [
                "title" => "Textured rustic short sleeve shirt",
                "description" => "Distressed-look shirt with rustic texture. Button-front with chest pocket.",
                "price" => 62,
                "discount" => 0,
                "details_id" => 16
            ],
            [
                "title" => "Buttoned cardigan with top",
                "description" => "Coordinated set featuring button-front cardigan and matching cami. Ribbed trim details.",
                "price" => 79,
                "discount" => 0,
                "details_id" => 17
            ],
            [
                "title" => "Cable-knit Bardot cardigan with zip",
                "description" => "Chunky knit cardigan with off-shoulder styling. Full zip front closure.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 17
            ],
            [
                "title" => "Cable-knit zip cardigan with polo collar",
                "description" => "Textured cable knit cardigan with polo neckline. Zip-front with ribbed cuffs.",
                "price" => 85,
                "discount" => 0,
                "details_id" => 17
            ],
            [
                "title" => "Cropped V-neck sweater",
                "description" => "Shortened sweater with deep V-neckline. Ribbed trim with stretchy fabric.",
                "price" => 65,
                "discount" => 0,
                "details_id" => 17
            ],
            [
                "title" => "Oversize V-neck sweater",
                "description" => "Extra roomy sweater with exaggerated V-neck. Dropped shoulders with long sleeves.",
                "price" => 75,
                "discount" => 0,
                "details_id" => 17
            ],[
                "title" => "Round neck sweater",
                "description" => "Classic crewneck sweater in soft knit fabric. Regular fit with ribbed trim.",
                "price" => 69,
                "discount" => 0,
                "details_id" => 17
            ],
            [
                "title" => "Rustic cropped openwork sweater",
                "description" => "Distressed-look cropped sweater with lace detailing. Raw edge finishes throughout.",
                "price" => 79,
                "discount" => 0,
                "details_id" => 17
            ],
            
            [
                "title" => "Cars hoodie",
                "description" => "Graphic hoodie featuring vintage car print. Relaxed fit with kangaroo pocket.",
                "price" => 59,
                "discount" => 0,
                "details_id" => 18
            ],
            [
                "title" => "Corvette hoodie",
                "description" => "Sporty hoodie with Corvette emblem graphic. Fleece lining with drawstring hood.",
                "price" => 65,
                "discount" => 0,
                "details_id" => 18
            ],
            [
                "title" => "Oversize hoodie",
                "description" => "Extra roomy hoodie with dropped shoulders. Extended length with ribbed cuffs.",
                "price" => 62,
                "discount" => 0,
                "details_id" => 18
            ],
            [
                "title" => "Printed hoodie",
                "description" => "Statement hoodie with all-over graphic print. Regular fit with front pouch pocket.",
                "price" => 69,
                "discount" => 0,
                "details_id" => 18
            ],
            [
                "title" => "Ripped hoodie",
                "description" => "Edgy hoodie with intentional distressing. Raw edge hems with oversized fit.",
                "price" => 72,
                "discount" => 0,
                "details_id" => 18
            ],
            [
                "title" => "Zip-up hoodie",
                "description" => "Classic zip-front hoodie with stand collar. Side seam pockets with ribbed trim.",
                "price" => 65,
                "discount" => 0,
                "details_id" => 18
            ],
            [
                "title" => "Linen blend trousers with an elasticated waistband",
                "description" => "Breathable linen blend pants with comfortable elastic waist. Wide leg with front pleats.",
                "price" => 79,
                "discount" => 0,
                "details_id" => 19
            ],
            [
                "title" => "Plush barrel printed trousers",
                "description" => "Soft plush fabric trousers with barrel leg shape. All-over print with elastic waist.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 19
            ],
            [
                "title" => "Plush barrel trousers",
                "description" => "Luxurious plush trousers with voluminous barrel silhouette. High waist styling.",
                "price" => 92,
                "discount" => 0,
                "details_id" => 19
            ],
            [
                "title" => "Straight-leg trousers",
                "description" => "Tailored straight leg trousers with crease detail. Mid-rise with side slit pockets.",
                "price" => 85,
                "discount" => 0,
                "details_id" => 19
            ],
            [
                "title" => "Tailored fit balloon trousers",
                "description" => "Structured balloon leg trousers with high waist. Pleated front with belt loops.",
                "price" => 99,
                "discount" => 0,
                "details_id" => 19
            ],
            [
                "title" => "Technical balloon parachute trousers",
                "description" => "Innovative technical fabric trousers with parachute silhouette. Multiple utility pockets.",
                "price" => 109,
                "discount" => 0,
                "details_id" => 19
            ],
            [
                "title" => "Long sleeved button neck top",
                "description" => "Elegant button-up top with neck tie detail. Long sleeves with French cuffs.",
                "price" => 49,
                "discount" => 0,
                "details_id" => 20
            ],
            [
                "title" => "Oversize short sleeve T-shirt with feathers",
                "description" => "Graphic tee with feather motif print. Oversized fit with dropped shoulders.",
                "price" => 39,
                "discount" => 0,
                "details_id" => 20
            ],
            [
                "title" => "Oversized short-sleeved cotton T-shirt",
                "description" => "Basic cotton tee with relaxed oversized fit. Crew neck with short sleeves.",
                "price" => 29,
                "discount" => 0,
                "details_id" => 20
            ],
            [
                "title" => "Short sleeve Billie Eilish print T-shirt",
                "description" => "Official artist graphic tee featuring Billie Eilish print. Regular fit.",
                "price" => 45,
                "discount" => 0,
                "details_id" => 20
            ],
            [
                "title" => "Short sleeve Billie Eilish print T-shirty",
                "description" => "Alternative Billie Eilish graphic tee with distressed print effect. Oversized fit.",
                "price" => 42,
                "discount" => 0,
                "details_id" => 20
            ],
            [
                "title" => "Short sleeve crew neck T-shirt",
                "description" => "Classic crew neck tee in soft cotton jersey. Regular fit with shoulder seams.",
                "price" => 25,
                "discount" => 0,
                "details_id" => 20
            ],
            [
                "title" => "Short sleeve Sabrina Carpenter print T-shirt",
                "description" => "Official Sabrina Carpenter tour merchandise tee. Standard fit with crew neck.",
                "price" => 45,
                "discount" => 0,
                "details_id" => 20
            ],
            [
                "title" => "Short sleeve Sabrina Carpenter print T-shirtt",
                "description" => "Limited edition Sabrina Carpenter graphic tee. Vintage wash with soft hand feel.",
                "price" => 48,
                "discount" => 0,
                "details_id" => 20
            ],
            [
                "title" => "Block heel boots",
                "description" => "Chunky heel ankle boots with square toe. Leather upper with side zip.",
                "price" => 129,
                "discount" => 0,
                "details_id" => 21
            ],
            [
                "title" => "Mid-calf flat biker boots",
                "description" => "Edgy biker-inspired boots with harness details. Mid-calf height with flat sole.",
                "price" => 119,
                "discount" => 0,
                "details_id" => 21
            ],
            [
                "title" => "Sock-style platform ankle boots",
                "description" => "Stretchy sock-like ankle boots with hidden platform. Pointed toe with back zip.",
                "price" => 109,
                "discount" => 0,
                "details_id" => 21
            ],
            [
                "title" => "Chunky sole deck shoes",
                "description" => "Modern take on classic deck shoes with thick platform sole. Lace-up closure.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 22
            ],
            [
                "title" => "Loafers with gathered detail",
                "description" => "Sophisticated loafers with ruched vamp detailing. Leather upper with cushioned footbed.",
                "price" => 95,
                "discount" => 0,
                "details_id" => 22
            ],
            [
                "title" => "Block heel slingback shoes",
                "description" => "Elegant slingbacks with chunky block heel. Pointed toe with elastic back strap.",
                "price" => 99,
                "discount" => 0,
                "details_id" => 23
            ],
            [
                "title" => "Kitten heel shoes",
                "description" => "Delicate pumps with slender kitten heel. Pointed toe with smooth leather upper.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 23
            ],
            [
                "title" => "Monogram kitten heel shoes",
                "description" => "Branded monogram kitten heel pumps. Leather upper with signature logo detail.",
                "price" => 109,
                "discount" => 0,
                "details_id" => 23
            ],
            [
                "title" => "Slingback high-heel football shoes",
                "description" => "Unique football-inspired slingback heels. Cleat-style sole with stiletto heel.",
                "price" => 119,
                "discount" => 0,
                "details_id" => 23
            ],
            [
                "title" => "Flat lace-up sandals with metal detail",
                "description" => "Grecian-inspired lace-up sandals with metallic accents. Flat sole with ankle ties.",
                "price" => 79,
                "discount" => 0,
                "details_id" => 24
            ],
            [
                "title" => "High-heel slingback wedge sandals",
                "description" => "Elevated wedge sandals with slingback strap. Open toe with braided details.",
                "price" => 99,
                "discount" => 0,
                "details_id" => 24
            ],[
                "title" => "Jute platform sandals",
                "description" => "Eco-friendly jute-wrapped platform sandals. Ankle strap with buckle closure.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 24
            ],
            [
                "title" => "Kitten heel sandals with floral detail",
                "description" => "Delicate sandals with floral embellishments. Slim kitten heel with ankle strap.",
                "price" => 85,
                "discount" => 0,
                "details_id" => 24
            ],
            [
                "title" => "Studded flat sandals",
                "description" => "Edgy flat sandals with studded trim. Wide straps with adjustable buckles.",
                "price" => 79,
                "discount" => 0,
                "details_id" => 24
            ],
            
            [
                "title" => "Animal print skater trainers",
                "description" => "Wild print skate shoes with padded collar. Durable rubber sole with grip tread.",
                "price" => 89,
                "discount" => 0,
                "details_id" => 25
            ],
            [
                "title" => "Chunky skater trainers",
                "description" => "Thick-soled skate-inspired sneakers. Suede and canvas upper with lace-up front.",
                "price" => 95,
                "discount" => 0,
                "details_id" => 25
            ],
            [
                "title" => "Chunky sole trainers",
                "description" => "Ultra-chunky platform sneakers with bold sole. Breathable mesh upper.",
                "price" => 109,
                "discount" => 0,
                "details_id" => 25
            ],
            [
                "title" => "High-top trainers with inner wedge",
                "description" => "Elevating high-top sneakers with hidden wedge. Lace-up closure with padded collar.",
                "price" => 119,
                "discount" => 0,
                "details_id" => 25
            ],
            [
                "title" => "Multi-piece sneakers",
                "description" => "Deconstructed sneakers with layered panel design. Contrast materials throughout.",
                "price" => 99,
                "discount" => 0,
                "details_id" => 25
            ],
            
        ]);
    }
}