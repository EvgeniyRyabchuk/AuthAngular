<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Mockery\Exception\InvalidOrderException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    // public function register()
    // {
    //     // $this->reportable(function (Throwable $e, $request) {
    //     //     return response(['error' => $e->getMessage()], $e->getCode() ? : 400);
    //     // });
        
    //     // $this->renderable(function (NotFoundHttpException $e, $request) {
    //     //     if ($request->is('api/*')) {
    //     //         return response(['error' => $e->getMessage()], $e->getCode() ? : 400);
    //     //     }
    //     // });
    
    //     // $this->renderable(function (NotFoundHttpException $e, $request) {
    //     //     if ($request->is('api/*')) {
    //     //         return response()->json([
    //     //             'message' => 'Record not found.'
    //     //         ], 404);
    //     //     }
    //     // });
    // }

    public function register()
    {
        $this->renderable(function (Exception $e, $request) {
            if($e instanceof ValidationException)
            { 
                return response(['error' => $e->errors(), 400]); 
            }
            //return response(['error' => $e->getMessage()], $e->getCode() ?: 400); 
        }); 
    }
}