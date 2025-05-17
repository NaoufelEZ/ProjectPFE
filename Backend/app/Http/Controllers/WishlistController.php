<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function store(Request $request,$id) {
        $user = $request->user();
        $product = Product::find($id);
        if(!$product){
            return response()->json(["message"=>"Product Not Found","status"=>404], 404);
        }
        $wishlist = Wishlist::where("product_id",$product->id)->where("user_id",$user->id)->first();
        if($wishlist){
            $wishlist->delete();
            return response()->json(["message" => "Product Removed from Your Wishlist", "status" => 202], 202);
        }
        Wishlist::create([
            "user_id"=>$user->id,
            "product_id"=>$id,
        ]);
        return response()->json(["message"=>"Product Add To Your List","status"=>201], 201);
    }
    public function index(Request $request) {
        $user = $request->user()->id;
        $wishlist = Wishlist::where("user_id",$user)->with("product.productStock")->get();
        if(!$wishlist){
            return response()->json(["message"=>"You Wishlist Are Empty","status"=>404], 404);
        }
        return response()->json(["data"=>$wishlist,"status"=>200], 200);
    }
    public function delete(Request $request,$id){
        $user = $request->user()->id;
        $wishlist = Wishlist::where("user_id",$user)->get()->first();
        if(!$wishlist){
            return response()->json(["message"=>"You Wishlist Are Empty","status"=>404], 404);
        }
        $wishlist->delete();
        return response()->json(["message"=>"Product Is Deleted Form you Wishlist","status"=>200], 200);
    }
}
