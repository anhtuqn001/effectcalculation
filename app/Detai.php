<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\DetaiTieuchi;

class Detai extends Model
{
    protected $table = "detais";

    public function tieuchis() {
        return $this->belongsToMany('App\TieuChi', 'detai_tieuchi', 'detaiid', 'tieuchiid')->withPivot('id', 'detaiid', 'tieuchiid', 'diemtieuchi');
    }

    public function chimucs() {
        
    }

    public static function boot() {
        parent::boot();
        self::deleting(function($detai) { // before delete() method call this
            $detaitieuchis = DetaiTieuchi::where('detaiid', $detai->id)->get();
            $detaitieuchis->each(function ($detaitieuchi) {
                $detaitieuchi->thanhphans()->detach();
            });
            $detai->tieuchis()->detach();
        });
    }
}
