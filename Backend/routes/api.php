<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\authController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\optController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\otpController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\useController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;
use App\Models\Addresse;
use App\Models\Brand;
use Carbon\Carbon;
use Illuminate\Http\Request;
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
            Route::put("user/profile","profile");
            Route::put("user/password","password");
            Route::post("user/avatar","avatar");
        });
        // Admin
        Route::middleware(["auth:sanctum","checkAdmin"])->group(function(){
            // Add user
            Route::get("/users","index");
            Route::put("admin/user/{id}","update");
            Route::post("admin/user/add","store");
            Route::delete("admin/delete/{id}","delete");
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
        Route::get("/products","index");
        Route::get("products/product/{id}","product");
        Route::middleware(["auth:sanctum","checkAdminProductManager"])->group(function(){
            Route::post("/product/add","store");
            Route::post("/product/delete/{id}","delete");

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
    // Comments
    Route::controller(CommentController::class)->group(function(){
        Route::get("/product/{id}/comments","index");
        Route::middleware("auth:sanctum")->group(function(){
            Route::post("/product/{id}/comment/add","store");
            Route::delete("/product/{id}/comment/delete/{id}","delete");
            Route::put("/product/{id}/comment/update/{id}","update");  
        });
        Route::middleware(["auth:sanctum","checkAdmin"])->group(function(){
            Route::get("/comments","all");
            Route::put("/product/{id}/comment/banned/{id}","banned");  
        });
    });
    // Order
    Route::controller(OrderController::class)->group(function(){
        // users 
        Route::middleware("auth:sanctum")->group(function(){
            Route::post("/order/add","store");
        });
        // admin
        Route::middleware(["auth:sanctum","checkAdminProductManager"])->group(function(){
            Route::get("orders","index");
            Route::put("order/update/{id}","update");
        });

    });
    // category
    Route::controller(CategoryController::class)->group(function(){
        // private
        Route::middleware(["auth:sanctum","checkAdminProductManager"])->group(function(){
            // category
            Route::post("admin/category/add","storeCategory");
            Route::put("admin/category/update/{id}","updateCategory");
            Route::delete("admin/category/delete/{id}","deleteCategory");
            Route::get("admin/category/{id}","getCategory");

            // subcategory
            Route::post("admin/subcategory/add","storeSubcategory");
            Route::put("admin/subcategory/update/{id}","updateSubcategory");
            Route::delete("admin/subcategory/delete/{id}","deleteSubcategory");
            Route::get("admin/subcategory/{id}","getSubcategory");
            // category details
            Route::post("admin/categorydetails/add","storeCategorydetails");
            Route::put("admin/categorydetails/update/{id}","updateCategorydetails");
            Route::delete("admin/categorydetails/delete/{id}","deleteCategorydetails");
            Route::get("admin/categorydetails/{id}","getCategorydetails");
        });
        // public
        Route::get("category","showCategories");
        Route::get("category/{cat}","getCategory");
        Route::get("category/{cat}/subcategory","showSubcategory");
        Route::get("category/details","showCategoryDetails");
        Route::get("category/{cat}/subcategory/details","showDetailsByCategory");
        Route::get("category/{cat}/subcategory/{id_sub}","showDetails");
    });
    // brand
    Route::controller(BrandController::class)->group(function(){
        // admin
        Route::middleware(["auth:sanctum","checkAdminProductManager"])->group(function(){
            Route::post("/brand/add","store");
            Route::put("/brand/update{id}","update");
            Route::delete("/brand/delete/{id}","delete");
            Route::get("/brand/{id}","brand");
        });
        // public
        
    });

});
