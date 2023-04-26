<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ModeratorController extends Controller
{
    public function index() {
        $moderator = User::where("role_as", 2)->get();
        return response()->json([
            'status'=>200,
            'moderator'=>$moderator
        ]);
    }

    public function store(Request $request) {

        $validator = Validator::make($request->all(),[
            'name'=>'required|max:191',
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:8',
            'role_as' => 'required'
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
        
            $moderator = User::create([
                'name' => $request->name,
                'email' =>$request->email,
                'password' =>Hash::make($request->password),
                'role_as' =>$request->role_as
            ]);

            $moderator->save();
            return response()->json([
                'status' =>200,
                'message' => 'Moderator Added Succesfully'
            ]);

        }
    }

    public function edit($id)
    {
        $moderator = User::find($id);
        if ($moderator) 
        {
            return response()->json([
                'status' => 200,
                'moderator' => $moderator
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 404,
                'moderator' => 'Not Found'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name'=>'required|max:191',
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:8',
            'role_as' => 'required'
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
            $moderator = User::find($id);
            if($moderator)
            {
                $moderator->name = $request->input('name');
                $moderator->email = $request->input('email');
                $moderator->password = Hash::make($request->password);
                $moderator->role_as = $request->input('role_as');
                $moderator->save();
                return response()->json([
                    'status'=>200,
                    'message'=>'Moderator Updated Successfully',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'No Moderator ID Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $moderator = User::find($id);
        if ($moderator) 
        {
            $moderator->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Moderator Deleted Successfully',
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
