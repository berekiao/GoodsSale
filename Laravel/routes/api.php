<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ModeratorController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\GoodController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\ReportingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('getGood', [FrontendController::class, 'good']);
Route::get('viewgooddetail/{id}', [FrontendController::class, 'viewgood']);

Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function () {

    Route::get('/checkingAuthenticated', function () {
        return response()->json(['message'=>'You are in', 'status'=>200]);
    });

    //Category
    Route::post('store-category', [CategoryController::class, 'store']);
    Route::get('view-category', [CategoryController::class, 'index']);
    Route::get('edit-category/{id}', [CategoryController::class, 'edit']);
    Route::put('update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('delete-category/{id}', [CategoryController::class, 'destroy']);

    //Moderator
    Route::post('store-moderator', [ModeratorController::class, 'store']);
    Route::get('view-moderator', [ModeratorController::class, 'index']);
    Route::get('edit-moderator/{id}', [ModeratorController::class, 'edit']);
    Route::put('update-moderator/{id}', [ModeratorController::class, 'update']);
    Route::delete('delete-moderator/{id}', [ModeratorController::class, 'destroy']);
});



Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('all-category', [CategoryController::class, 'allcategory']);

    Route::post('store-good', [GoodController::class, 'store']);
    Route::get('view-good', [GoodController::class, 'index']);
    Route::get('all-good', [GoodController::class, 'view']);
    Route::get('edit-good/{id}', [GoodController::class, 'edit']);
    Route::post('update-good/{id}', [GoodController::class, 'update']);
    Route::delete('delete-good/{id}', [GoodController::class, 'destroy']);
    Route::get('publish-good', [FrontendController::class, 'publish']);

    Route::get('list-seller', [FrontendController::class, 'seller']);
    Route::get('list-request', [FrontendController::class, 'request']);

    Route::get('viewProposal', [ProposalController::class, 'index']);
    Route::get('listProposal', [ProposalController::class, 'listproposal']);

    Route::get('confirmProposal/{id}', [ConversationController::class, 'confirm']);
    Route::get('conversations', [ConversationController::class, 'index']);
    Route::get('conversations/{id}', [ConversationController::class, 'show']);
    Route::post('sendMessage/{id}', [ConversationController::class, 'sendMessage']);

    Route::delete('unlikeGood/{id}', [ReportingController::class, 'unlike']);
    Route::get('like', [ReportingController::class, 'index']);

});


Route::middleware(['auth:sanctum', 'proposal'])->group(function () {
    
    Route::post('proposal/{id}', [ProposalController::class, 'submitStore']);
    
});

Route::middleware(['auth:sanctum', 'likeGood'])->group(function () {
    
    Route::post('good/{id}', [ReportingController::class, 'like']);
    
});