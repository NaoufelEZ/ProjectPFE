<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function store(Request $request){
        try{
            $orderValidation = $request->validate([
                "product_id"=>"required",
                "address_id"=>"required",
                "color"=>"required",
                "size"=>"required",
                "quantity"=>"required",
                "price"=>"required",
                "paymentChoose"=>"required",
            ]);
            $user = $request->user();
            // return $orderValidation;
            $order = Order::create([
                "user_id"=>$user->id,
                "address_id"=>$orderValidation["address_id"],
                "method_payment"=>$orderValidation["paymentChoose"],
            ]);
            $products = $orderValidation["product_id"];
            $colors = $orderValidation["color"];
            $sizes = $orderValidation["size"];
            $quantity = $orderValidation["quantity"];
            $price = $orderValidation["price"];
            foreach($products as $key => $product){
                OrderItems::create([
                    "order_id"=>$order->id,
                    "product_id"=>$product,
                    "color"=>$colors[$key],
                    "size"=>$sizes[$key],
                    "price"=> $price[$key],
                    "quantity"=>$quantity[$key],
                ]);
            }
            return response()->json(["message"=>"order are add","status"=>201],201);
        }
        catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422],422);
        }
    }
    public function index(){
        $orders = Order::with("orderItems")->with("user")->get();
        if($orders->isEmpty()){
            return response()->json(["message"=>"Orders are Empty","status"=>404],404);
        }
        return response()->json(["message"=>"Succeed","data"=>$orders,"status"=>200],200);


    }
}
