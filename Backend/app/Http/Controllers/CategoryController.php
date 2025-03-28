<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\CategoryDetails;
use App\Models\Subcategories;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CategoryController extends Controller
{
    public function storeCategory(Request $request){
        try{
            $categoryValidation = $request->validate([
                "category"=>"required|string|min:3",
            ]);
            Categories::create([
                "category"=>$categoryValidation["category"],
            ]);
            return response()->json(["message"=>"Category Are Add","status"=>201],201);

        }catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422],422);
        }
    }
    public function showCategories(){
        $category = Categories::get();
        if(!$category){
            return response()->json(["message"=>"there no Categories","status"=>404],404);
        }
        return response()->json(["data"=>$category,"status"=>200],200);
    }
    public function getCategory($cat){
        $category = Categories::where("category",$cat)->first();
        if(!$category){
            return response()->json(["message"=>"there not category","status"=>404],404);
        }
        return response()->json(["data"=>$category,"status"=>200],200);
    }
    public function storeSubcategory(Request $request){
        try{
            $categoryValidation = $request->validate([
                "category_id"=>"required|integer",
                "subcategories"=>"required|string|min:3",
                "subcategories_image"=>"required|image",
            ]);
            $fileExtension = $categoryValidation["subcategories_image"]->getClientOriginalExtension();
            $imageName = time() . "_".uniqid() . "." . $fileExtension;
            $path = public_path("images/categories/");
            $categoryValidation["subcategories_image"]->move($path,$imageName);
            Subcategories::create([
                "category_id"=>$categoryValidation["category_id"],
                "subcategories"=>$categoryValidation["subcategories"],
                "subcategories_image"=>$imageName,
            ]);
            return response()->json(["message"=>"subcategories Are Add","status"=>201],201);

        }catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422],422);
        }
    }
    public function showSubcategory($cat){
        $id = Categories::where("category",$cat)->first()->id;
        $data = Subcategories::where("category_id",$id)->get();
        if($data->isEmpty()){
            return response()->json(["message"=>"the subcategory is empty","status"=>404],404);
        }
        return response()->json(["data"=>$data,"status"=>200],200);
    }    
    
    public function showDetailsByCategory($cat){
        $category = Categories::where("category",$cat)->first();
        if(!$category){
            return response()->json(["message"=>"category not found","status"=>404],404);
        }
        $categoryDetails = CategoryDetails::where('category_id', $category->id)->orderBy('created_at', 'desc')->take(5)->get();
        if($categoryDetails->isEmpty()){
            return response()->json(["message"=>"the category details is empty","status"=>404],404);
        }
        return response()->json(["data"=>$categoryDetails,"status"=>200],200);

    }
    public function showDetails($cat,$sub){
        $category = Categories::where("category",$cat)->first();
        $subcategoryId = Subcategories::where("subcategories",$sub)->where("category_id",$category->id)->first();
        if(!$category){
            return response()->json(["message"=>"category not found","status"=>404],404);
        }
        else if(!$subcategoryId){
            return response()->json(["message"=>"subcategory not found","status"=>404],404);
        }
        $categoryDetails = CategoryDetails::where('category_id', $category->id)
        ->where('subcategory_id', $subcategoryId->id)
        ->get();
        return $categoryDetails;
    }
    public function storeCategorydetails(Request $request){
        try{
            $CategorydetailsValidation = $request->validate([
                "categoryDetails"=>"required|string",
                "category_id"=>"required|integer",
                "subcategory_id"=>"required|integer",
                "category_details_image"=>"required|image",
            ]);
            $imageExtension = $CategorydetailsValidation["category_details_image"]->getClientOriginalExtension();
            $imageName = time() . "_" . uniqid() . "." . $imageExtension;
            $path = public_path("images/categories/");
            $CategorydetailsValidation["category_details_image"]->move($path,$imageName);
            CategoryDetails::create([
                "categoryDetails"=>$CategorydetailsValidation["categoryDetails"],
                "category_id"=>$CategorydetailsValidation["category_id"],
                "subcategory_id"=>$CategorydetailsValidation["subcategory_id"],
                "category_details_image"=>$imageName,
            ]);
            return response()->json(["message"=>"Category details Are Add","status"=>201],201);
        }catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422],422);
        }
    }
    public function adminSubcategory($id){
        $data = Subcategories::where("category_id",$id)->get();
        if($data->isEmpty()){
            return response()->json(["message"=>"the subcategory is empty","status"=>404],404);
        }
        return response()->json(["data"=>$data,"status"=>200],200);
    }    

    public function adminDetail($id,$id_sub){
        $categoryDetails = CategoryDetails::where('category_id',$id)
        ->where('subcategory_id', $id_sub)
        ->get();
        if($categoryDetails->isEmpty()){
            return response()->json(["message"=>"the category Details is empty","status"=>404],404);
        }
        return response()->json(["data"=>$categoryDetails,"status"=>200],200);

    }
    function adminSubcategoryShow(){
        $subcategory = Subcategories::with("category")->get();
        if($subcategory->isEmpty()){
            return response()->json(["message"=>"subcategory are empty","status"=>404],404);
        }
        return response()->json(["message"=>"subcategory","data"=>$subcategory,"status"=>200],200);
    }
    function adminCategoryDetailsShow(){
        $categoryDetails = CategoryDetails::with("category")->with("subcategory")->get();
        if($categoryDetails->isEmpty()){
            return response()->json(["message"=>"category details are empty","status"=>404],404);
        }
        return response()->json(["message"=>"category details ","data"=>$categoryDetails,"status"=>200],200);
    }
}
