<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class authenticateApiKey
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if($request->header("x-api-key") != env("APIkey","4fdc278b7935a7b9368ee6bde5f48f4cb237ff0f")){
            return response()->json(["data"=>"Api key Not Found Or Wrong","status"=>403],403);
        }
        return $next($request);
    }
}
