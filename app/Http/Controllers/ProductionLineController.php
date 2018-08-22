<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class ProductionLineController extends Controller {

  public function __construct() {
    $this->middleware('auth');
  }

  public function recalculate() {

  }

  public function balance($id) {
    $productionLine = Auth::user()->productionLines->find($id);
    $product = $productionLine->produces; // Get the product this line produces
    if ($product != null) {
      $producer = $product->producer;
      $seconds_per_item = round($product->items_per_second / $producer->speed, 2);
      $assembly_count = ceil(($product->items_per_second * $seconds_per_item) / $product->stock_size);
      $product->desired_assembly_count = $assembly_count;
      $productionLine->produces()->save($product);

      $product->assembly_count = $assembly_count;
      $product->seconds_per_item = $seconds_per_item;
      $product->productionLines;
      // Update inputs for this product
    }

    return $productionLine;
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
