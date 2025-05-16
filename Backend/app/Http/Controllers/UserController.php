<?php

namespace App\Http\Controllers;

use App\Models\Otp;
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
            "last_name"=>"required|string|min:3",
            // "email"=>"required|email|unique:users,email," . $user->id,
            "phone"=>"required|digits:8",
        ]);
            $user->update([
                "first_name"=>$validUser["first_name"],
                "last_name"=>$validUser["last_name"],
                "phone"=>$validUser["phone"],
            ]);
            return response()->json(["message"=>"Your data has been updated","status"=>200], 200);
        }catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422], 422);
        }
    }
    public function user($id){
        $user = User::find($id);
        if(!$user){
            return response()->json(["message"=>"Users Not Found","status"=>404], 404);
        }
        return response()->json(["message"=>"User Is Found It","data"=>$user,"status"=>200], 200);

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
    public function index(Request $request){
        $users = User::all();
        if($users->isEmpty()){
            return response()->json(["message"=>"Users are Empty","status"=>404], 404);
        }
        $admin = $request->user();
        if($admin->role == "Super Admin"){
            return response()->json(["data"=>$users,"status"=>200], 200);
        }
        else{
             $users = User::whereIn("role",["Product Manager","Client"])->get();
            return response()->json(["data"=>$users,"status"=>200], 200);
        }
       
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
    public function email(Request $request){
        try{
            $user = $request->user();
            $emailValidation = $request->validate([
                "current_email"=>"required|email",
                "new_email"=>"required|email",
            ]);
            if($emailValidation["current_email"] != $user->email){
                return response()->json(["message"=>"Current Email Is Wrong","status"=>403],403);
            }
            elseif($emailValidation["new_email"] == $user->email){
                return response()->json(["message"=>"The New Email Should be Difference Then Old One","status"=>402],402);
            }
            $user->update([
                "email"=>$emailValidation["new_email"],
                "email_verify"=>false,

            ]);
            $otpController = new otpController;
            $otpController->sendRegister($user->email, $user->first_name, $user->id);
            return response()->json(["message"=>"Email Change","status"=>200],200);

        }catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422],422);
        }
    }
    public function codeEmailVerify(Request $request){
        try{
            $user = $request->user();
            $optValidation = $request->validate([
                "otp_code"=>"required|integer|digits:6",
            ]);
            $otpCode = Otp::where("user_id",$user->id)->latest()->first();
            if($optValidation["otp_code"] != $otpCode->otp_code){
                return response()->json(["message"=>"Otp Code Is Wrong","status"=>403],403);
            }
            $user->update([
                "email_verify"=>true,
            ]);
            return response()->json(["message"=>"Account Now Is Valid","status"=>200],200);

        }catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422],422);
        }
    }
    public function userDelete(Request $request){
        $user = $request->user();
        $user->delete();
        return response()->json(["message"=>"User Are Delete","status"=>200],200);

    }
    public function update(Request $request,$id){
        try{
            $RoleValidation = $request->validate([
                "role"=> "required|in:Admin,Product Manager,Client",
            ]);
            $user = User::find($id);
            $user->update([
                "role" => $RoleValidation["role"]
            ]);

        }catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422],422);
        }
    }
}
