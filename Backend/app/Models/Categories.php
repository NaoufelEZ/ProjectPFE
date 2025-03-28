<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Categories extends Model
{
    use HasFactory;
    protected $table = "categories";
    protected $fillable = [
        "category",
    ];
    public function categoryDetails(){
        return $this->HasMany(CategoryDetails::class,'category_id');
    }
    public function subcategory(){
        return $this->HasMany(Subcategories::class);
    }
}
