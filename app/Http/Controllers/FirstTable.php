<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DB;
use Image;

class FirstTable extends Controller
{
    public function store(Request $req){
        $validated = $req->validate([
            'image' => ['image']
        ],
        [
            'image.image' => 'Image must be an image'
        ]);

        $data = array();
        $image = request()->file('image');
        if($image){
            $name = hexdec(uniqid());
            $fullname = $name.'.webp';
            $path = 'images/firsttable/';
            $url = $path.$fullname;
            $resize_image=Image::make($image->getRealPath());
            $resize_image->resize(300,300);
            $resize_image->save('images/firsttable/'.$fullname);
            $data['text'] = $req -> text;
            $data['number'] = $req -> number;
            $data['image'] = $url;
            DB::table('firsttable') -> insert($data);
            return response()->json([
                'message' => 'Data successfully added'
            ],200);
        }
        else{
            $data['text'] = $req -> text;
            $data['number'] = $req -> number;
            $data['image'] = null;
            DB::table('firsttable') -> insert($data);
            return response()->json([
                'message' => 'Data successfully added'
            ],200);
        }
    }
    public function show(){
        $firsttables = DB::table('firsttable') -> orderBy('text', 'ASC') -> get();
        return $firsttables;
    }
    public function edit($id){
        $firsttable = DB::table('firsttable') -> where('id', $id)->first();
        return $firsttable;
    }
    public function update(Request $req, $id){
        $validatedData = $req->validate([
            'image' => ['image']
        ],
        [
            'image.image' => 'Image must be an image'
        ]);

        $data = array();
        $image = request()->file('image');
        if($image){
            $firsttable = DB::table('firsttable') -> where('id', $id)->first();
            $old_image=$firsttable->image;
            if(file_exists($old_image)){
                unlink($old_image);
            }
            $name = hexdec(uniqid());
            $fullname = $name.'.webp';
            $path = 'images/firsttable/';
            $url = $path.$fullname;
            $resize_image=Image::make($image->getRealPath());
            $resize_image->resize(300,300);
            $resize_image->save('images/firsttable/'.$fullname);
            $data['text'] = $req -> text;
            $data['number'] = $req -> number;
            $data['image'] = $url;
            DB::table('firsttable') -> where('id', $id)->update($data);
            return response()->json([
                'message' => 'Data successfully updated'
            ],200);
        }
        else{
            $data['text'] = $req -> text;
            $data['number'] = $req -> number;
            DB::table('firsttable') -> where('id', $id)->update($data);
            return response()->json([
                'message' => 'Data successfully updated'
            ],200);
        }
    }
    public function destroy($id){
        $firsttable = DB::table('firsttable') -> where('id', $id)->first();
        $image  = $firsttable->image;
        if(file_exists($image)){
            unlink($image);
        }
        DB::table('firsttable') -> where('id', $id)->delete();
        return response()->json([
            'message' => 'Data successfully deleted'
        ],200);
    }
}
