<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestLetter extends Model
{
    use HasFactory;

    protected $fillable  = [
        'proposal_id', 
        'content'
    ];

    public function Proposal()
    {
        return $this->belongsTo(Proposal::class);
    }
}
