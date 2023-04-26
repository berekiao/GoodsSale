<?php

namespace App\Http\Controllers;

use App\Models\Good;
use Illuminate\Http\Request;

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

    public function viewgood($name)
    {
        $good = Good::where('name', $name)->get();
        return response()->json([
            'status' => 200,
            'good' => $good
        ]);
    }
}
