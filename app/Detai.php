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

    public function getGrade() {
        if($this->diemdetai >= 0 && $this->diemdetai <= 20) {
            return 'E';
        } else if($this->diemdetai > 20 && $this->diemdetai <= 40) {
            return 'D';
        } else if($this->diemdetai > 40 && $this->diemdetai <= 60) {
            return 'C';
        } else if($this->diemdetai > 60 && $this->diemdetai <= 80) {
            return 'B';
        } else if($this->diemdetai > 80 && $this->diemdetai <= 100) {
            return 'A';
        }
    }

    public function getTotalExpense() {
        // return (float)$this->kinhphichutri + $this->kinhphitrienkhai; 
        return round($this->kinhphichutri + $this->kinhphitrienkhai, 4);
    }
}
