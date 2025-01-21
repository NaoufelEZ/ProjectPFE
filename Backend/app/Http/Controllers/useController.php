<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class useController extends Controller
{
    public function index(){
        $user = User::all();
        if(!$user->isEmpty()){
            return response()->json(["data"=>$user,"status"=>200], 200);
        }
        return response()->json(["data"=>"Users are Empty","status"=>404], 404);
    }
}
