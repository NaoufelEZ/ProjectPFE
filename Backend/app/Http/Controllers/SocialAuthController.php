<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    public function redirectToProvider(){
        return Socialite::driver("google")->redirect(); 
        
    }
    public function handleCallback(){
        $google_user = Socialite::driver("google")->user();
        $existingEmailUser = User::where('email', $google_user->email)->whereNull("google_id")->first();
        if($existingEmailUser){
            return response()->json(["message"=>"Email Already Used","status"=>403],403);
        }
        $existingGoogleUser  = User::where('google_id', $google_user->getId())->first();

        if($existingGoogleUser){
            $token = $existingGoogleUser->createToken("auth-token")->plainTextToken;
            return redirect("http://localhost:3000/google/account/$token");
        }
        $name = explode(" ",$google_user->getName());
        $last_name = isset($name[1]) ? $name[1] : "";
        User::create([
            "first_name"=>$name[0],
            "last_name"=>$last_name,
            "email"=>$google_user->getEmail(),
            "email_verify"=>1,
            "google_id"=>$google_user->getId(),
            "google_token"=>$google_user->token,
        ]);
        return redirect("http://localhost:3000/google/new/account/$google_user->token");
    }
    public function clientFromGoogleToken($token){
        try{
            $user = User::where("google_token",$token)->first();

            return response()->json(["message"=>"data get","data"=>$user,"status"=>200],200);

        }catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422],422);

        }
    }
    public function updateClientFromGoogleToken(Request $request){
        try{
            $validUser = $request->validate([
                "first_name"=>"required|string|min:3",
                "last_name"=>"required|string|min:3",
                "phone"=>"required|digits:8",
                "token"=>"required|string",
            ]);
            if($validUser){
                User::where("google_token",$validUser["token"])->update([
                    "first_name"=>$validUser["first_name"],
                    "last_name"=>$validUser["last_name"],
                    "phone"=>$validUser["phone"],
                ]);
                return response()->json(["data"=>"User Add","status"=>201], 201);
            }
        }catch(ValidationException $e){
            return response()->json(["data"=>$e->errors(),"status"=>422], 422);
        }
    }
}
