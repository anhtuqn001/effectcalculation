<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetaiTieuchi extends Model
{
    protected $table = "detai_tieuchi";

    public function thanhphans() {
        return $this->belongsToMany('App\Thanhphan', 'detai_tieuchi_thanhphan', 'detaitieuchiid', 'thanhphanid')->with('subinfos')->withPivot('diemthanhphan1', 'result1', 'result2', 'additional1', 'additional2', 'additional3', 'additional4', 'additional5', 'additional6', 'additional7', 'additional8');
    }


}
