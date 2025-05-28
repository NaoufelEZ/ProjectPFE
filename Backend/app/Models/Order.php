<?php

namespace App\Models;

use App\Models\User as ModelsUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = "orders";
    protected $fillable = [
        "reference",
        "user_id",
        "address_id",
        "status",
        "company_id",
        "method_payment",
        "delivery_pay",
    ];
    public $timestamps = false;
    public function orderItems(){
        return $this->hasMany(OrderItems::class);
    }
    public function user(){
        return $this->belongsTo(ModelsUser::class);
    }
    public function address(){
        return $this->belongsTo(Address::class);
    }
    public function company(){
        return $this->belongsTo(DeliveryCompany::class);
    }
}
