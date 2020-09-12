<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tieuchi extends Model
{
    protected $tieuchi = "tieuchis";

    public function detais() {
        return $this->belongsToMany('App\Detai', 'detai_tieuchi', 'tieuchiid', 'detaiid');
    }
}
