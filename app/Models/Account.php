<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    public function todos()
    {
        return $this
            ->hasMany(Todo::class)
            ->get();
    }

    // public function todos()
    // {
    //     return $this
    //         ->with('todos')
    //         ->get();
    // }
}
