<?php

namespace App\Http\Controllers;

use App\Mail\otpEmail;
use App\Models\Opt;
use App\Models\Otp;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class otpController extends Controller
{
    public function seedRegister($email,$name,$id){
        $code = random_int(100000,999999);
        Otp::create([
            "user_id"=>$id,
            "otp_code"=>$code,
            "expiry_at"=>Carbon::now()->addMinutes(25),
        ]);
        Mail::to($email)->send(new otpEmail($name,$code));
        return response()->json(["data"=>"opt seed to you email","status"=>200], 200);
    }
    public function seedOtp(request $request){
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
        return response()->json(["data"=>"opt seed to you email","status"=>200], 200);
    }
    public function storeOtp(request $request){
        $id = $request->user()->id;
        $code = $request->otp;
        $otp = Otp::where("user_id",$id)->latest()->first();
        if(now()->addHour()->lt($otp->expiry_at)){
            return response()->json(['data' => 'OTP has expired',"status"=>400], 400);
        }
        else if($code == $otp->otp_code){
            $otp->delete();
            return response()->json(['data' => 'OTP verified and deleted',"status"=>200], 200);;
        }
        return response()->json(['data' => 'No OTP found',"status"=>404], 404);
    }
}
