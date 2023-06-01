<?php

namespace App\Http\Controllers;

use App\Models\Good;
use App\Models\Reporting;
use Illuminate\Http\Request;

class ReportingController extends Controller
{

    public function index()
    {
        $like = auth()->user()->likedGoods()->get();

        return response()->json([
            'status'=>200,
            'good'=>$like
        ]);
    }

    public function like($id)
    {
        $good = Good::findOrFail($id);
        $user = auth()->user();

        if (!$good->likes()->where('user_id', $user->id)->exists()) {
            $good->likes()->attach($user->id);
        }

        return response()->json([
            'status'=>200,
            'message' => 'Good like with success'
        ]);
    }

    public function unlike($id)
    {
        $good = Good::findOrFail($id);
        $user = auth()->user();

        if ($good->likes()->where('user_id', $user->id)->exists()) {
            $good->likes()->detach($user->id);
        }

        return response()->json([
            'status'=>200,
            'message' => 'Good unlike with success'
        ]);
    }


}
