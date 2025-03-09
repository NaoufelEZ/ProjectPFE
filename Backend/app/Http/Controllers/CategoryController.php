<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\CategoryDetails;
use App\Models\Subcategories;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function showSubcategory(){
        $data = Subcategories::get();
        return response()->json(["data"=>$data,"status"=>200],200);
    }    
    
    public function showDetails($id_cat,$id_sub){
        $category = Categories::find($id_cat);
        $subcategory = Subcategories::find($id_sub);
        if(!$category){
            return response()->json(["message"=>"category not found","status"=>404],404);
        }
        else if(!$subcategory){
            return response()->json(["message"=>"subcategory not found","status"=>404],404);
        }
        $categoryDetails = CategoryDetails::where('category_id', $id_cat)
        ->where('subcategory_id', $id_sub)
        ->get();

return $categoryDetails;

    }
}
