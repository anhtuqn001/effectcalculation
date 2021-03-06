<?php

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('detai', 'DetaiController@index');
Route::post('detai', 'DetaiController@store');
Route::put('detai', 'DetaiController@update');
Route::delete('detai/{id}', 'DetaiController@remove');
Route::get('getdetai/{id}', 'DetaiController@getDetai');
Route::post('updatescores', 'DetaiController@updateScores');

Route::get('getdetaiexpenses', 'DetaiController@getDetaiExpenses');
Route::get('getcounteddetais', 'DetaiController@getCountedDetais');