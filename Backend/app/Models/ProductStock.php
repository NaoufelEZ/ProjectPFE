<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductStock extends Model
{
    use HasFactory;
    protected $table = "product_stock";
    protected $fillable = [
        "product_id",
        "color",
        "product_picture",
        "holder_product_picture",
        "size",
        "quantity",
    ];
    public $timestamps = false;
    public function product(){
        return $this->belongsTo(Product::class);
    }
    public function orderItems(){
        return $this->hasMany(OrderItems::class);
    }
}
