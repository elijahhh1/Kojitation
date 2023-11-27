<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Mood;
use App\Models\Dashboard;
use App\Models\Result;
use App\Models\SendFeedback;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::find(Auth::id());
        if ($user->level == 1) {
            $user = User::where('level', '!=', 1)->first();
        }

        return Inertia::render('Dashboard', [
            'moods' => Mood::where('user_id', $user->id)
                ->whereMonth('start', now()->month)
                ->get(),
            'feedbacks' => SendFeedback::with(['user'])->get(),
            'stress_results' => Result::with(['user'])->get(),
            'users' => User::where('level', '!=', 1)->get(),
            'current_user' => $user->id //for debugging purposes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::find(Auth::id());
        $user->show_introduction = 1;
        $user->update();
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $dashboard)
    {
        return Inertia::render('Dashboard', [
            'moods' => Mood::where('user_id', Auth::id())
                ->whereMonth('start', $dashboard->month)
                ->get()
        ]);
    }

    public function show_user_mood(Request $dashboard)
    {
        $mood = Mood::where('user_id', $dashboard->user_id)
            ->whereMonth('start', $dashboard->month)
            ->get();
        //return [$dashboard->user_id, $dashboard->month];

        return $mood;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dashboard $dashboard)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dashboard $dashboard)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dashboard $dashboard)
    {
        //
    }
}
