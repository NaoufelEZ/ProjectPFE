<?php

namespace App\Models;

use App\Models\User as ModelsUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Models\user;

class Order extends Model
{
    use HasFactory;
    protected $table = "orders";
    protected $fillable = [
        "user_id",
        "product_id",
        "color",
        "size",
        "quantity",
        "price",
        "addresse_id",
        "status",
        "method_payment"
    ];
    public $timestamps = false;
}
