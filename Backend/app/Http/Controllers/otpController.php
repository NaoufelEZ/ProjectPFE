<?php

namespace App\Http\Controllers;

use App\Mail\forgetPassword;
use App\Mail\otpEmail;
use App\Models\Otp;
use App\Models\Password;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException ;

class otpController extends Controller
{
    public function sendRegister($email,$name,$id){
        $code = random_int(100000,999999);
        $hash = uniqid();
        Otp::create([
            "user_id"=>$id,
            "otp_code"=>$code,
            "hash"=>$hash,
            "expiry_at"=>Carbon::now()->addMinutes(5),
        ]);
        Mail::to($email)->send(new otpEmail($name,$code));
        return $hash;
    }
    public function verifySendRegister($hash,request $request){
        $code = $request->input("code");
        $otpCode = Otp::where("hash",$hash)->latest()->first();
        if(!$otpCode){
            return response()->json(["message"=>"Otp Not Found","status"=>404], 404);
        }
        else if($otpCode->otp_code != $code){
            return response()->json(["data"=>"Otp Not Wong","status"=>422], 422);
        }
        $id = $otpCode->user_id;
        User::find($id)->update([
            "email_verify"=>true,
        ]);
        $otpCode->delete();
        return response()->json(["message"=>"You Account Are verify","status"=>200], 200);

    }
    public function verifyUrlRegister($hash){
        $otpCode = Otp::where("hash",$hash)->latest()->first();
        if(!$otpCode){
            return response()->json(["message"=>"Otp Not Found","status"=>404], 404);
        }
        return response()->json(["message"=>"URL Link Is Correct","status"=>200], 200);

    }
    public function sendOtp(request $request){
        $user = $request->user();
        $id = $user->id;
        $email = $user->email;
        $name = $user->first_name;
        $code = random_int(100000,999999);
        $hash = uniqid();
        Otp::create([
            "user_id"=>$id,
            "otp_code"=>$code,
            "hash"=> $hash,
            "expiry_at"=>Carbon::now()->addMinutes(25),
        ]);
        Mail::to($email)->send(new otpEmail($name,$code));
        return response()->json(["message"=>"opt send to you email","status"=>200], 200);
    }
    public function storeOtp(request $request){
        $user = $request->user();
        $id = $user->id;
        $code = $request->otp;
        // return response()->json($code);
        $otp = Otp::where("user_id",$id)->latest()->first();
        if(!$otp){
            return response()->json(['message' => 'OTP No Fount',"status"=>404], 404);
        }
        else if(Carbon::now()->gt(Carbon::parse($otp->expiry_at))){
            return response()->json(["message"=>"Otp Is Expiry","status"=>410], 410);
        }
        else if($code != $otp->otp_code){
            return response()->json(['message' => 'OTP Wrong',"status"=>400], 400);
        }
        $otp->delete();
        $user->update([
            "email_verify"=>true,
        ]);
        return response()->json(['message' => 'OTP verified',"status"=>200], 200);;
    }
    public function seedPassword(Request $request){
        $email = $request->input("email");
        $user = User::where("email",$email)->first();
        if(!$user){
            return response()->json(["data"=>"Email Not Found","status"=>404],404);
        }
        $code = random_int(100000,999999);
        $token = Str::random(20);
        Password::create([
            "email"=>$email,
            "code"=>$code,
            "token"=>$token,
            "expiry_at"=>Carbon::now()->addMinutes(5)
        ]);
        Mail::to($email)->send(new forgetPassword($user->first_name,$code));
        return response()->json(["message"=>"Mail are seed","token"=>$token,"status"=>200],200);

    }
    public function passwordCodeVerify($token,Request $request){
        $otp = Password::where("token",$token)->latest()->first();
        $code = $request->input("code");
        if(!$otp){
            return response()->json(["message"=>"Otp Not Found","status"=>404], 404);
        }
        else if($otp->code != $code){
            return response()->json(["message"=>"Code Is Wrong","status"=>422], 422);
        }
        else if(Carbon::now()->gt(Carbon::parse($otp->expiry_at))){
            return response()->json(["message"=>"Otp Is Expiry","status"=>410], 410);
        }
        $otp->update(["is_verified"=>true]);
        return response()->json(["message"=>"Code is","status"=>200], 200);
    }
    public function passwordChange(Request $request,$token){
        try{
            $validPassword = $request->validate([
                "password"=>"required|min:6"
            ]);
            $otp = Password::where("token",$token)->latest()->first();
            $email = $otp->email;
            $user = User::where("email",$email)->get()->first();
            if(!$otp){
                return response()->json(["message"=>"Otp Not Found","status"=>404], 404);
            }
            else if(!$otp->is_verified){
                return response()->json(["message"=>"You can change you password","status"=>422], 422);
            }
            elseif(Hash::check($validPassword["password"], $user->password)){
                return response()->json(["message"=>"the New Password should be not like the old password","status"=>410], 410);
            }
            User::where("email",$email)->update([
                "password"=> Hash::make($validPassword["password"])
            ]);
            $otp->delete();
            return response()->json(["message"=>"Password is Change","status"=>200], 200);
        }catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422],422);
        }
        }

    public function passwordTokenVerify($token){
        $otp = Password::where("token",$token)->latest()->first();
        if(!$otp){
            return response()->json(["message"=>"token is Wrong","status"=>404], 404);
        }
        elseif(!$otp->is_verified){
            return response()->json(["message"=>"you are not allow not verified","status"=>410], 410);
        }
        return response()->json(["message"=>"token is right","status"=>200], 200);


    }
    public function reSeedPassword($token){
        $otp = Password::where("token",$token)->latest()->first();
        $email = $otp->email;
        $user = User::where("email",$email)->get()->first();
        $code = random_int(100000,999999);
        Password::where("token",$token)->update([
            "code"=>$code,
            "expiry_at"=>Carbon::now()->addMinutes(5),
            "created_at"=>Carbon::now()
        ]);
        Mail::to($email)->send(new forgetPassword($user->first_name,$code));
        return response()->json(["message"=>"Mail is send","status"=>200], 200);

    }
    // public function test($id){
    //     $otp = Otp::where("user_id",$id)->latest()->first();

    //     $test = Carbon::now()->gt(Carbon::parse($otp->expiry_at));
    //         return response()->json(['data' => $test,"status"=>$otp,"carbon"=>Carbon::parse($otp->expiry_at)], 200);
    //     }
}
