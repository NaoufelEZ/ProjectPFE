<?php

namespace App\Http\Controllers;

use App\Mail\OrderMail;
use App\Models\Order;
use App\Models\OrderItems;
use App\Models\ProductStock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function getRandomStr($length = 16)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $str = '';

    for ($i = 0; $i < $length; $i++) {
        $index = rand(0, strlen($characters) - 1);
        $str .= $characters[$index];
    }

    return $str;
}

    public function store(Request $request){
        try{
            $orderValidation = $request->validate([
                "product_stock_id"=>"required",
                "address_id"=>"required",
                "quantity"=>"required",
                "price"=>"required",
                "paymentChoose"=>"required",
                "delivery_pay"=>"nullable|integer",
            ]);
            $ref = $this->getRandomStr();
            $user = $request->user();
            $order = $order = Order::create([
                "reference"=>$ref,
                "user_id"=>$user->id,
                "address_id"=>$orderValidation["address_id"],
                "method_payment"=>$orderValidation["paymentChoose"],
                "delivery_pay"=>$orderValidation["delivery_pay"],
                "status"=> $orderValidation["paymentChoose"] == "cash" ? "Pending" : "Rejected",
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
            return response()->json(["message"=>"order are add","data"=>$order->reference,"status"=>201],201);
        }
        catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422],422);
        }
    }
    public function index(){
        $orders = Order::with(["user","address","orderItems.product_stock.product","company"])->get();
      
        return response()->json(["message"=>"Succeed","data"=>$orders,"status"=>200],200);
    }
    public function getOrder($id){
        $order = Order::with(["user","orderItems.product_stock.product","address","company"])->find($id);
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
                "deliveryCompany"=>"nullable|integer",
                "deliveryStatus"=>"string|required",
            ]);
            $order->status = $orderValidate["deliveryStatus"];
            $order->company_id = $orderValidate["deliveryCompany"];
            $order->order_update = now();
            $order->save();
            $orderItems = OrderItems::with("product_stock")->where("order_id",$id)->get();
            if($orderValidate["deliveryStatus"] == "Shipped"){
                foreach($orderItems as $orderItem){
                    $currentStock = $orderItem->product_stock->quantity - $orderItem->quantity;
                    ProductStock::find($orderItem->product_stock->id)->update([
                        "quantity"=>$currentStock,
                    ]);
                }
            }
            elseif($orderValidate["deliveryStatus"] == "Return"){
                foreach($orderItems as $orderItem){
                    $currentStock = $orderItem->product_stock->quantity + $orderItem->quantity;
                    ProductStock::find($orderItem->product_stock->id)->update([
                        "quantity"=>$currentStock,
                    ]);
                }
            }   
                Mail::to(users: $order->user->email)->send(new OrderMail($orderItems,$orderValidate["deliveryStatus"],$order));
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
        $order->dot_notify = true;
        $order->order_update = now();
        $order->save();
       
        return response()->json(["message"=>"Order Are Checked","status"=>200],200);
    }
    public function userOrder(Request $request){
        $user = $request->user();
        $orders = Order::where("user_id",$user->id)->with("orderItems.product_stock.product")->get();
        if($orders->isEmpty()){
            return response()->json(["message"=>"Order Not Found","status"=>404],404);
        }
        return response()->json(["message"=>"Order Found","data"=>$orders,"status"=>200],200);
    }
    public function check($id){
        $order = Order::find($id);
        if($order->order_date != $order->order_update && $order->dot_notify == true){
            return response()->json(["data"=>true],200);
        }
        return response()->json(["data"=>false],200);
    }
    public function allChecked(Request $request){
        $user = $request->user();
        $orders = Order::where("user_id",$user->id);
        $orders->update([
            "dot_notify"=>false,
        ]);
        return response()->json(["message"=>"checkd updated"],200);
    }
    public function anyChecked(Request $request){
        $user = $request->user();
        $orders = Order::where("user_id",$user->id)->get();
        $numberOfModify = 0;
        foreach($orders as $order){
            if($order->order_date != $order->order_update && $order->dot_notify == true){
                $numberOfModify++;
            }
        }
        return response()->json(["data"=>$numberOfModify],200);
    }
    public function payment(Request $request){
        $reference = $request->reference;
    
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post('https://developers.flouci.com/api/generate_payment', [
            'app_token' => env('FLOUCI_APP_TOKEN'),
            'app_secret' => env('FLOUCI_APP_SECRET'),
            'amount' => $request->amount,
            'accept_card' => true,
            'session_timeout_secs' => 1200,
            'success_link' => "http://localhost:3000/checkout/visa-payment/order-confirmation",
            'fail_link' => 'https://example.com/fail',
            'developer_tracking_id' => env('FLOUCI_APP_DEVELOPER_ID'),
        ]);
    
        return $response->json();
    }
    public function verifyPayment($token){
    
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'apppublic' => env('FLOUCI_APP_TOKEN'),
            'appsecret' => env('FLOUCI_APP_SECRET'),
        ])->get("https://developers.flouci.com/api/verify_payment/$token");
    
        return $response->json();
    }
    
    public function orderConfirmation($reference){
        $order = Order::where("reference",$reference)->first();
        if(!$order){
            return response()->json(["message"=>"Order Not Found","status"=>404],404);
        }
            $order->status = "Shipped";
            $order->company_id = 1;
            $order->order_update = now();
            $order->save();
        $orderItems = OrderItems::with("product_stock")->where("order_id",$order->id)->get();
            foreach($orderItems as $orderItem){
                $currentStock = $orderItem->product_stock->quantity - $orderItem->quantity;
                ProductStock::find($orderItem->product_stock->id)->update([
                    "quantity"=>$currentStock,
                ]);
        }
        Mail::to(users: $order->user->email)->send(new OrderMail($orderItems,"Shipped",$order));
    }
}
