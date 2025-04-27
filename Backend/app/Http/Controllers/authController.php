<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException as ValidationException;

class authController extends Controller
{
    public function store(Request $request){
        try{
        $validUser = $request->validate([
            "first_name"=>"required|string|min:3",
            "last_name"=>"required|string|min:3",
            "email"=>"required|email|unique:users,email",
            "password"=>"required|string|min:6",
            "phone"=>"required|digits:8",
        ]);
        if($validUser){
            $user = User::create([
                "first_name"=>$validUser["first_name"],
                "last_name"=>$validUser["last_name"],
                "email"=>$validUser["email"],
                "password"=>Hash::make($validUser["password"]),
                "phone"=>$validUser["phone"],
                "role"=>"Client",
            ]);
            $newUserId = $user->id;
            $otpController = new otpController;
            $hash = $otpController->sendRegister($user->email, $user->first_name, $newUserId);
            return response()->json(["data"=>"User Add","hash"=>$hash,"status"=>201], 201);
        }
    }catch(ValidationException $e){
        return response()->json(["data"=>$e->errors(),"status"=>422], 422);
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
