<?php

namespace App\Http\Controllers;

use App\Models\Good;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FrontendController extends Controller
{
    public function good()
    {
        $good = Good::where('status', 1)->get();
        return response()->json([
            'status' => 200,
            'good' => $good
        ]);
        
    }

    public function viewgood($id)
    {
        $good = Good::where('id', $id)->get();
        return response()->json([
            'status' => 200,
            'good' => $good
        ]);
    }

    public function publish()
    {
        $good = Good::where('status', 1)->where('user_id', Auth::user()->id )->get();
        return response()->json([
            'status' => 200,
            'good' => $good
        ]);
    }

    public function seller()
    {
        $seller = User::where('role_as', 1)->get();
        return response()->json([
            'status' => 200,
            'seller' =>$seller
        ]);
    }

    public function request()
    {
        $request = Good::where('status', 0)->get();
        return response()->json([
            'status' => 200,
            'request' =>$request
        ]);
    }
}
