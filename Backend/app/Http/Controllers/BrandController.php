<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class BrandController extends Controller
{
    public function store(Request $request){
        try{
            $brandValidation = $request->validate([
                "brand"=>"string|required",
                "logo"=>"image|required",
            ]);
            Brand::create([
                "brand"=>$brandValidation["brand"],
                "logo"=>$brandValidation["logo"],
            ]);
            return response()->json(["message"=>"Brand Added","status"=>201],201);
        }catch(ValidationException $e){
            return response()->json(["message"=>$e->errors(),"status"=>422],422);
        }

    }
}
