<?php

namespace App\Http\Controllers;

use App\Mail\ResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function send($to, $token)
    {
        $details = [
            'title' => 'Mail from TestSite', 
            'body' => "THis is for testing"
        ]; 
      
        Mail::to($to)->send(new ResetPassword($details, $token)); 
    }

    public function reset()
    {
        return response(['message' =>'Hello world']); 
    }
}
