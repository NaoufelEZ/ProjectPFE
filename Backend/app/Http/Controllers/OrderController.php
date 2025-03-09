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
                "addresse_id"=>"required|array",
                "color"=>"required",
                "size"=>"required",
                "quantity"=>"required",
                "price"=>"required",
                "paymentChoose"=>"required",
            ]);
            $user = $request->user();
            $products = $orderValidation["product_id"];
            $colors = $orderValidation["color"];
            $sizes = $orderValidation["size"];
            $quantitys = $orderValidation["quantity"];
            $method_payment = $orderValidation["paymentChoose"];
            $addresse_id = $orderValidation["addresse_id"];
            $price = $orderValidation["price"];
            foreach($products as $key => $product){
                Order::create([
                    "user_id"=>$user->id,
                    "product_id"=>$product,
                    "color"=>$colors[$key],
                    "size"=>$sizes[$key],
                    "price"=> $price[$key],
                    "quantity"=>$quantitys[$key],
                    "addresse_id"=> $addresse_id[$key],
                    "method_payment"=> $method_payment[$key],
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
