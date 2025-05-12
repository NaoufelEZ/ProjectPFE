<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        "city",
        "is_default"
    ];
    public function Order(){
        return $this->HasMany(Order::class);
    }
}
