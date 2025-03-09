<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategories extends Model
{
    use HasFactory;
    protected $table = "subcategories";
    protected $fillable = [
        "subcategories",
    ];
    public function categoryDetails(){
        return $this->hasMany(CategoryDetails::class,"subcategory_id");
    }
}
