<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class userController extends Controller
{
    public function store(Request $request){
        $validUser = $request->validate([
                "First_name"=>"required|String|min:30",
                "Last_name"=>"required|String|min:30",
                "Email"=>"required|email|unique",
                "Password"=>"required|String|min:6",
                "Phone"=>"required|String|min:30",
                "Role"=>"required|String",
            ]);
            if($validUser){
                return response()->json(["data"=>"user add","status"=>"200"], 200);
            }
    }
}
