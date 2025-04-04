<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Validation\ValidationException as ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // User Setting
    public function profile(request $request){
        $user = $request->user();
        try{
        $validUser = $request->validate([
            "first_name"=>"required|string|min:3",
            "last_name"=>"required|String|min:3",
            "email"=>"required|email|unique:users,email," . $user->id,
            "phone"=>"required|digits:8",
        ]);
        $emailCheck = $user->email == $validUser["email"];
            $user->update([
                "first_name"=>$validUser["first_name"],
                "last_name"=>$validUser["last_name"],
                "email"=>$validUser["email"],
                "phone"=>$validUser["phone"],
                "email_verify" => $emailCheck ? $user->email_verify : false,
            ]);
            if(!$emailCheck){
                $otpController = new otpController;
                $otpController->sendRegister($validUser["email"],$validUser["first_name"],$user->id);
            }
            return response()->json(["data"=>"Your data has been updated","status"=>200], 200);
        }catch(ValidationException $e){
            return response()->json(["data"=>$e->errors(),"status"=>422], 422);
        }
    }
    public function password(request $request){
        $user = $request->user();
        try{
        $validUser = $request->validate([
            "old_password"=>"required|string|min:6",
            "new_password"=>"required|String|min:6",
        ]);
        if(!Hash::check($validUser["old_password"],$user->password)){
            return response()->json(["message"=>"Incorrect password","status"=>401], 401);
        }
        elseif(Hash::check($validUser["new_password"],$user->password)){
            return response()->json(["message"=>"Password already Used","status"=>403], 403);
        }
    
        $user->update([
            "password"=>$validUser["new_password"],
        ]);
        return response()->json(["message"=>"Your Password has been updated","status"=>200], 200);

        }catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422], 422);
        }
    }
    // Admin
    public function index(){
        $user = User::all();
        if(!$user->isEmpty()){
            return response()->json(["data"=>$user,"status"=>200], 200);
        }
        return response()->json(["message"=>"Users are Empty","status"=>404], 404);
    }
    public function delete($id){
        $user = User::find($id);
        if(!$user){
            return response()->json(["message"=>"User Not Found","status"=>404], 404);
        }
        $user->delete();
        return response()->json(["message"=>"User Is Deleted","status"=>200], 200);
    }
    public function store(Request $request){
        try{
        $validUser = $request->validate([
            "first_name"=>"required|string|min:3",
            "last_name"=>"required|string|min:3",
            "email"=>"required|email|unique:users,email",
            "password"=>"required|string|min:6",
            "phone"=>"required|digits:8",
            "role"=>"required|in:Admin,Product Manager",
        ]);
            User::create([
                "first_name"=>$validUser["first_name"],
                "last_name"=>$validUser["last_name"],
                "email"=>$validUser["email"],
                "password"=>Hash::make($validUser["password"]),
                "phone"=>$validUser["phone"],
                "email_verify"=>true,
                "role"=>$validUser["role"],
            ]);
            return response()->json(["message"=>"User Add","status"=>201], 201);
    }catch(ValidationException $e){
        return response()->json(["message"=>$e->errors(),"status"=>422], 422);
    }
    }
}
