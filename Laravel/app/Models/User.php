<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_as',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function goods()
    {
        return $this->hasMany(Good::class, 'user_id');
    }

    public function proposals()
    {
        return $this->hasMany(Proposal::class);
    }

    public function conversations()
    {
        return Conversation::where(function ($q){
            return $q->where('to', $this->id)
            ->orWhere('from', $this->id);
        });
    }

    public function getConversationsAttribute()
    {
        return $this->conversations()->get();
    }

    public function likedGoods()
    {
        return $this->belongsToMany(Good::class, 'reportings', 'user_id', 'good_id');
    }
}
