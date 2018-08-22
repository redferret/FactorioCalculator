<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class ProductController extends Controller {

  public function __construct() {
    $this->middleware('auth');
  }

  public function getProductionLines($id) {
    $product = Auth::user()->products()->find($id);
    $productionLines = $product->productionLines;
    foreach($productionLines as $productionLine) {
      $productionLine->produces;
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
