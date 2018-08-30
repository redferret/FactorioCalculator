<?php

namespace App\Http\Controllers;

use App\Utility;
use Auth;
use Illuminate\Http\Request;

class ProducerController extends Controller {

  public function __construct() {
    $this->middleware('auth');
  }

  public function getAll() {
    $producers = Auth::user()->producers;
    foreach($producers as $producer) {
      $producer->processes;
    }
    return collect($producers)->unique('name')->values()->all();
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    $productionLine = Auth::user()->productionLines()->find($id);
    $producer = $productionLine->producer;
    $producer->fill([$request->input('name')=>$request->input('value')]);
    $producer->save();
    return $producer;
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    //
  }

}
