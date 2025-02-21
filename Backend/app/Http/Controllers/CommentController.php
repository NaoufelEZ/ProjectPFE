<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CommentController extends Controller
{
    public function index($id){
        $product = Product::find($id);
        if(!$product){
            return response()->json(["message"=>"Product Not Found","status"=>404],404);
        }
        $comments = Comment::where("product_id",$id)->get();
        if($comments->isEmpty()){
            return response()->json(["message"=>"Comments Is Empty","status"=>404],404);
        }
        return response()->json(["message"=>"Comments","data"=>$comments,"status"=>200],200);

    }
    public function store(Request $request,$id){
        try{
            $user = $request->user();
            $valideComment = $request->validate([
                "comment"=>"required",
            ]);
            Comment::create([
                "user_id"=>$user->id,
                "product_id"=>$id,
                "comment"=>$valideComment["comment"]
            ]);
            return response()->json(["message"=>"Comment added","status"=>201],201);
        }
        catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422],422);
        }

    }
}
