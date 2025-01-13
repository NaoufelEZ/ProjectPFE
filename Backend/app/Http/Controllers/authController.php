<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException as ValidationException;

class authController extends Controller
{
    public function store(request $request){
        try{
        $validUser = $request->validate([
            "first_name"=>"required|String|min:3",
            "last_name"=>"required|String|min:3",
            "email"=>"required|email|unique:users",
            "password"=>"required|String|min:6",
            "phone"=>"required|digits:8",
        ]);
        if($validUser){
            User::create([
                "first_name"=>$validUser["First_name"],
                "last_name"=>$validUser["Last_name"],
                "email"=>$validUser["Email"],
                "password"=>Hash::make($validUser["Password"]),
                "phone"=>$validUser["Phone"],
                "role"=>"Client",
            ]);
            return response()->json(["data"=>"user add","status"=>"200"], 200);
        }
    }catch(ValidationException $e){
        return response()->json(["data"=>$e->errors(),"status"=>"422"], 422);
    }
    }
    public function login(request $request){
        $user = $request->only("email","password");
        $auth = Auth::attempt($user);
        if(!$auth){
            return response()->json(["msg"=>"Unauthorized","status"=>401],401);
        }
        $userV = Auth::user();
        $token =  $userV->createToken("auth-token")->plainTextToken;
        return response()->json(["data"=>$userV,"token"=>$token,"status"=>200],200);
    }
    public function logout(request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json(['msg' => 'Successfully logged out','status'=>200], 200);
    }
    public function user(request $request){
        $currentUser = $request->user();
        return response()->json(["data"=>$currentUser,"status"=>200],200);
    }
}
