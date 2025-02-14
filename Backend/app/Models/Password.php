<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Password extends Model
{
    use HasFactory;
    protected $table = "password";
    protected $fillable = [
        "email",
        "code",
        "token",
        "expiry_at",
        "is_verified"
    ];
    public $timestamps = false;
}
