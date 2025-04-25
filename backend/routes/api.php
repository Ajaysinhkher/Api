<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NoteController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::get('/get',[NoteController::class,'get']);
Route::post('/create',[NoteController::class,'create']);
// Route::middleware('auth:sanctum')->post('/create',[NoteController::class,'create']);


// Route::middleware('auth:sanctum')->get('/user', fn() => auth()->user());
// Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
