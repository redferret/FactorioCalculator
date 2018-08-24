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

  public static function recalculate($id) {
    $productionLine = Auth::user()->productionLines()->find($id);
    $productionLine->items_per_second = Input::get('itemsPerSecond');
    Utility::updateOutput($productionLine);

    return array('message'=>'success');
  }

  public static function update(Productionline $productionLine) {
    $consumer = $productionLine->consumer;
    if ($consumer != null) {
      Utility::updateInput($productionLine);
    } else {
      Utility::updateOutput($productionLine);
    }
  }

  public function getProductionLines($id) {
    $productionLine = Auth::user()->productionLines()->find($id);
    $productionLines = $productionLine->productionLines;
    foreach($productionLines as $productionLine) {
      Utility::update($productionLine);
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
