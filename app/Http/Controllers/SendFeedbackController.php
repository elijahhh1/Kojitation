<?php

namespace App\Http\Controllers;

use App\Models\SendFeedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SendFeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        SendFeedback::create([
            'user_id' => Auth::id(),
            'message' => $request->message
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(SendFeedback $sendFeedback)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SendFeedback $sendFeedback)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SendFeedback $sendFeedback)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SendFeedback $sendFeedback)
    {
        //
    }
}
