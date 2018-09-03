<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;

class ProductTypeController extends Controller {

  public function __construct() {
    $this->middleware('auth');
  }

  public function getAll() {
    $productTypes = Auth::user()->productTypes;
    foreach($productTypes as $type) {
      foreach($type->products as $product) {
        $product->producedByProductionLines;
      }
      $type->sorted_products = collect($type->products)->sortBy('name')->values()->all();
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
    $newProduct = Product::create($request->all());
    Auth::user()->productTypes()->save($newProduct);
    return $newProduct;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    $productType = Auth::user()->productTypes()->find($id);
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
    $productType = Auth::user()->productTypes()->find($id);
    if ($productType != null) {
      $productType->delete();
      return array('response'=>'success');
    }
    return array('response'=>'failed');
  }

}
