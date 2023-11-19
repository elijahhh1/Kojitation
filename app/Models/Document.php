<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Document extends Model
{
    use HasFactory;
    protected $guarded=[];
    protected $with =['documents','happenings','gratefuls'];
    public function documents():HasMany{
        return $this->hasMany(Document::class)->where('is_archived',0);
    }

    public function childrenDocuments():HasMany{
        return $this->hasMany(Document::class)->with('documents')->where('is_archived',0);
    }

    public function getCoverImageAttribute($value){
        if($value && str_contains( strtolower($value),'http')){return $value;}
        if(!$value){return null;}
        return url('/').'/'. $value;
    }

    public function happenings(){
        return $this->hasMany(Happening::class);
    }

    public function gratefuls(){
        return $this->hasMany(Grateful::class);
    }
}
