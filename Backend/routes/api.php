<?php

use App\Http\Controllers\authController;
use App\Http\Controllers\optController;
use App\Http\Controllers\otpController;
use App\Http\Controllers\useController;
use App\Http\Controllers\UserController;
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
Route::middleware('authenticateApiKey')->group(function(){
    // auth Controller
    Route::controller(authController::class)->group(function(){
        // Add user
        Route::post("/register","store");
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
            Route::delete("admin/delete/{id}","delete");
        });
    });
    // otp Controller
    Route::controller(otpController::class)->group(function(){
        Route::middleware("auth:sanctum")->group(function(){
            Route::post("/send","sendOtp");
            Route::put("/storeotp","storeOtp");
        });
    });
});
