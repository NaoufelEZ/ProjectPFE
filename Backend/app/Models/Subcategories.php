<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategories extends Model
{
    use HasFactory;
    protected $table = "subcategories";
    protected $fillable = [
        "category_id",
        "subcategories",
        "subcategories_image",
    ];
    public function categoryDetails(){
        return $this->hasMany(CategoryDetails::class,"subcategory_id");
    }
    public function category(){
        return $this->belongsTo(Categories::class,"category_id");
    }
}
