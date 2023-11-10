<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Chatbot;
use Illuminate\Http\Request;
use App\Models\Result;
use Illuminate\Support\Facades\Auth;

class ChatbotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Chatbot',[
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
            'user_id'=>Auth::id(),
            'description'=>$request->description,
            'remarks'=>$request->remarks
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chatbot $chatbot)
    {
        //
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
