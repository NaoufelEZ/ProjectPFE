<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class userController extends Controller
{
    public function store(Request $request){
        $validUser = $request->validate(
            [
                "First_name"=>"required|String|min:30",
            ]);
    }
}
