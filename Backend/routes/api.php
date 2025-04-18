<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\authController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DeliveryCompanyController;
use App\Http\Controllers\optController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\otpController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpKernel\Profiler\Profile;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
// Route::get("/test/{id}",[otpController::class,"test"]);

Route::middleware('authenticateApiKey')->group(function(){
    // auth Controller
    Route::controller(authController::class)->group(function(){
        // register user
        Route::post("/register","store");
        // login
        Route::post("/login","login");
        Route::middleware("auth:sanctum")->group(function(){
            Route::get("/logout","logout");
            Route::get("/user","user");
        });
    });
    // user Controller
    Route::controller(UserController::class)->group(function(){
        // user
        Route::middleware("auth:sanctum")->group(function(){
            Route::put("user/update/profile","profile");
            Route::put("user/update/email","email");
            Route::put("user/update/email/verify","codeEmailVerify");
            Route::put("user/update/password","password");
            Route::delete("user/delete","userDelete");
        });
        // Admin
        Route::middleware(["auth:sanctum","checkAdmin"])->group(function(){
            // Add user
            Route::get("/users","index");
            Route::get("admin/user/{id}","user");
            Route::put("admin/user/update/{id}","update");
            Route::post("admin/user/add","store");
            Route::delete("admin/user/delete/{id}","delete");
        });
    });
    // otp Controller
    Route::controller(otpController::class)->group(function(){
        // email
        Route::post("/register_send","sendRegister");
        Route::put("/register_send_verify/{hash}","verifySendRegister");
        Route::get("/register_Url_verify/{hash}","verifyUrlRegister");
        Route::middleware("auth:sanctum")->group(function(){
            Route::post("/send","sendOtp");
            Route::post("/storeotp","storeOtp");
            Route::put("/store_otp","storeOtp");
        });
        // password
        Route::post("/password/seed","seedPassword");
        Route::put("/password_verify/{token}","passwordCodeVerify");
        Route::put("/password_change/{token}","passwordChange");
        Route::get("/password_verify_token/{token}","passwordTokenVerify");
        Route::put("/password/reseed/{token}","reSeedPassword");
    });
    // Products
    Route::controller(ProductController::class)->group(function(){
        // public
        Route::get("/products/{cat}/{subcat}/{detail}","index");
        Route::get("/products/{cat}/new","new");
        Route::get("/products/{cat}/{sub}","subcategory");
        Route::get("products/product/{id}","product");
        Route::get("/products","roleIndex");
        // private
        Route::middleware(["auth:sanctum","checkAdminProductManager"])->group(function(){
            Route::post("/product/add","store");
            Route::delete("/product/delete/{id}","delete");

        });
    });
    // addresses
    Route::controller(AddressController::class)->group(function(){
        Route::middleware("auth:sanctum")->group(function(){
            Route::post("/address/add","store");
            Route::get("/address","index");
            Route::get("/address/{id}","show");
            Route::put("/address/update/{id}","update");
            Route::delete("/address/delete/{id}","delete");
            Route::put("/address/default/update/{id}","default");
        });
    });

    // Wishlist
    Route::controller(WishlistController::class)->group(function(){
        Route::middleware("auth:sanctum")->group(function(){
            Route::get("wishlist","index");
            Route::post("wishlist/add/{id}","store");
            Route::delete("wishlist/delete/{id}","delete");
        });
    });
    // Order
    Route::controller(OrderController::class)->group(function(){
        // users 
        Route::middleware("auth:sanctum")->group(function(){
            Route::post("/order/add","store");
            Route::get("user/order","userOrder");
        });
        // admin
        Route::middleware(["auth:sanctum","checkAdminProductManager"])->group(function(){
            Route::get("orders","index");
            Route::get("order/{id}","getOrder");
            Route::put("order/update/{id}","update");
            Route::put("order/checked/{id}","checked");
        });

    });
    // category
    Route::controller(CategoryController::class)->group(function(){
        // private
        Route::middleware(["auth:sanctum","checkAdminProductManager"])->group(function(){
            // category
            Route::post("admin/category/add","storeCategory");
            Route::get("admin/category/{id}/subcategory","adminSubcategory");
            Route::put("admin/category/update/{id}","updateCategory");
            Route::delete("admin/category/delete/{id}","deleteCategory");
            Route::get("admin/category/{id}","getAdminCategory");
            // subcategory
            Route::post("admin/subcategory/add","storeSubcategory");
            Route::get("admin/subcategory","adminSubcategoryShow");
            Route::post("admin/subcategory/update/{id}","updateSubcategory");
            Route::get("admin/category/{id}/subcategory/{id_sub}","adminDetail");
            Route::delete("admin/subcategory/delete/{id}","deleteSubcategory");
            Route::get("admin/subcategory/{id}","getSubcategory");
            // category details
            Route::get("admin/category-details","adminCategoryDetailsShow");
            Route::post("admin/category-details/add","storeCategoryDetails");
            Route::post("admin/category-details/update/{id}","updateCategoryDetails");
            Route::delete("admin/category-details/delete/{id}","deleteCategoryDetails");
            Route::get("admin/category-details/{id}","getCategoryDetails");
        });
        // public
        Route::get("category","showCategories");
        Route::get("category/{cat}","getCategory");
        Route::get("category/{cat}/subcategory","showSubcategory");
        Route::get("category/details","showCategoryDetails");
        Route::get("category/{cat}/subcategory/details","showDetailsByCategory");
        Route::get("category/{cat}/subcategory/{sub}","showDetails");
    });
    // Delivery Company
    Route::controller(DeliveryCompanyController::class)->group(function(){
        Route::middleware(["auth:sanctum","checkAdmin"])->group(function(){
            Route::get("delivery-company","index");
            Route::post("delivery-company/add","store");
            Route::get("delivery-company/{id}","getCompany");
            Route::delete("delivery-company/delete/{id}","index");
            Route::put("delivery-company/update/{id}","index");
        });
    });

});
