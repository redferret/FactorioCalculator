<?php

namespace App\Http\Controllers;

use App\ProductionLine;
use App\Utility;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class ProductionLineController extends Controller {

  public function __construct() {
    $this->middleware('auth');
  }

  public function recalculate($id) {
    $productionLine = Auth::user()->productionLines()->find($id);
    Utility::update($productionLine);
    return Utility::getAllFactories();
  }

  public function getProductionLine($id) {
    $productionLine = Auth::user()->productionLines()->find($id);
    Utility::update($productionLine);
    return $productionLine;
  }

  public function getProductionLines($id) {
    $productionLine = Auth::user()->productionLines()->find($id);
    $inputProductionLines = $productionLine->producerProductionLines;
    foreach($inputProductionLines as $pl) {
      $pl->product;
      $pl->producer;
      $pl->assembly_count = round($pl->assembly_count, 2);
      $pl->items_per_second = round($pl->items_per_second, 2);
      $pl->seconds_per_item = round($pl->seconds_per_item, 2);
      $pl->is_output = false;
    }

    $outputProductionLines = $productionLine->consumerProductionLines;
    foreach($outputProductionLines as $pl) {
      $pl->product;
      $pl->producer;
      $pl->assembly_count = round($pl->assembly_count, 2);
      $pl->items_per_second = round($pl->items_per_second, 2);
      $pl->seconds_per_item = round($pl->seconds_per_item, 2);
      $pl->is_output = true;
    }

    return array(
      'inputs'=>$inputProductionLines,
      'outputs'=>$outputProductionLines
    );
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $newProductionLine = ProductionLine::create($request->all());
    Auth::user()->productionLines->save($newProductionLine);
    return $newProductionLine;
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
    $productionLine->fill([$request->input('name') => $request->input('value')]);
    $productionLine->save();
    return array('factories'=>$this->recalculate($id), 'productionLine'=>$productionLine);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    $productionLine = Auth::user()->productionLines()->find($id);
    if($productionLines != null) {
      $productionLine->delete();
      return array('response'=>'success');
    }
    return array('response'=>'failed');
  }

}
