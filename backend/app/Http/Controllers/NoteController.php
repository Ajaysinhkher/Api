<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Note;

class NoteController extends Controller
{

    public function get(Request $request)
    {
       $userId = $request->query('user_id');

       if (!$userId) {
        return response()->json(['error' => 'User ID is required'], 400);
        }

        $notes = Note::where('user_id', $userId)->get();

        return response()->json(['notes'=>$notes]);

    }


    public function create(Request $request){
        $request->validate([
            'title'=>'required',
            "content"=>'required|min:3|max:1000',
            'user_id'=>'required',
        ]);


        $note = Note::create([
            'title'=>$request->title,
            'content'=>$request->content,
            'user_id'=>$request->user_id,
        ]);

        return response()->json(['note'=>$note]);
       
    }
}
