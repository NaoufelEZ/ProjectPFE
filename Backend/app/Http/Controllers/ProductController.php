<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException as ValidationException;

class ProductController extends Controller
{
    public function index(){
        $products = Product::all();
        if($products->isEmpty()){
            return response()->json(["data"=>"Products is Empty","status"=>404], 404, );
        }
        return response()->json(["data"=>$products,"status"=>200], 200);
    }
    public function store(request $resquest){
        try{
            $validProduct = $resquest->validate([
                "title"=>"required|string|min:6",
                "description"=>"required|string|min:6",
                "price"=>"required|numeric",
                "discount"=>"required|numeric",
            ]); 
            Product::create([
                "title"=>$validProduct["title"],
                "description"=>$validProduct["description"],
                "price"=>$validProduct["price"],
                "discount"=>$validProduct["discount"],
            ]);            
            return response()->json(["data"=>"Product has been created","status"=>201], 201);

        }
        catch(ValidationException $e){
            return response()->json(["data"=>$e->errors(),"status"=>422], 422);
        }
    }
}
