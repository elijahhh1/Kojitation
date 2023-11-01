<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

use Illuminate\Validation\Rules\File as FileValidation;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Videos',[
            'videos'=>Video::where('user_id',Auth::id())->get()
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
        $request->validate([
            'video' => ['required',FileValidation::types(['mp4'])]
        ]);
        

        $video = $request->file('video') ;
        $clean_name= preg_replace('/[^A-Za-z0-9\.\_]/', '', $video->getClientOriginalName());
        $video_name=strval(Auth::id()).'_'.$clean_name;
        $location='uploads/videos/user_'.strval(Auth::id()).'/';
        $path=public_path($location);
        if (!file_exists($path)) {
            File::makeDirectory($path,0777,true);
        }
        $new_video = $location.$video_name;
        $request->file('video')->move($path, $new_video);
        
        Video::create([
            'user_id'=>Auth::id(),
            'name'=>$video_name,
            'path'=>$new_video
        ]);
            
    }

    /**
     * Display the specified resource.
     */
    public function show(Video $video)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Video $video)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Video $video)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
        //
    }
}
