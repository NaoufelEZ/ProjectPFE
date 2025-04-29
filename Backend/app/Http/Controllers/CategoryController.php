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
                "subcategories_image"=>"required|mimes:jpeg,png,jpg,mp4",
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
        $categoryDetails = CategoryDetails::with("subcategory")->where('category_id', $category->id)->orderBy('created_at', 'desc')->take(5)->get();
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
    public function storeCategoryDetails(Request $request){
        try{
            $CategorydetailsValidation = $request->validate([
                "categoryDetails"=>"required|string",
                "category_id"=>"required|integer",
                "subcategory_id"=>"required|integer",
                "category_details_image"=>"required|mimes:jpeg,png,jpg,mp4",
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
    public function adminCategoryDetailsShow(){
        $categoryDetails = CategoryDetails::with("category")->with("subcategory")->get();
        if($categoryDetails->isEmpty()){
            return response()->json(["message"=>"category details are empty","status"=>404],404);
        }
        return response()->json(["message"=>"category details ","data"=>$categoryDetails,"status"=>200],200);
    }
    public function deleteCategory($id){
        $category = Categories::find($id);
        if(!$category){
            return response()->json(["message"=>"Category Not Found","status"=>404],404);
        }
        $category->delete();
        return response()->json(["message"=>"Category deleted successfully","status"=>200],200);
    }

    public function getAdminCategory($id){
        $category = Categories::find($id);
        if(!$category){
            return response()->json(["message"=>"Category Not Found","status"=>404],404);
        }
        return response()->json(["message"=>"Category get successfully","data"=>$category,"status"=>200],200);
    }

    public function updateCategory(Request $request,$id){
        try{
            $validationCategory = $request->validate([
                "category"=>"string|min:3"
            ]);
            $category = Categories::find($id);

            if (!$category) {
                return response()->json(["message" => "Category not found", "status" => 404], 404);
            }
            $category->update([
                "category"=>$validationCategory["category"],
            ]);
            return response()->json(["message"=>"Category Updated successfully","data"=>$category,"status"=>200],200);

        }catch(ValidationException $e){
            return response()->json(["message"=>"Error","data"=>$e->errors(),"status"=>422],422);
        }
       
    }

    public function getSubcategory($id){
        $subcategory = Subcategories::find($id);
        if(!$subcategory){
            return response()->json(["message"=>"Subcategory Not Found","status"=>404],404);
        }
        return response()->json(["message"=>"SubCategory get successfully","data"=>$subcategory,"status"=>200],200);
    }

    public function updateSubcategory(Request $request,$id){
        try{
            $subcategory = Subcategories::find($id);
            if (!$subcategory) {
                return response()->json(["message" => "subcategory not found", "status" => 404], 404);
            }
            $validationSubcategory = $request->validate([
                "category_id"=>"integer|required",
                "subcategories"=>"integer|required",
                "subcategories_image"=>"mimes:jpeg,png,jpg,mp4"
            ]); 
            if(!$request->hasFile("subcategories_image")){
                $subcategory->update([
                    "category_id"=>$validationSubcategory["category_id"],
                    "subcategories"=>$validationSubcategory["subcategories"],
                ]);
            return response()->json(["message"=>"Subcategory Updated successfully","status"=>200],200);

            }
            $fileExtension = $validationSubcategory["subcategories_image"]->getClientOriginalExtension();
            $fileName = time() . "_" . uniqid() . "." . $fileExtension;
            $path = public_path("images/categories/");
            $validationSubcategory["subcategories_image"]->move($path,$fileName);

            $subcategory->update([
                "category_id"=>$validationSubcategory["category_id"],
                "subcategories"=>$validationSubcategory["subcategory_id"],
                "subcategories_image"=> $fileName,
            ]);

            return response()->json(["message"=>"Category Details Updated successfully","status"=>200],200);


        }catch(ValidationException $e){
            return response()->json(["message"=>"Error","data"=>$e->errors(),"status"=>422],422);
        }
       
    }

    public function deleteSubcategory($id){
        $subcategory = Subcategories::find($id);
        if(!$subcategory){
            return response()->json(["message"=>"Subcategory Not Found","status"=>404],404);
        }
        $subcategory->delete();
        return response()->json(["message"=>"Category deleted successfully","status"=>200],200);
    }

    public function getCategoryDetails($id){
        $categoryDetails = CategoryDetails::find($id);
        if(!$categoryDetails){
            return response()->json(["message"=>"category Detail Not Found","status"=>404],404);
        }
        return response()->json(["message"=>"category Detail get successfully","data"=>$categoryDetails,"status"=>200],200);
    }

    public function updateCategoryDetails(Request $request,$id){
        try{
            $categoryDetails = CategoryDetails::find($id);
            if (!$categoryDetails) {
                return response()->json(["message" => "Category details not found", "status" => 404], 404);
            }
            $validationCategoryDetails = $request->validate([
                "category_id"=>"integer|required",
                "subcategory_id"=>"integer|required",
                "categoryDetails"=>"string|min:3|required",
                "category_details_image"=>"mimes:jpeg,png,jpg,mp4"
            ]);
            
            if(!$request->hasFile("category_details_image")){
                $categoryDetails->update([
                    "category_id"=>$validationCategoryDetails["category_id"],
                    "subcategory_id"=>$validationCategoryDetails["subcategory_id"],
                    "categoryDetails"=>$validationCategoryDetails["categoryDetails"],
                ]);
            return response()->json(["message"=>"Category Details Updated successfully","status"=>200],200);

            }
            $fileExtension = $validationCategoryDetails["category_details_image"]->getClientOriginalExtension();
            $fileName = time() . "_" . uniqid() . "." . $fileExtension;
            $path = public_path("images/categories/");
            $validationCategoryDetails["category_details_image"]->move($path,$fileName);

            $categoryDetails->update([
                "category_id"=>$validationCategoryDetails["category_id"],
                "subcategory_id"=>$validationCategoryDetails["subcategory_id"],
                "categoryDetails"=>$validationCategoryDetails["categoryDetails"],
                "category_details_image"=> $fileName,
            ]);

            return response()->json(["message"=>"Category Details Updated successfully","data"=>$categoryDetails,"status"=>200],200);


        }catch(ValidationException $e){
            return response()->json(["message"=>"Error","data"=>$e->errors(),"status"=>422],422);
        }
       
    }
    public function deleteCategoryDetails($id){
        $categoryDetails = CategoryDetails::find($id);
        if(!$categoryDetails){
            return response()->json(["message"=>"Category Details Not Found","status"=>404],404);
        }
        $categoryDetails->delete();
        return response()->json(["message"=>"Category Details deleted successfully","status"=>200],200);
    }
    
}
