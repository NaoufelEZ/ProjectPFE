<?php

namespace App\Http\Controllers;

use App\Models\Addresse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException as ValidationException;


class AddressController extends Controller
{
    public function store(request $request){
        try{
            $user = $request->user()->id;
            $userValide = $request->validate([
                "address" => "required|string|max:100",
                "state" => "required|string|max:30",
                "zip" => "required|digits:4",
                "street" => "required|string|max:100",
            ]);
            Addresse::create([
                "user_id" => $user,
                "address" => $userValide["address"],
                "state" => $userValide["state"],
                "zip" => $userValide["zip"],
                "street" => $userValide["street"],
            ]);
        return response()->json(["data" => "Address added successfully","status"=>200], 200);
    }catch(ValidationException $e){
    return response()->json(["data"=>$e->errors(),"status"=>422], 422);
    }
    }
    public function index(request $request){
        $user = $request->user()->id;
        $address = Addresse::where("user_id",$user)->get();
        if($address->isEmpty()){
            return response()->json(["data"=>"No address found","status"=>404],404);
        }
        return response()->json(["data"=>$address,"status"=>200],200);

    }
    public function update(request $request,$id){
        $user = $request->user()->id;
        $address = Addresse::where("user_id",$user)->where("id",$id)->first();
        if(!$address){
            return response()->json(["data"=>"No address found","status"=>404],404);
        }
        try{
        $userValide = $request->validate([
            "address" => "required|string|max:100",
            "state" => "required|string|max:30",
            "zip" => "required|digits:4",
            "street" => "required|string|max:100",
        ]);
        $address->update([
            "address" => $userValide["address"],
            "state" => $userValide["state"],
            "zip" => $userValide["zip"],
            "street" => $userValide["street"],
        ]);
        return response()->json(["data"=>"Address updated successfully","status"=>200],200);
    }catch(ValidationException $e){
        return response()->json(["data"=>$e->errors(),"status"=>422],422);
    }
    }
    public function delete(request $request,$id){
        $user = $request->user()->id;
        $address = Addresse::where("user_id",$user)->where("id",$id)->first();
        if(!$address){
            return response()->json(["data"=>"No address found","status"=>404],404);
        }
        $address->delete();
        return response()->json(["data"=>"Address deleted successfully","status"=>200],200);
    }
    public function show(request $request,$id){
        $user = $request->user()->id;
        $address = Addresse::where("user_id",$user)->where("id",$id)->first();
        if(!$address){
            return response()->json(["data"=>"No address found","status"=>404],404);
        }
        return response()->json(["data"=>$address,"status"=>200],200);
    }
    public function default(request $request,$id){
        $user = $request->user()->id;
        $address = Addresse::where("user_id",$user)->where("id",$id)->first();
        $adressesUser = Addresse::where("user_id",$user);
        if(!$address){
            return response()->json(["data"=>"No address found","status"=>404],404);
        }
        if($adressesUser->count() > 1){
            $adressesUser->update([
                "is_default"=>false,
             ]);
        }
        $address->update([
           "is_default"=>true,
        ]);
        return response()->json(["data"=>"Address updated successfully","status"=>200],200);
    }
}
