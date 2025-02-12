<?php

namespace App\Http\Controllers;

use App\Mail\forgetPassword;
use App\Mail\otpEmail;
use App\Models\Otp;
use App\Models\Password;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;


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
            return response()->json(["data"=>"Otp Not Found","status"=>404], 404);
        }
        else if($otpCode->otp_code != $code){
            return response()->json(["data"=>"Otp Not Wong","status"=>422], 422);
        }
        else if(Carbon::now()->gt(Carbon::parse($otpCode->expiry_at))){
            return response()->json(["data"=>"Otp Is Expiry","status"=>422], 422);
        }
        $id = $otpCode->id;
        User::find($id)->update([
            "email_verify"=>true,
        ]);
        $otpCode->delete();
        return response()->json(["data"=>"You Account Are verify","status"=>200], 200);

    }
    public function verifyUrlRegister($hash){
        $otpCode = Otp::where("hash",$hash)->latest()->first();
        if(!$otpCode){
            return response()->json(["data"=>"Otp Not Found","status"=>404], 404);
        }
        return response()->json(["data"=>"URL Link Is Correct","status"=>200], 200);

    }
    public function sendOtp(request $request){
        $user = $request->user();
        $id = $user->id;
        $email = $user->email;
        $name = $user->first_name;
        $code = random_int(100000,999999);
        Otp::create([
            "user_id"=>$id,
            "otp_code"=>$code,
            "expiry_at"=>Carbon::now()->addMinutes(25),
        ]);
        Mail::to($email)->send(new otpEmail($name,$code));
        return response()->json(["data"=>"opt send to you email","status"=>200], 200);
    }
    public function storeOtp(request $request){
        $user = $request->user();
        $id = $user->id;
        $code = $request->otp;
        $otp = Otp::where("user_id",$id)->latest()->first();
        if(!$otp){
            return response()->json(['data' => 'OTP No Fount',"status"=>404], 404);
        }
        else if(Carbon::now()->gt(Carbon::parse($otp->expiry_at))){
            return response()->json(["data"=>"Otp Is Expiry","status"=>422], 422);
        }
        else if($code != $otp->otp_code){
            return response()->json(['data' => 'OTP Wrong',"status"=>400], 400);
        }
        $otp->delete();
        $user->update([
            "email_verify"=>true,
        ]);
        return response()->json(['data' => 'OTP verified',"status"=>200], 200);;
    }
    public function seedPassword(Request $request){
        $email = $request->input("email");
        $user = User::where("email",$email)->get();
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
    }
    public function passwordCodeVerify($token,Request $request){
        $otp = Password::where("token",$token)->latest()->first();
        $code = $request->code;
        if(!$otp){
            
        }
    }

    // public function test($id){
    //     $otp = Otp::where("user_id",$id)->latest()->first();

    //     $test = Carbon::now()->gt(Carbon::parse($otp->expiry_at));
    //         return response()->json(['data' => $test,"status"=>$otp,"carbon"=>Carbon::parse($otp->expiry_at)], 200);
    //     }
}
