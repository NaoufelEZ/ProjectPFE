<?php

namespace App\Http\Controllers;

use App\Mail\otpEmail;
use App\Models\Opt;
use App\Models\Otp;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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
        Mail::to(users: $email)->send(new otpEmail($name,$code));
        return $hash;
    }
    public function verifySendRegister($hash,request $request){
        $code = $request->input("code");
        $otpCode = Otp::where("hash",$hash)->latest()->first();
        if(!$otpCode){
            return response()->json(["data"=>"Otp Not Found","status"=>404], 404);
        }
        else if($otpCode->otp_code != $code){
            return response()->json(["data"=>"Otp Wrong","status"=>422], 422);
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
            return response()->json(['data' => 'OTP no find',"status"=>404], 404);
        }
        if(Carbon::now()->addHour()->lt($otp->expiry_at)){
            return response()->json(['data' => 'OTP has expired',"status"=>400], 400);
        }
        else if($code == $otp->otp_code){
            $otp->delete();
            $user->update([
                "email_verify"=>true,
            ]);
            return response()->json(['data' => 'OTP verified',"status"=>200], 200);;
        }
        return response()->json(['data' => 'OTP Wrong',"status"=>400], 400);
    }
}
