<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotRequest;
use App\Http\Requests\ResetRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Models\User;
use GuzzleHttp\Psr7\Message;
use Illuminate\Http\Request;
use Illuminate\Mail\Message as MailMessage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

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
        
        return $user; 
    }

    public function show(Request $request)
    {
        // if (($user = Auth::user()) !== null) {
        
        if(Auth::guard('api')->check())
            return response(['message' =>'Hello world']); 
    }

    public function forgot(ForgotRequest $request)
    {
        $email = $request->input('email');
        
        if(User::where('email', $email)->doesntExist()) 
        {
            return response([
                'message' => 'User does\'t exist!'
            ], 404); 
        }

        $token = \illuminate\Support\Str::random(10); 
        
        try
        {
            DB::table('password_resets')->insert([
                'email' => $email, 
                'token' => $token
            ]); 

            // Send email 

            // Mail::send('Mails.forgot', ['token' => $token], function (Message $message) use ($email) {
            //     $message->to($email); 
            //     $message->subject('Reset your password'); 
            // }); 
            
            Mail::send('Mails.forgot', ['token' => $token], function (MailMessage $message) use ($email)
            {
                $message->to($email); 
                $message->subject('Reset your password'); 
            });

            return response([
                'Check you email!'
            ]); 
        }
        catch(\Exception $exception)
        {
            return response([
                'message' => $exception->getMessage(), 
            ], 400);     
        }
    }

    public function reset(ResetRequest $request)
    {
        $token = $request->input('token'); 
        
        if(!$passwordReset = DB::table('password_resets')->where('token', $token)->first())
        {
            return response(['message' => 'Invalid token!'], 400);  
        }

        /*  @var User $user */
        if(!$user = User::where('email', $passwordReset->email)->first()) 
        {
            return response([
                'message' => 'User does\'t exist!'
            ], 404); 
        }
        
        $user->password = Hash::make($request->input('password')); 
        $user->save(); 

        return response([
            'message' => 'success'
        ]); 
    }
}
