<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Good extends Model
{
    use HasFactory;
    protected $table = 'goods';
    protected $fillable = [
        'name',
        'category_id',
        'price',
        'description',
        'image',
        'status',
        'approval',
        'user_id' 
    ];

    protected $with = ['category', 'user'];
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function proposals()
    {
        return $this->hasMany(Proposal::class);
    }

    public function likes()
    {
        return $this->belongsToMany(User::class, 'reportings', 'good_id', 'user_id');
    }

}
