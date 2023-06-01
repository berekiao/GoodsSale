<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Good;
use Illuminate\Http\Request;

class CheckIfLoveSubmitted
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $id = $request->id;
        $user = $request->user();

        $good = Good::findOrFail($id);

        if ($good->likes()->where('user_id', $user->id)->exists()) {
            return response()->json([
                'status'=> 403,
                'message' => 'You have already liked this good.',
            ]);
        }

        return $next($request);
    }
}
