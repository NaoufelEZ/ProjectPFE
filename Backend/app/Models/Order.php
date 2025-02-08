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
        "quantity",
    ];
    public $timestamps = false;
}
