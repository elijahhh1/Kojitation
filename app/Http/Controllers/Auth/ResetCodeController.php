<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\SendPasswordResetCode;
use App\Models\PasswordResetCode;
use App\Models\User;
use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ResetCodeController extends Controller
{
    public function generate(Request $request){
        $faker = Factory::create();
        $user = User::where('email',$request->email)->first();

        if(!$user) throw ValidationException::withMessages(['email' => 'This Email Address Is Not Yet Registered']);

        $code = strval($faker->numberBetween(111111,999999));
        
        PasswordResetCode::updateOrCreate([
            'user_id'=>$user->id
        ],[
            'code'=>$code
        ]);

        Mail::to($request->email)
            ->send(new SendPasswordResetCode($user->name,$code)
        );
    }

    public function reset_password(Request $request){
        // Use Carbon to get the current time and subtract 60 minutes
        $one_hour_ago = Carbon::now()->subMinutes(60)->toDateTimeString();
        $reset_code = PasswordResetCode::with(['user'])->where('code', $request->pin)->where('created_at', '>=', $one_hour_ago)->first();

        if(!$reset_code) throw ValidationException::withMessages(['pin' => 'This is either an Invalid Code or the Code has  already expired']);
        return Inertia::render('Auth/PasswordReset',[
            'user'=>$reset_code->user,
            'code'=>$request->pin
        ]);
    }

    public function password_confirmation(Request $request){
        $request->validate(['password'=>'confirmed|required']);

        $code = PasswordResetCode::where('user_id',$request->id)->where('code',$request->code)->first();
        $user = User::find($request->id);
        if(!$code) throw ValidationException::withMessages(['password' => 'Form has Expired. Please return to Login  Page']);
        if(!$user) throw ValidationException::withMessages(['password' => 'Form has Expired. Please return to Login  Page']);

        $user->update([
            'password'=>bcrypt($request->password)
        ]);

        return redirect()->to(route('welcome'));

    }
}
