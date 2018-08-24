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
    $productionLine->items_per_second = Input::get('itemsPerSecond');
    $productionLine->save();
    Utility::update($productionLine);

    return Utility::getAllFactories();
  }

  public function getProductionLines($id) {
    $productionLine = Auth::user()->productionLines()->find($id);
    $productionLines = $productionLine->productionLines;
    foreach($productionLines as $pl) {
      $pl->produces;
      $pl->producer;
      $pl->assembly_count = round($pl->assembly_count, 2);
      $pl->items_per_second = round($pl->items_per_second, 2);
      $pl->seconds_per_item = round($pl->seconds_per_item, 2);
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
