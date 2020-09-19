<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Detai;
use App\DetaiTieuchi;

class DetaiController extends Controller
{
    public function index() {
        try {
            $detais = Detai::with('tieuchis')->get();
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'detais' => $detais
        ], 200);
    }

    public function store(Request $request) {
        try {
            $detai = new Detai;
            $detai->tendetai = $request->input('tendetai');
            $detai->tenchunhiem = $request->input('tenchunhiem');
            $detai->cqchutri = $request->input('cqchutri');
            $detai->cqtrienkhai = $request->input('cqtrienkhai');
            $detai->linhvuc = $request->input('linhvuc');
            $detai->save();
            $detai->tieuchis()->sync([1,2,3,4,5,6,7]);
            $detaitieuchis = DetaiTieuchi::where('detaiid', $detai->id)->get();
            foreach($detaitieuchis as $detaitieuchi) {
                switch ($detaitieuchi->tieuchiid) {
                    case 1:
                        $detaitieuchi->thanhphans()->sync([1,2,3,4,5,6,7,8,9]);
                        break;
                    case 2: 
                        $detaitieuchi->thanhphans()->sync([10,11,12,13,14,15]);
                        break;
                    case 3:
                        $detaitieuchi->thanhphans()->sync([16,17,18,19,20,21,22,23,24,25]);
                        break;
                    case 4:
                        $detaitieuchi->thanhphans()->sync([26,27,28,29,30,31,32]);
                        break;
                    case 5:
                        $detaitieuchi->thanhphans()->sync([33,34,35,36,37,38,39,40]);
                        break;
                    case 6:
                        $detaitieuchi->thanhphans()->sync([41,42,43,44,45,46]);
                        break;
                    case 7:
                        $detaitieuchi->thanhphans()->sync([47,48,49,50,51,52]);
                        break;
                }
            }
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'detai' => $detai
        ], 200);
    }

    public function update(Request $request) {
       try {
       $id = $request->input('id');
       $detai = Detai::findOrFail($id);
       $detai->tendetai = $request->input('tendetai');
       $detai->tenchunhiem = $request->input('tenchunhiem');
       $detai->cqchutri = $request->input('cqchutri');
       $detai->cqtrienkhai = $request->input('cqtrienkhai');
       $detai->linhvuc = $request->input('linhvuc');
       $detai->save();
       } catch (Exception $e) {
        return response()->json([
            'error'=> $e->getMessage()
        ], 500);
       }
       return response()->json([
        'editedDetai' => $detai
    ], 200);
    }

    public function remove($id) {
        try {
            $detai = Detai::findOrFail($id);
            $detai->delete();
        } catch (Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'success' => true
        ], 200);
    }

    public function getDetai(Request $request, $id) {
       try {
        $detai = Detai::with('tieuchis')->findOrFail($id);
        foreach($detai->tieuchis as $tieuchi) {
            $detaiTieuchi = DetaiTieuchi::with(array('thanhphans' => function($query) {
                    $query->orderBy('thutu');
            }))->findOrFail($tieuchi->pivot->id);
            $tieuchi->thanhphans = $detaiTieuchi->thanhphans;
            }
        } catch(Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
       return response()->json([
           'detai' => $detai
       ], 200);
    }

    public function updateScores(Request $request) {
        try {
            $detaiId = $request->input('detaiId');
            $tieuchis = $request->input('tieuchis');
            $detai = Detai::with('tieuchis')->findOrFail($detaiId);
            $detai->diemdetai = $request->input('diemdetai');
            $detai->save();
            $testArr = [];
            foreach($tieuchis as $tieuchi) {
                $detaiTieuchi = DetaiTieuchi::where('detaiid', $detaiId)->where('tieuchiid', $tieuchi['id'])->firstOrFail();
                $detaiTieuchi->diemtieuchi = $tieuchi['diemtieuchi'];
                $detaiTieuchi->save();
                array_push($testArr, $detaiTieuchi);
                $thanhphans = $tieuchi['thanhphans'];
                foreach($thanhphans as $thanhphan) {
                    $detaiTieuchi->thanhphans()->updateExistingPivot($thanhphan['id'], ['result1' => $thanhphan['result1'], 'result2' => $thanhphan['result2'], 'diemthanhphan1' => $thanhphan['diemthanhphan1'], 'additional1' => $thanhphan['additional1'], 'additional2' => $thanhphan['additional2'], 'additional3' => $thanhphan['additional3'], 'additional4' => $thanhphan['additional4'], 'additional5' => $thanhphan['additional5'], 'additional6' => $thanhphan['additional6'], 'additional7' => $thanhphan['additional7'], 'additional8' => $thanhphan['additional8']]);
                }
            }
            foreach($detai->tieuchis as $tieuchi) {
            $detaiTieuchi = DetaiTieuchi::with('thanhphans')->findOrFail($tieuchi->pivot->id);
            $tieuchi->thanhphans = $detaiTieuchi->thanhphans;
            }
        } catch (Exception $e) {
            return response()->json([
                'error'=> $e->getMessage()
            ], 500);
        }
        return response()->json([
            'detai' => $detai
        ], 200);
    }

}
