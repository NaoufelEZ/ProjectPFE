<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function store(Request $request){
        try{
            $orderValidation = $request->validate([
                "product_id"=>"required",
                "addresse"=>"required",
                "color"=>"required",
                "size"=>"required",
                "quantity"=>"required"
            ]);
            $user = $request->user();
            $products = $orderValidation["product_id"];
            $colors = $orderValidation["color"];
            $sizes = $orderValidation["size"];
            $quantitys = $orderValidation["quantity"];
            foreach($products as $key => $product){
                Order::create([
                    "user_id"=>$user->id,
                    "product_id"=>$products[$key],
                    "color"=>$colors[$key],
                    "size"=>$sizes[$key],
                    "quantity"=>$quantitys[$key],
                    "addresse_id"=>$orderValidation["addresse"],
                ]);
            }
            return response()->json(["message"=>"order are add","status"=>201],201);
        }
        catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422],422);
        }
    }
    public function index(){
        $orders = Order::get();
        $orederByUser = array();
        foreach($orders as $key => $order){
            $orederByUser[$key] = $order;
        }
        return $orederByUser;

    }
}
