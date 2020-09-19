<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Thanhphan extends Model
{
    protected $table = "thanhphans";

    public function detaitieuchis() {
        return $this->belongsToMany('App\DetaiTieuchi', 'detai_tieuchi_thanhphan', 'thanhphanid', 'detaitieuchiid');
    }

    public function subinfos() {
        return $this->hasMany('App\SubInfo', 'thanhphanid');
    }
}
