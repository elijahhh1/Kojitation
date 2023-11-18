<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Result;
use App\Models\Chatbot;
use App\Models\SendFeedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatbotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Chatbot', [
            'is_done' => Result::where('user_id', Auth::id())
                ->whereMonth('created_at', now()->month)
                ->get()
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
        Result::create([
            'user_id' => Auth::id(),
            'description' => $request->description,
            'remarks' => $request->remarks
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        // Get the current date and time
        $now = Carbon::now();

        // Get the start and end of the current month
        $startOfMonth = $now->startOfMonth()->toDateTimeString();
        $endOfMonth = $now->endOfMonth()->toDateTimeString();

        $data = ([
            'is_test_taken' => Result::where('user_id', Auth::id())->whereBetween('created_at', [$startOfMonth, $endOfMonth])->first() ? true : false
        ]);

        return $data;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chatbot $chatbot)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chatbot $chatbot)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chatbot $chatbot)
    {
        //
    }
}
