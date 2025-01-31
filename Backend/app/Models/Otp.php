<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Otp extends Model
{
    use HasFactory;
    use HasFactory;
    protected $table = "otp";
    protected $fillable = [
        "user_id",
        "otp_code",
        "hash",
        "created_at",
        "expiry_at",
    ];
    public $timestamps = false;
}
