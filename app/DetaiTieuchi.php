<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetaiTieuchi extends Model
{
    protected $table = "detai_tieuchi";

    public function thanhphans() {
        return $this->belongsToMany('App\Thanhphan', 'detai_tieuchi_thanhphan', 'detaitieuchiid', 'thanhphanid')->withPivot('diemthanhphan1', 'diemthanhphan2', 'result1', 'result2');
    }


}
