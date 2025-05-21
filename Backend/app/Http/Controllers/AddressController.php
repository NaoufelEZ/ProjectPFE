<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException as ValidationException;


class AddressController extends Controller
{
    public function store(request $request){
        try{
            $user = $request->user()->id;
            $userValid = $request->validate([
                "address" => "required|string|max:100",
                "state" => "required|string|max:30",
                "zip" => "required|digits:4",
                "street" => "required|string|max:100",
                "is_default"=> "boolean",
                "city" => "required|string|max:100",
            ]);
            if($userValid["is_default"]){
                Address::where("user_id",$user)->update([
                    "is_default"=> 0,
                ]);
                Address::create([
                    "user_id" => $user,
                    "address" => $userValid["address"],
                    "state" => $userValid["state"],
                    "city" => $userValid["city"],
                    "zip" => $userValid["zip"],
                    "street" => $userValid["street"],
                    "is_default"=> 1,
                ]);
            }
            else{
                 Address::create([
                    "user_id" => $user,
                    "address" => $userValid["address"],
                    "state" => $userValid["state"],
                    "zip" => $userValid["zip"],
                    "city" => $userValid["city"],
                    "street" => $userValid["street"],
                ]);
            }
        return response()->json(["data" => "Address added successfully","status"=>200], 200);
    }catch(ValidationException $e){
    return response()->json(["data"=>$e->errors(),"status"=>422], 422);
    }
    }
    public function index(request $request){
        $user = $request->user()->id;
        $address = Address::where("user_id",$user)->get();
        if($address->isEmpty()){
            return response()->json(["data"=>"No address found","status"=>404],404);
        }
        return response()->json(["data"=>$address,"status"=>200],200);

    }
    public function update(request $request,$id){
        $user = $request->user()->id;
        $address = Address::where("user_id",$user)->where("id",$id)->first();
        if(!$address){
            return response()->json(["data"=>"No address found","status"=>404],404);
        }
        try{
        $addressValid = $request->validate([
            "address" => "required|string|max:100",
            "state" => "required|string|max:30",
            "city" => "required|string|max:100",
            "zip" => "required|digits:4",
            "street" => "required|string|max:100",
            "is_default"=> "boolean",
        ]);
        if($addressValid["is_default"]){
                Address::where("user_id",$user)->update([
                    "is_default"=> 0,
                ]);
                Address::create([
                    "user_id" => $user,
                    "address" => $addressValid["address"],
                    "state" => $addressValid["state"],
                    "city" => $addressValid["city"],
                    "zip" => $addressValid["zip"],
                    "street" => $addressValid["street"],
                    "is_default"=> 1,
                ]);
            }
            else{
                 Address::create([
                    "user_id" => $user,
                    "address" => $addressValid["address"],
                    "state" => $addressValid["state"],
                    "zip" => $addressValid["zip"],
                    "city" => $addressValid["city"],
                    "street" => $addressValid["street"],
                ]);
            }
        return response()->json(["data"=>"Address updated successfully","status"=>200],200);
    }catch(ValidationException $e){
        return response()->json(["data"=>$e->errors(),"status"=>422],422);
    }
    }
    public function delete(request $request,$id){
        $user = $request->user()->id;
        $address = Address::where("user_id",$user)->where("id",$id)->first();
        if(!$address){
            return response()->json(["data"=>"No address found","status"=>404],404);
        }
        $address->delete();
        return response()->json(["data"=>"Address deleted successfully","status"=>200],200);
    }
    public function show(request $request,$id){
        $user = $request->user()->id;
        $address = Address::where("user_id",$user)->where("id",$id)->first();
        if(!$address){
            return response()->json(["data"=>"No address found","status"=>404],404);
        }
        return response()->json(["data"=>$address,"status"=>200],200);
    }
    public function default(request $request,$id){
        $user = $request->user()->id;
        $address = Address::where("user_id",$user)->where("id",$id)->first();
        $addressesUser = Address::where("user_id",$user);
        if(!$address){
            return response()->json(["data"=>"No address found","status"=>404],404);
        }
        if($addressesUser->count() > 1){
            $addressesUser->update([
                "is_default"=>false,
             ]);
        }
        $address->update([
           "is_default"=>true,
        ]);
        return response()->json(["data"=>"Address updated successfully","status"=>200],200);
    }
}
