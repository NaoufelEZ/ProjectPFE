<?php

use App\Http\Controllers\authController;
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
        Route::get("/logout","logout")->middleware("auth:sanctum");
    });
    Route::controller(useController::class)->group(function(){
        // Add user
        Route::get("/users","index");
    });
});
