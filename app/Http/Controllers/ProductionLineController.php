<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Auth;
use App\ProductionLine;

class ProductionLineController extends Controller {

  public function __construct() {
    $this->middleware('auth');
  }

  private function updateProductionLines(ProductionLine $parent) {
    $productionLine = $parent->productionLine;
    $producer = $product->producer;
    $seconds_per_item = round($productionLine->items_per_second / $producer->speed, 2);
    $numberOfProducers = round(($productionLine->items_per_second * $seconds_per_item) / $product->stock_size, 2);
    $numberOfProducers = ceil($numberOfProducers); // Auto Balance
    $productionLine->assembly_count = $numberOfProducers;
    $productionLine->seconds_per_item = $seconds_per_item;
    
  }

  public function recalculate($id) {

    $productionLine = Auth::user()->productionLines()->find($id);
    $productionLine->produces;
    $productionLine->items_per_second = Input::get('itemsPerSecond');
    $productionLine->save();
    $this->updateProductionLines($productionLine);

    return array('message'=>'success');
  }

  public function getProductionLines($id) {
    $productionLine = Auth::user()->productionLines()->find($id);
    $productionLines = $productionLine->productionLines;
    foreach($productionLines as $productionLine) {
      $productionLine->produces;
      $productionLine->producer;
      $productionLine->productionLine;
    }
    return $productionLines;
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
    //
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
