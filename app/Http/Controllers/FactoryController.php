<?php

namespace App\Http\Controllers;

use App\Utility;
use Auth;
use Illuminate\Http\Request;

class FactoryController extends Controller {

  public function __construct() {
    $this->middleware('auth');
  }

  public function getAll() {
    $factories = Auth::user()->factories;
    foreach($factories as $factory) {
      $totalItems = 0;
      foreach($factory->productionLines as $productionLine) {
        Utility::update($productionLine);
        if ($productionLine->productionLine == null) {
          $totalItems += $productionLine->items_per_second;
          $productionLine->assembly_count = round($productionLine->assembly_count, 2);
          $productionLine->seconds_per_item = round($productionLine->seconds_per_item, 2);
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
