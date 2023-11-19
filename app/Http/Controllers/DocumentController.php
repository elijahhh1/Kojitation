<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Grateful;
use App\Models\Happening;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Str;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Documents');
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
        $document=Document::create([
            'user_id'=>Auth::id(),
            'document_id'=>$request->document_id,
            'title'=>$request->title,
            'content'=>$request->content,
            'raw_content'=>$request->raw_content,
            'icon'=>$request->icon,
        ]);

        return Redirect::to(route('documents.show',$document->id));
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $document =Document::without(['documents'])->where('id',$id)->where('user_id',Auth::id())->orderBy('id','desc')->firstOrFail();
        if($document->user_id!=Auth::id()){
            abort(403);
        }

        Inertia::share([
            'selected_document'=>$document
        ]);

        return Inertia::render('DocumentView');
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
        $request->validate([
            'cover_image' => 'mimes:jpeg,png,jpg,webp,pdf'
        ]);
        $document = Document::findOrFail($id);
        if($document->user_id!=Auth::id()){
            abort(403);
        }

        $image = $request->file('cover_image') ;
        if($image){
            if($document->cover_image){
                @unlink(public_path($document->getAttributes()['cover_image']));
            }
            $image_name=strval($id).'_'.Str::slug($image->getClientOriginalName());
            $location='uploads/projects/project_'.strval($id).'/';
            $path=public_path($location);
            if (!file_exists($path)) {
                File::makeDirectory($path,0777,true);
            }
            $new_image = $location.$image_name;
            $request->file('cover_image')->move($path, $new_image);
            $document->update([
                'cover_image'=>$new_image
            ]);
        }
        

        Grateful::truncate();
        Happening::truncate();

        Grateful::create([
            'document_id'=>$id,
            'title'=>$request->grateful1 ?? ""
        ]);

        Grateful::create([
            'document_id'=>$id,
            'title'=>$request->grateful2 ?? ""
        ]);

        Grateful::create([
            'document_id'=>$id,
            'title'=>$request->grateful3 ?? ""
        ]);

        Happening::create([
            'document_id'=>$id,
            'title'=>$request->happenings_today1 ?? ""
        ]);

        Happening::create([
            'document_id'=>$id,
            'title'=>$request->happenings_today2 ?? ""
        ]);

        Happening::create([
            'document_id'=>$id,
            'title'=>$request->happenings_today3 ?? ""
        ]);


        $input = $request->except(['cover_image','grateful1',
            'grateful2',
            'grateful3',
            'happenings_today1',
            'happenings_today2',
            'happenings_today3']);

        $document->update($input);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id,Request $request)
    {
        $document = Document::findOrFail($id);
        if($document->user_id!=Auth::id()){
            abort(403);
        }
        $document->update([
            'is_archived'=>1
        ]);
        if($request->active){
            return Redirect::to(route('documents.index'));
        }
    }

    /**
     * Restore the specified resource from storage.
     */
    public function restore(int $id)
    {
        $document = Document::findOrFail($id);
        if($document->user_id!=Auth::id()){
            abort(403);
        }
        $document->update([
            'is_archived'=>0
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function permanent_destroy(int $id,Request $request)
    {
        $document = Document::findOrFail($id);
        if($document->user_id!=Auth::id()){
            abort(403);
        }
        if($document->cover_image){
            @unlink(public_path($document->getAttributes()['cover_image']));
        }
        $document->delete();
        if($request->active){
            return Redirect::to(route('documents.index'));
        }
    }

    public function remove_icon(int $id)
    {
        $document = Document::findOrFail($id);
        if($document->user_id!=Auth::id()){
            abort(403);
        }
        $document->update([
            'icon'=>null
        ]);
    }

    public function remove_cover(int $id)
    {
        $document = Document::findOrFail($id);
        if($document->user_id!=Auth::id()){
            abort(403);
        }
        @unlink(public_path($document->getAttributes()['cover_image']));
        $document->update([
            'cover_image'=>null
        ]);
    }

    public function upload(int $id,Request $request){
        $request->validate([
            'image' => 'mimes:jpeg,png,jpg,webp,pdf|required'
        ]);
        $document = Document::findOrFail($id);
        if($document->user_id!=Auth::id()){
            abort(403);
        }

        $image = $request->file('image') ;
        
        $image_name=strval($id).'_'.Str::slug($image->getClientOriginalName());
        $location='uploads/blocks/project_'.strval($id).'/';
        $path=public_path($location);
        if (!file_exists($path)) {
            File::makeDirectory($path,0777,true);
        }
        $new_image = $location.$image_name;
        $request->file('cover_image')->move($path, $new_image);
        $document->update([
            'cover_image'=>$new_image
        ]);
        
    }

    
}
