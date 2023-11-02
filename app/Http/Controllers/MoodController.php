<?php

namespace App\Http\Controllers;

use App\Models\Mood;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use function Psy\debug;

class MoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('MoodCalendar', [
            'moods' => Mood::where('user_id', Auth::id())->get()
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
        Mood::create([
            'user_id' => Auth::id(),
            'mood_level' => $request->mood_level,
            'icon' => $request->icon,
            'description' => $request->description,
            'start' => now(),
            'end' => Carbon::now()->addHour()
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function test()
    {
        $moods = Mood::where('user_id', Auth::id())->whereMonth('start', now()->month)->get();
        dd($moods);
    }
}
