<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DB;

class SecondTable extends Controller
{
    public function store(Request $req){
        $data = array();
        $data['stext'] = $req -> stext;
        $data['ft_id'] = $req -> ft_id;
        DB::table('secondtable')->insert($data);
        return response()->json([
            'message' => 'Data successfully added'
        ],200);
    }
    public function show(){
        $secondtables = DB::table('secondtable') -> orderBy('stext', 'ASC') -> join('firsttable', 'secondtable.ft_id', '=', 'firsttable.id') -> select('secondtable.*', 'firsttable.text') -> get();
        return $secondtables;
    }
    public function edit($id){
        $secondtable = DB::table('secondtable') -> join('firsttable', 'secondtable.ft_id', '=', 'firsttable.id') -> where('secondtable.id', $id) -> select('secondtable.*', 'firsttable.text') -> first();
        return $secondtable;
    }
    public function update(Request $req, $id){
        $data = array();
        $data['stext'] = $req -> stext;
        $data['ft_id'] = $req -> ft_id;
        DB::table('secondtable') -> where('id', $id)->update($data);
        return response()->json([
            'message' => 'Data successfully updated'
        ],200);
    }
    public function destroy($id){
        DB::table('secondtable') -> where('id', $id)->delete();
        return response()->json([
            'message' => 'Data successfully deleted'
        ],200);
    }
}
