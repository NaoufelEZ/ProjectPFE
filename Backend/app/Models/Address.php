<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    protected $table = "addresses";
    protected $fillable = [
        "id",
        "user_id",
        "address",
        "state",
        "zip",
        "street",
        "is_default"
    ];
}
