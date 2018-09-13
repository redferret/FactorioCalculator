<?php

namespace App\Http\Controllers;

use App\ConsumerProduct;
use App\Product;
use Auth;
use Illuminate\Http\Request;

class ProductController extends Controller {

  public function __construct() {
    $this->middleware('auth');
  }

  public function getAll() {
    $products = Auth::user()->products;
    foreach($products as $product) {
      $product->producedByProductionLines;
    }
    return $products;
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $newProduct = Product::create($request->input('values'));
    Auth::user()->products()->save($newProduct);
    $productsJson = $request->input('products');
    foreach ($productsJson as $productJson) {
      $productRequirement = ConsumerProduct::create([
        'consumer_requirement'=>$productJson['consumer_requirement']
      ]);
      $product = Auth::user()->products()->find($productJson['id']);
      $productRequirement->requiredProduct()->save($product);
      $newProduct->consumerProducts()->save($productRequirement);
    }
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
    $product = Auth::user()->products()->find($id);
    if ($product != null) {
      $product->fill($request->all());
      $product->save();
      return $product;
    }
    return array('response'=>'Product Not Found: id='.$id);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    $product = Auth::user()->products()->find($id);
    if ($product != null) {
      $product->delete();
      return array('response'=>'success');
    }
    return array('response'=>'failed');
  }

}
