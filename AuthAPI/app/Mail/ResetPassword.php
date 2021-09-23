<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPassword extends Mailable
{
    use Queueable, SerializesModels;

    public $details; 
    public $token; 
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($details, $token)
    {
        $this->details = $details; 
        $this->token = $token; 
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('test mail for reset password')->view('Mails.resetpassword'); 
    }
}
