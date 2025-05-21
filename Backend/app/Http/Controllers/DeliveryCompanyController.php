<?php

namespace App\Http\Controllers;

use App\Models\DeliveryCompany;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class DeliveryCompanyController extends Controller
{
    public function index(){
        $delivery = DeliveryCompany::get();
        if($delivery->isEmpty()){
            return response()->json(["message"=>"delivery company are empty","status"=>404],404);
        }
        return response()->json(["message"=>"Success","data"=>$delivery,"status"=>200],200);
    }
    public function store(Request $request){
        try{
        $companyValidate = $request->validate([
            "name"=>"required|string|min:3",
            "address"=>"required|string|min:3",
            "phone"=>"required|digits:8",
            "mail"=>"required|email",
            "fee"=>"required|double",
            "duration"=>"required|integer",
        ]);
        DeliveryCompany::create([
            "name"=>$companyValidate["name"],
            "address"=>$companyValidate["address"],
            "phone"=>$companyValidate["phone"],
            "mail"=>$companyValidate["mail"],
            "fee"=>$companyValidate["fee"],
            "duration"=>$companyValidate["duration"],
        ]);
        return response()->json(["message"=>"Delivery Company Add","status"=>200],200);

        }catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422],422);
        }
    }
    public function getCompany($id){
        $company = DeliveryCompany::find($id);
        if(!$company){
            return response()->json(["message"=>"Delivery Company Not Found","status"=>404],404);
        }
        return response()->json(["message"=>"Success","data"=>$company,"status"=>200],200);
    }
    public function update(Request $request,$id){
        try{
            $companyValidate = $request->validate([
                "name"=>"required|string|min:3",
                "address"=>"required|string|min:3",
                "phone"=>"required|digits:8",
                "mail"=>"required|email",
                "fee"=>"required|numeric",
                "duration"=>"required|integer",
            ]);
            $company = DeliveryCompany::find($id);
            if(!$company){
                return response()->json(["message"=>"Delivery Company Not Found","status"=>404],404);
            }
            $company->update([
                "name"=>$companyValidate["name"],
                "address"=>$companyValidate["address"],
                "phone"=>$companyValidate["phone"],
                "mail"=>$companyValidate["mail"],
                "fee"=>$companyValidate["fee"],
                "duration"=>$companyValidate["duration"],
            ]);
            return response()->json(["message"=>"Delivery Company Update","status"=>200],200);
        }catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422],422);
        }
    }
    public function delete($id){
        $company = DeliveryCompany::find($id);
        if(!$company){
            return response()->json(["message"=>"Delivery Company Not Found","status"=>404],404);
        }
        $company->delete();
        return response()->json(["message"=>"Delivery Company Deleted","status"=>200],200);
    }
}
