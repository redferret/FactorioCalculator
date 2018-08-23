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

  private function cascadeUpdateProductionLines(ProductionLine $parent) {
    $product = $parent->produces;
    $producer = $product->producer;
    $seconds_per_item = round($product->items_per_second / $producer->speed, 2);
    $numberOfProducers = round(($product->items_per_second * $seconds_per_item) / $product->stock_size, 2);
    $numberOfProducers = ceil($numberOfProducers); // Auto Balance
    // Update inputs
  }

  public function recalculate($id) {

    $productionLine = Auth::user()->productionLines()->find($id);
    $product = $productionLine->produces;
    $product->items_per_second = Input::get('itemsPerSecond');
    $product->save();
    $this->cascadeUpdateProductionLines($productionLine);

    $factories = Auth::user()->factories;
    foreach($factories as $factory) {
      $totalItems = 0;
      foreach($factory->productionLines as $productionLine) {
        $product = $productionLine->produces; // Get the product this line produces
        if ($product != null) {
          $totalItems += $product->items_per_second;
          $producer = $product->producer;
          $product->seconds_per_item = round($product->items_per_second / $producer->speed, 2);
          $product->assembly_count = round(($product->items_per_second * $product->seconds_per_item) / $product->stock_size, 2);
          $product->productionLines;
          // Update inputs for this product

        }
      }
      $factory->total_items = round($totalItems, 2);
    }
    return $factories;
  }

  public function getProductionLines($id) {
    $productionLine = Auth::user()->productionLines()->find($id);
    $productionLines = $productionLine->productionLines;
    foreach($productionLines as $productionLine) {
      $productionLine->produces;
      $productionLine->producer;
      $productionLine->consumer;
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
