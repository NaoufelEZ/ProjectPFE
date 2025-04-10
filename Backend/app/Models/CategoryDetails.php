<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryDetails extends Model
{
    use HasFactory;
    protected $table = "category_details";
    protected $fillable = [
        "categoryDetails",
        "category_id",
        "subcategory_id",
        "category_details_image",

    ];
    public function category(){
        return $this->belongsTo(Categories::class,'category_id');
    }
    public function subcategory(){
        return $this->belongsTo(Subcategories::class,'subcategory_id');
    }
    public function product(){
        return $this->hasMany(Product::class);
    }
}
