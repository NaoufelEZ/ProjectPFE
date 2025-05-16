<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryCompany extends Model
{
    use HasFactory;
    protected $table = "delivery_company";
    protected $fillable = [
        "name",
        "address",
        "phone",
        "mail",
        "fee",
        "duration",
    ];
    public function Order(){
        return $this->hasMany(Order::class);
    }
}
