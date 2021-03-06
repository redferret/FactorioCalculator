<?php

namespace App\Http\Controllers;

use App\Producer;
use Auth;
use Illuminate\Http\Request;

class ProducerController extends Controller {

  public function __construct() {
    $this->middleware('auth');
  }

  public function getAll() {
    $producers = Producer::all();
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
    $newProducer = Producer::create($request->all());
    return $newProducer;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    $producer = Producer::find($id);
    $producer->fill($request->all());
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
    $producer = Producer::find($id);
    if ($producer != null) {
      $producer->delete();
      return $producer;
    }
    return array('response'=>'failed');
  }

}
