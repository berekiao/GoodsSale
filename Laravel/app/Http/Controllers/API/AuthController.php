<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){

        $request->validate([
            'name'=>'required|max:191',
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' =>$request->email,
            'password' =>Hash::make($request->password),
            'role_as' =>$request->role_as,
        ]);

        $token = $user->createToken($user->email.'_Token')->plainTextToken;

        return response()->json([
            'status'=>200,
            'username' =>$user->name,
            'token' =>$token,
            'role' =>$user->role_as,
            'message' =>'Registered Successfully'
        ]);
        
    }

    public function login(Request $request){

        $request->validate([
            'email'=>'required|max:191',
            'password'=>'required',
        ]);

        $user = User::where('email', $request->email)->first();
 
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid Credentials'
            ]);
        } 
        else 
        {
            if ($user->role_as == 3) //3- admin 
            {
                $role = 'admin';
                $token= $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;
                
            } 
            else if ($user->role_as == 1) //3- seller 
            {
                $role = 'seller';
                $token= $user->createToken($user->email.'_Token', [''])->plainTextToken;
                
            }
            else if ($user->role_as == 2) //2- moderator 
            {
                $role = 'moderator';
                $token= $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;
                
            } 
            else {
                $role = '';
                $token = $user->createToken($user->email.'_Token', [''])->plainTextToken;
            }
            
            return response()->json([
                'status'=>200,
                'username' =>$user->name,
                'token' =>$token,
                'message' =>'Logged in Successfully',
                'role' =>$role
            ]);
        }

        
    }
    

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status'=>200,
            'message' =>'Logged Out Successfully'
        ]);
    }
}
