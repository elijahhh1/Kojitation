<?php

use App\Http\Controllers\Auth\ResetCodeController;
use App\Http\Controllers\ChatbotController;
use Inertia\Inertia;
use App\Models\Document;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\MoodController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskItemController;
use App\Http\Controllers\SendFeedbackController;
use App\Mail\SendPasswordResetCode;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

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
    Route::get('/show/{month}', [DashboardController::class, 'show'])->name('show');
    Route::get('/store', [DashboardController::class, 'store'])->name('store');
    Route::post('/show_user_mood', [DashboardController::class, 'show_user_mood'])->name('show_user_mood');
});

Route::middleware(['auth'])->group(function () {

    Route::prefix('documents')->name('documents.')->group(function () {
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

    Route::prefix('mood')->name('mood.')->group(function () {
        Route::get('/', [MoodController::class, 'index'])->name('index');
        Route::post('/store', [MoodController::class, 'store'])->name('store');
        Route::get('/test', [MoodController::class, 'test'])->name('test');
    });

    Route::prefix('videos')->name('videos.')->group(function () {
        Route::get('/', [VideoController::class, 'index'])->name('index');
        Route::post('/store', [VideoController::class, 'store'])->name('store');
        Route::post('/destroy', [VideoController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('tasks')->name('tasks.')->group(function () {
        Route::get('/', [TaskController::class, 'index'])->name('index');
        Route::post('/store', [TaskController::class, 'store'])->name('store');
        Route::post('/destroy/{id}', [TaskController::class, 'destroy'])->name('destroy');
        Route::post('/update/{id}', [TaskController::class, 'update'])->name('update');
    });

    Route::prefix('task_list')->name('task_list.')->group(function () {
        Route::post('/store', [TaskItemController::class, 'store'])->name('store');
        Route::post('/destroy/{id}', [TaskItemController::class, 'destroy'])->name('destroy');
        Route::post('/update/{id}', [TaskItemController::class, 'update'])->name('update');
    });

    Route::prefix('chatbot')->name('chatbot.')->group(function () {
        Route::get('/', [ChatbotController::class, 'index'])->name('index');
        Route::get('/show', [ChatbotController::class, 'show'])->name('show');
        Route::post('/store', [ChatbotController::class, 'store'])->name('store');
    });

    Route::prefix('send_feedback')->name('feedback.')->group(function () {
        Route::post('/store', [SendFeedbackController::class, 'store'])->name('store');
    });
});


Route::get('/preview/{id}', function ($id) {
    return Inertia::render('Public', [
        'document' => Document::where('id', $id)->where('is_published', 1)->firstOrFail()
    ]);
})->name('preview');

Route::post('generate-code',[ResetCodeController::class,'generate'])->name('generate');
Route::post('reset_password/{email}',[ResetCodeController::class,'reset_password'])->name('reset_password');
Route::get('reset_password',function(){
    return redirect()->to(route('welcome'));
});
Route::post('password_confirmation',[ResetCodeController::class,'password_confirmation'])->name('password_confirmation');

Route::get('/test',function(){
    return Inertia::render('Auth/PasswordReset');
});

require __DIR__ . '/auth.php';
