<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{

    public function index() {
        $category = Category::all();
        return response()->json([
            'status'=>200,
            'category'=>$category
        ]);
    }

    public function allcategory()
    {
        $category = Category::all();
        return response()->json([
            'status'=>200,
            'category'=>$category
        ]);
    }

    public function store(Request $request) {

        $validator = Validator::make($request->all(),[
            'name'=>'required'
        ]);

        if ($validator->fails()) 
        {
            return response()->json([
                'status' =>400,
                'errors' => $validator->messages()
            ]);
        }
        else 
        {
        
            $category = new Category;
            $category->name = $request->input('name');

            $category->save();
            return response()->json([
                'status' =>200,
                'message' => 'Category Added Succesfully'
            ]);

        }
    }

    public function edit($id)
    {
        $category = Category::find($id);
        if ($category) 
        {
            return response()->json([
                'status' => 200,
                'category' => $category
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 404,
                'category' => 'Not Found'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name'=>'required',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $category = Category::find($id);
            if($category)
            {
                $category->name = $request->input('name');
                $category->save();
                return response()->json([
                    'status'=>200,
                    'message'=>'Category Updated Successfully',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'No Category ID Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        if ($category) 
        {
            $category->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Category Deleted Successfully',
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
