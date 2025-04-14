<?php

namespace App\Http\Controllers;

use App\Mail\OrderMail;
use App\Models\Order;
use App\Models\OrderItems;
use App\Models\ProductStock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function store(Request $request){
        try{
            $orderValidation = $request->validate([
                "product_stock_id"=>"required",
                "address_id"=>"required",
                "quantity"=>"required",
                "price"=>"required",
                "paymentChoose"=>"required",
            ]);
            $user = $request->user();
            $order = Order::create([
                "user_id"=>$user->id,
                "address_id"=>$orderValidation["address_id"],
                "method_payment"=>$orderValidation["paymentChoose"],
            ]);
            $productsStock = $orderValidation["product_stock_id"];
            $quantity = $orderValidation["quantity"];
            $price = $orderValidation["price"];
            foreach($productsStock as $key => $product){
                OrderItems::create([
                    "order_id"=>$order->id,
                    "product_stock_id"=>$product,
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
        $orders = Order::with(["user","address","orderItems.product_stock.product"])->get();
        if($orders->isEmpty()){
            return response()->json(["message"=>"Orders are Empty","status"=>404],404);
        }
        return response()->json(["message"=>"Succeed","data"=>$orders,"status"=>200],200);
    }
    public function getOrder($id){
        $order = Order::with(["user","orderItems.product_stock.product","address"])->find($id);
        if(!$order){
            return response()->json(["message"=>"Order Not Found","Status"=>404],404);
        }
        return response()->json(["message"=>"Order Found","data"=>$order,"Status"=>200],200);
    }
    public function update(Request $request,$id){
        try{
            $order = Order::with(["user","address"])->find($id);
            if(!$order){
                return response()->json(["message"=>"Order Not Found","status"=>404],404);
            }
            $orderValidate = $request->validate([
                "deliveryCompany"=>"nullable|string",
                "deliveryStatus"=>"string|required",
            ]);
            $order->update([
                "status" => $orderValidate["deliveryStatus"],
                "delivery_company" => $orderValidate["deliveryCompany"],
            ]);
            $orderItems = OrderItems::with("product_stock")->where("order_id",$id)->get();
            if($orderValidate["deliveryStatus"] == "Shipped"){
                foreach($orderItems as $order){
                    $currentStock = $order->product_stock->quantity - $order->quantity;
                    ProductStock::find($order->product_stock->id)->update([
                        "quantity"=>$currentStock,
                    ]);
                }
            }
            elseif($orderValidate["deliveryStatus"] == "Return"){
                foreach($orderItems as $order){
                    $currentStock = $order->product_stock->quantity + $order->quantity;
                    ProductStock::find($order->product_stock->id)->update([
                        "quantity"=>$currentStock,
                    ]);
                }
            }   
                Mail::to($order->user->email)->send(new OrderMail($orderItems,$orderValidate["deliveryStatus"],$order));
                return response()->json(["message"=>"Order Are Updated","status"=>200],200);
        }catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422],422);
            
        }   
    }
    public function checked($id){
        $order = Order::find($id);
        if(!$order){
            return response()->json(["message"=>"Order Not Found","status"=>404],404);
        }
        $order->status = "Processing";
        $order->save();
       
        return response()->json(["message"=>"Order Are Checked","status"=>200],200);
    }
    public function userOrder(Request $request){
        $user = $request->user();
        $orders = Order::where("user_id",$user->id)->get();
        if($orders->isEmpty()){
            return response()->json(["message"=>"Order Not Found","status"=>404],404);
        }
        return response()->json(["message"=>"Order Found","data"=>$orders,"status"=>200],200);
    }
}
