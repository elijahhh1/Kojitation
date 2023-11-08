<?php

namespace App\Http\Middleware;

use App\Models\Choice;
use App\Models\Document;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'documents'=>Auth::check()?Document::where('user_id',Auth::id())->where('is_archived',0)->orderBy('id','desc')->get():[],
            'archives'=>Auth::check()?Document::where('user_id',Auth::id())->where('is_archived',1)->orderBy('id','desc')->get():[],
            'app_name'=>Config::get('app.name'),
            'pss_questions'=>Question::where('id','<',11)->get(),
            'questionnaire_questions'=>Question::whereBetween('id',[11,40])->get(),
            'pss_choices'=>Choice::where('id','<',6)->get(),
            'questionnaire_choices'=>Choice::whereBetween('id',[6,9])->get(),
        ];
    }
}
