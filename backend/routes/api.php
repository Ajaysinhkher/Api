<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NoteController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// laravel uses auth:sanctum middleware and internally takes the token from incoming api request and compare it with the token stored in personal_tokens

// Route::get('/get',[NoteController::class,'get']);
// Route::post('/create',[NoteController::class,'create']);
Route::middleware('auth:sanctum')->post('/create',[NoteController::class,'create']);
Route::middleware('auth:sanctum')->get('/get',[NoteController::class,'get']);
Route::middleware('auth:sanctum')->delete('/delete/{id}',[NoteController::class,'delete']);
Route::middleware('auth:sanctum')->put('/update/{id}',[NoteController::class,'update']);

