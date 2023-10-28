<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\MoodController;
use App\Http\Controllers\ProfileController;
use App\Models\Document;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

Route::middleware(['auth'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');
});

Route::middleware(['auth'])->group(function () {

    Route::prefix('documents')->name('documents.')->group(function(){
        Route::get('/', [DocumentController::class, 'index'])->name('index');
        Route::get('/show/{id}', [DocumentController::class, 'show'])->name('show');
        Route::post('/store', [DocumentController::class, 'store'])->name('store');
        Route::post('/destroy/{id}', [DocumentController::class, 'destroy'])->name('destroy');
        Route::post('/restore/{id}', [DocumentController::class, 'restore'])->name('restore');
        Route::post('/update/{id}', [DocumentController::class, 'update'])->name('update');
        Route::post('/remove_icon/{id}', [DocumentController::class, 'remove_icon'])->name('remove_icon');
        Route::post('/remove_cover/{id}', [DocumentController::class, 'remove_cover'])->name('remove_cover');
        Route::post('/permanent_destroy/{id}', [DocumentController::class, 'permanent_destroy'])->name('permanent_destroy');
    });


    Route::prefix('mood')->name('mood.')->group(function(){
        Route::get('/', [MoodController::class, 'index'])->name('index');
        Route::post('/store', [MoodController::class, 'store'])->name('store');
    });

});


Route::get('/preview/{id}', function ($id) {
    return Inertia::render('Public', [
        'document' => Document::where('id', $id)->where('is_published', 1)->firstOrFail()
    ]);
})->name('preview');



require __DIR__ . '/auth.php';