<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SocialAuthController extends Controller
{
    public function redirectToProvider(Request $request){
        return Socialite::drive("google")->user();
        
    }
    public function handleCallback(Request $request){

    }
}
