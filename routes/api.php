<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FirstTable;
use App\Http\Controllers\SecondTable;
use App\Http\Controllers\CsrfCookieController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/store-in-first-table', [FirstTable::class, 'store']);
Route::get('/show-from-first-table', [FirstTable::class, 'show']);
Route::get('/edit-from-first-table/{id}', [FirstTable::class, 'edit']);
Route::patch('/update-from-first-table/{id}', [FirstTable::class, 'update']);
Route::delete('/destroy-from-first-table/{id}', [FirstTable::class, 'destroy']);

Route::post('/store-in-second-table', [SecondTable::class, 'store']);
Route::get('/show-from-second-table', [SecondTable::class, 'show']);
Route::get('/edit-from-second-table/{id}', [SecondTable::class, 'edit']);
Route::patch('/update-from-second-table/{id}', [SecondTable::class, 'update']);
Route::delete('/destroy-from-second-table/{id}', [SecondTable::class, 'destroy']);

Route::get('/refresh-csrf-token', [CsrfCookieController::class, 'show']);
