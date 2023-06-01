<?php

namespace App\Http\Controllers;

use App\Models\Good;
use App\Models\Proposal;
use App\Models\RequestLetter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProposalController extends Controller
{

    public function index()
    {
        $proposals = Proposal::where('user_id', auth()->user()->id)->with('requestLetter', 'good')->orderby('created_at', 'desc')->get();

        return response()->json([
            'status'=> 200,
            'proposal' => $proposals
        ]);

    }

    public function listproposal()
    {
        $userGoods = Good::where('user_id', auth()->user()->id)->get();

        $GoodIds = [];
        foreach ($userGoods as $goods) {
            $GoodIds[] = $goods->id;
        }

        $listProposal = Proposal::whereIn('good_id', $GoodIds)->with('requestLetter', 'good', 'user')->get();

        return response()->json([
            'status'=> 200,
            'proposal' => $listProposal
        ]);
 
    }

    public function submitStore(Request $request, Good $id)
    {
        $proposal = Proposal::create([
            'good_id' => $id->id,
            'validated' => false 
        ]);

        $request->validate([
            'content' => 'required',
        ]);

        RequestLetter::create([
            'proposal_id' => $proposal->id,
            'content' => $request->input('content')
        ]);

        return response()->json([
            'status'=>200,
            'message'=>'Visit request made successfully',
        ]);
    }
}
