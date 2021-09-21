<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length');
header('Access-Control-Allow-Origin: *'); 

Route::get('/', [UserController::class, 'index']);
Route::get('/user', [UserController::class, 'user'])->middleware('auth:api'); 
Route::post('/register', [UserController::class, 'register']);
Route::post('forgot', [UserController::class, 'forgot']); 
Route::post('reset', [UserController::class, 'reset']);


Route::get('/show', [UserController::class, 'show'])->middleware('auth:api'); ; 