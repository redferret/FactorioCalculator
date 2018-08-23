<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class FactoryController extends Controller {

  public function __construct() {
    $this->middleware('auth');
  }

  public function getAll() {
    $factories = Auth::user()->factories;
    foreach($factories as $factory) {
      $totalItems = 0;
      foreach($factory->productionLines as $productionLine) {
        $product = $productionLine->produces; // Get the product this line produces
        if ($product != null) {
          $totalItems += $product->items_per_second;
          $producer = $productionLine->producer;
          $product->seconds_per_item = round($product->items_per_second / $producer->speed, 2);
          $product->assembly_count = round(($product->items_per_second * $product->seconds_per_item) / $product->stock_size, 2);
          $product->productionLines;
        }
      }
      $factory->total_items = round($totalItems, 2);
    }
    return $factories;
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
