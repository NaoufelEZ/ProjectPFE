<?php

use App\Http\Controllers\authController;
use App\Http\Controllers\optController;
use App\Http\Controllers\otpController;
use App\Http\Controllers\useController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
    // user Controller
    Route::controller(authController::class)->group(function(){
        // Add user
        Route::post("/register","store");
        Route::post("/login","login");
        Route::middleware("auth:sanctum")->group(function(){
            Route::get("/logout","logout");
            Route::get("/user","user");
        });
    });
    Route::controller(useController::class)->group(function(){
        // Add user
        Route::middleware(["auth:sanctum","checkAdmin"])->group(function(){
            Route::get("/users","index");
        });
    });
    Route::controller(otpController::class)->group(function(){
        Route::middleware("auth:sanctum")->group(function(){
            Route::post("/send","sendOtp");
            Route::post("/storeotp","storeOtp");
        });
    });
});
