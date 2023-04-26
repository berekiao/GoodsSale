<?php

namespace App\Http\Controllers;

use App\Models\Good;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class GoodController extends Controller
{

    public function index()
    {
        $good = Good::where('user_id', Auth::user()->id )->get();
        return response()->json([
            'status'=>200,
            'goods'=>$good
        ]);
    }

    public function view()
    {
        $good = Good::all();
        return response()->json([
            'status'=>200,
            'goods'=>$good
        ]);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'=>'required|max:100',
            'category_id'=>'required',
            'price'=>'required',
            'description'=>'required',
            'image'=>'required|image',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }
        else 
        {
            $good = new Good;
            $good->name = $request->input('name');
            $good->category_id = $request->input('category_id');
            $good->price = $request->input('price');
            $good->description = $request->input('description');
            
            if($request->hasFile('image'))
            {
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time() .'.'.$extension;
                $file->move('uploads/good/', $filename);
                $good->image = 'uploads/good/'.$filename;
            }

            $good->status = $request->input('status') == true ? '1':'0';
            $good->approval = $request->input('approval') == true ? '1':'0';

            $good->user_id = Auth::user()->id;


            $good->save();

            return response()->json([
                'status'=>200,
                'message'=>'Request publication Goods Successfully',
            ]);
        }
    }

    public function edit ($id)
    {
        $good = Good::find($id);

        if ($good) {
            
            return response()->json([
                'status'=>200,
                'good'=>$good,
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

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name'=>'required|max:100',
            'category_id'=>'required',
            'price'=>'required',
            'description'=>'required',
            //'image'=>'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }
        else 
        {
            $good = Good::find($id);

            if ($good) 
            {
                $good->name = $request->input('name');
                $good->category_id = $request->input('category_id');
                $good->price = $request->input('price');
                $good->description = $request->input('description');
                $good->status = $request->input('status');
                $good->approval = $request->input('approval');


                $good->update();

                return response()->json([
                    'status'=>200,
                    'message'=>'Update Goods Successfully',
                ]);
            }
            else 
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'Not Found',
                ]);
            }

            
        }
    }

    public function destroy($id)
    {
        $good = Good::find($id);
        if ($good) 
        {
            $good->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Good Deleted Successfully',
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'Not Found',
            ]);
        }
    }


}
