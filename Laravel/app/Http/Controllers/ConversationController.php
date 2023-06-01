<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\Proposal;
use Illuminate\Http\Request;

class ConversationController extends Controller
{

    public function index()
    {
        $conversations = auth()->user()->conversations()->latest()->with('messages')->get();

        return response()->json([
            'status'=>200,
            'result'=>$conversations
        ]); 
    }

    public function show($id)
    {
        $conversation = auth()->user()->conversations()->where('id', $id)->latest()->with('messages', 'good')->get();

        if ($conversation) {
            
            return response()->json([
                'status'=>200,
                'result'=>$conversation
            ]);
            
        }   
        else 
        {
            return response()->json([
                'status'=>404,
                'message'=>'No Found',
            ]);
        }
    }

    public function confirm(Request $request)
    {
        $proposal = Proposal::findOrFail($request->id);
        $proposal->fill(['validated' => 1]);

        if ($proposal->isDirty()) 
        {
            $proposal->save();
            
            $conversation = Conversation::create([
                'from' => auth()->user()->id,
                'to' => $proposal->user->id,
                'good_id' => $proposal->good_id
            ]);

            Message::create([
                'user_id' => auth()->user()->id,
                'conversation_id' => $conversation->id,
                'content' => 'Salut vous pouvez vous rendre disponible quand pour la visite du bien ?' 
            ]);

            return response()->json([
                'status'=>200,
                'message'=>'Reply sent',
            ]);
        }
    }
    
    public function sendMessage(Request $request )
    {
        $convers = Conversation::findOrFail($request->id);

        if ($convers) 
        {
            $request->validate([
                'content'=>'required',
            ]);

            Message::create([
                'user_id' => auth()->user()->id,
                'conversation_id' => $convers->id,
                'content' => $request->content 
            ]);

            return response()->json([
                'status'=>200,
                'message'=>'Message sent'
            ]);

        }

    }
}
