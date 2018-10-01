<?php

namespace App\Http\Controllers;

use App\ProductType;
use Auth;
use Illuminate\Http\Request;

class ProductTypeController extends Controller {

  public function __construct() {
    $this->middleware('auth');
  }

  public function getAll() {
    $productTypes = ProductType::all();
    foreach($productTypes as $type) {
      $products = $type->products()->where('from_process', false)->get();
      foreach($products as $product) {
        $product->producedByProductionLines;
        $product->consumerProducts;
        $product->producers;
      }
      $type->products = $products;
    }
    return $productTypes;
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $newProductType = ProductType::create($request->all());
    return $newProductType;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    $productType = ProductType::find($id);
    if ($productType != null) {
      $productType->fill($request->all());
      $productType->save();
      return $productType;
    }
    return array('response'=>'Product Type Not Found: id='.$id);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    $productType = ProductType::find($id);
    if ($productType != null) {
      $productType->delete();
      return $productType;
    }
    return array('response'=>'failed');
  }

}
