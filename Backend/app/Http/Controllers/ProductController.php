<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\CategoryDetails;
use App\Models\Product;
use App\Models\ProductStock;
use App\Models\Subcategories;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException as ValidationException;

class ProductController extends Controller
{
    public function index($cat,$subcat,$detail){
        $wordDetail = str_replace("-"," ",$detail);
        $categoryId = Categories::where("category",$cat)->first();
        $subcategoryId = Subcategories::where("subcategories",$subcat)->where("category_id",$categoryId->id)->first();
        $detailId = CategoryDetails::where("categoryDetails", $wordDetail)->where("category_id",$categoryId->id)->where("subcategory_id",$subcategoryId->id)->first();
        $products = Product::with('productStock')->where("details_id",$detailId->id)->get();
        if($products->isEmpty()){
            return response()->json(["data"=>"Products is Empty","status"=>404], 404);
        }
        return response()->json(["data"=>$products,"status"=>200], 200);
    }
    public function store(request $request){
        try{
            $validProduct = $request->validate([
                "title"=>"required|string|min:6",
                "description"=>"required|string|min:6",
                "price"=>"required|numeric",
                "discount"=>"required|numeric",
                "details_id"=>"required|numeric",
            ]);
            $product = Product::create([
                "title"=>$validProduct["title"],
                "description"=>$validProduct["description"],
                "price"=>$validProduct["price"],
                "discount"=>$validProduct["discount"],
                "details_id"=>$validProduct["details_id"],
            ]);
            $colors = $request->colors;
            $sizes = $request->sizes;
            $quantity = $request->quantity;
            $product_pictures = $request->file("product_pictures");
            foreach($colors as $key => $color){
                $fileExtension = $product_pictures[$key]->getClientOriginalExtension();
                $fileName = time() . "_" . uniqid() . "." . $fileExtension;
                $path = public_path("images/products/");
                $product_pictures[$key]->move($path,$fileName);
                ProductStock::create([
                    "product_id"=>$product->id,
                    "color"=>$color,
                    "product_picture"=>$fileName,
                    "quantity"=>$quantity[$key],
                    "size"=>$sizes[$key],
                ]);
            }
            return response()->json(["data"=>"Product has been created","status"=>201], 201);

        }
        catch(ValidationException $e){
            return response()->json(["data"=>$e->errors(),"status"=>422], 422);
        }
    }
    public function product($id){
        $product = Product::with("productStock")->find($id);
        if(!$product){
            return response()->json(["data"=>"Product Not Found","status"=>404], 404);
        }
        return response()->json(["data"=>$product,"status"=>200], 200);
    }
}
