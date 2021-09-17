<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function user(Request $request)
    {
        return $request->user(); 
    }

    public function register(UserRegisterRequest $request)
    {
        $user = new User(); 
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save(); 

        return 'user created successfully!'; 
    }

    public function show(Request $request)
    {
        return response(['message' =>'Hello world']); 
    }
}
