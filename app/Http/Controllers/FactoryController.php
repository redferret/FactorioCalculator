<?php

namespace App\Http\Controllers;

use App\Factory;
use App\Product;
use Auth;
use Illuminate\Http\Request;

class FactoryController extends Controller {

  public function __construct() {
    $this->middleware('auth');
  }

  public function getAll() {
    $factories = Auth::user()->factories;
    $totalProduction = 0;
    foreach($factories as $factory) {
      $this->buildProductionLines($factory);
      $totalProduction += $factory->total_items;
    }
    $factories->$totalProduction = round($totalProduction, 2);
    return $factories;
  }

  public function getFactory($id) {
    $factory = Auth::user()->factories()->find($id);
    $this->buildProductionLines($factory);
    return $factory;
  }

  private function buildProductionLines(& $factory) {
    $productionLines = $factory->productionLines;
    $totalItems = 0;
    foreach($productionLines as $productionLine) {
      if ($productionLine->consumerProductionLines()->first() == null) {
        $productionLine->is_output = true;
      } else {
        $productionLine->is_output = false;
      }
      if ($productionLine->producerProductionLines()->first() == null) {
        $productionLine->is_primary = true;
      }
      $productionLine->needs_input_management = false;
      $totalItems += $productionLine->items_per_second;
      $productionLine->producer;
      if ($productionLine->product != null) {
        $consumerProducts = $productionLine->product->consumerProducts;
      } else if ($productionLine->process != null) {
        $consumerProducts = $productionLine->process->consumerProducts;
      } else {
        $consumerProducts = array();
      }

      foreach ($consumerProducts as $consumerProduct) {
        $consumerProduct->requiredProduct = Product::where('name', $consumerProduct->required_product_name)->first();
      }
      $productionLine->assembly_count = ceil($productionLine->assembly_count);
      $productionLine->items_per_second = round($productionLine->items_per_second, 2);
      $ips = $productionLine->items_per_second;
      $productionLine->seconds_per_item = ($ips == 0? 0 : 1 / $ips);
      $productionLine->seconds_per_item = round($productionLine->seconds_per_item, 3);
    }
    $factory->total_items = round($totalItems, 2);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $newFactory = Factory::create($request->all());
    Auth::user()->factories()->save($newFactory);
    $newFactory->productionLines;
    $newFactory->total_items = 0;
    return $newFactory;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    $factory = Auth::user()->factories()->find($id);
    if ($factory != null) {
      $factory->fill($request->all());
      $factory->save();
      return $this->getFactory($id);
    }
    return array('response'=>'Factory Not Found: id='.$id);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    $factory = Auth::user()->factories()->find($id);
    if ($factory != null) {
      $factory->delete();
      return $factory;
    }
    return array('response'=>'failed', 'on'=>$id);
  }

}
