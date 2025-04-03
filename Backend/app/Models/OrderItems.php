<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItems extends Model
{
    use HasFactory;
    protected $table = "order_items";
    protected $fillable = [
        "order_id",
        "product_stock_id",
        "quantity",
        "price",
    ];
    public $timestamps = false;
    function order(){
        return $this->belongsTo(Order::class,"order_id");
    }
    public function product_stock(){
        return $this->belongsTo(ProductStock::class);
    }
}
