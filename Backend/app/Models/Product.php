<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = "products";
    protected $fillable = [
        "title",
        "description",
        "price",
        "discount",
        "details_id",
    ];
    public function productStock(){
        return $this->hasMany(ProductStock::class);
    }
    public function wishlist(){
        return $this->hasMany(Wishlist::class);
    }
    public function details(){
        return $this->belongsTo(CategoryDetails::class);
    }
    
}
