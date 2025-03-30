<?php

namespace App\Http\Controllers;

use App\Models\DeliveryCompany;
use Illuminate\Http\Request;

class DeliveryCompanyController extends Controller
{
    function index(){
        $delivery = DeliveryCompany::get();
        if($delivery->isEmpty()){
            return response()->json(["message"=>"delivery company are empty","status"=>404],404);
        }
        return response()->json(["message"=>"Success","data"=>$delivery,"status"=>200],200);
    }
}
