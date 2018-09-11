<?php

namespace App\Http\Controllers;

use App\ProductionLine;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class ProductionLineController extends Controller {

  public function __construct() {
    $this->middleware('auth');
  }

  public function recalculate() {
    $productionLines = Auth::user()->productionLines;
    foreach($productionLines as $productionLine) {
      // If this production line is an output
      if ($productionLine->consumerProductionLines()->first() == null) {
        $this->updateProductionLineAssemblers($productionLine);
      }
    }
    return $productionLines;
  }

  public function getProductionLines() {
    $productionLines = Auth::user()->productionLines;
    foreach ($productionLines as $productionLine) {
      $productionLine->product;
    }
    return $productionLines;
  }

  // public function getProductionLine($id) {
  //   $productionLine = Auth::user()->productionLines()->find($id);
  //   $productionLine->producer;
  //   $product = $productionLine->product;
  //   $product->consumerProducts;
  //   $product->producedByProductionLines;
  //
  //   return $productionLine;
  // }

  public function getProductionLineInputsOutputs($id) {
    $productionLine = Auth::user()->productionLines()->find($id);
    $inputProductionLines = $productionLine->producerProductionLines;
    foreach($inputProductionLines as $pl) {
      $pl->product;
      $pl->product->consumerProducts;
      $pl->producer;
      $pl->assembly_count = round($pl->assembly_count, 2);
      $pl->items_per_second = round($pl->items_per_second, 2);
      $pl->seconds_per_item = round($pl->seconds_per_item, 2);
      $pl->is_output = false;
    }

    $outputProductionLines = $productionLine->consumerProductionLines;
    foreach($outputProductionLines as $pl) {
      $pl->product;
      $pl->product->consumerProducts;
      $pl->producer;
      $pl->assembly_count = round($pl->assembly_count, 2);
      $pl->items_per_second = round($pl->items_per_second, 2);
      $pl->seconds_per_item = round($pl->seconds_per_item, 2);
      $pl->is_output = true;
    }

    return array(
      'inputs'=>$inputProductionLines,
      'outputs'=>$outputProductionLines
    );
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $newProductionLine = ProductionLine::create($request->all());
    Auth::user()->productionLines()->save($newProductionLine);

    $producerJson = $request->input('producer');
    $producer = Auth::user()->producers()->find($producerJson['id'])->replicate();
    $newProductionLine->producer()->save($producer);

    $productJson = $request->input('product');
    $product = Auth::user()->products()->find($productJson['id']);
    $product->producedByProductionLines()->save($newProductionLine);

    $factory = Auth::user()->factories()->find($request->input('factory_id'));
    $factory->productionLines()->save($newProductionLine);

    $this->updateProductionLineAssemblers($newProductionLine);
    $newProductionLine->is_output = true;
    return $newProductionLine;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    $productionLine = Auth::user()->productionLines()->find($id);
    $productionLine->fill($request->all());
    $productionLine->save();
    if ($productionLine->consumerProductionLines()->first() == null) {
      $this->updateProductionLineAssemblers($productionLine);
    }
    return $productionLine;
  }

  public function updateProducer(Request $request, $id) {
    $productionLine = Auth::user()->productionLines()->find($id);
    $producer = $productionLine->producer;
    $producer->fill($request->all());
    $producer->save();
    $this->updateProductionLineItemsPerSecond($productionLine);
    return $productionLine;
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    $productionLine = Auth::user()->productionLines()->find($id);
    if($productionLines != null) {
      $productionLine->delete();
      return array('response'=>'success');
    }
    return array('response'=>'failed');
  }

  private function updateProductionLineItemsPerSecond(& $productionLine) {
    $producer = $productionLine->producer;
    $product = $productionLine->product;
    $product->consumerProducts;
    $product->producedByProductionLines;

    $previousProducerCount = $productionLine->assembly_count;

    $seconds_per_item = $product->crafting_time / $producer->speed;
    $desiredItemsPerSecond = ($previousProducerCount / $seconds_per_item) * $product->stock_size;
    $productionLine->items_per_second = $desiredItemsPerSecond;
    $productionLine->assembly_count = $previousProducerCount;
    $productionLine->seconds_per_item = $seconds_per_item;
    $productionLine->save();

    foreach($productionLine->producerProductionLines as $pl) {
      $this->updateInputAssemblers($pl);
    }

    $productionLine->assembly_count = round($productionLine->assembly_count, 2);
    $productionLine->items_per_second = round($productionLine->items_per_second, 2);
    $productionLine->seconds_per_item = round($productionLine->seconds_per_item, 2);

  }

  /**
   * Updates the production line by recalculating the number of assemblers,
   * the seconds per item, and will also update all the input lines for this
   * production line.
   * @param type $productionLine
   * @return type The production line instance
   */
  private function updateProductionLineAssemblers(& $productionLine) {
    $producer = $productionLine->producer;
    $product = $productionLine->product;
    $product->consumerProducts;
    $product->producedByProductionLines;

    $seconds_per_item = $product->crafting_time / $producer->speed;
    $numberOfAssemblers = ($productionLine->items_per_second * $seconds_per_item) / $product->stock_size;

    $productionLine->assembly_count = $numberOfAssemblers;
    $productionLine->seconds_per_item = $seconds_per_item;
    $productionLine->save();

    foreach($productionLine->producerProductionLines as $pl) {
      $this->updateInputAssemblers($pl);
    }

    $productionLine->assembly_count = round($productionLine->assembly_count, 2);
    $productionLine->items_per_second = round($productionLine->items_per_second, 2);
    $productionLine->seconds_per_item = round($productionLine->seconds_per_item, 2);

    $productionLine->updated = true;
  }

  /**
   * (Mining power - Mining hardness) * Mining speed / Mining time
   * @param type $productionLine
   * @return type
   */
  private function updateInputAssemblers(& $productionLine) {

    $product = $productionLine->product;
    $product->consumerProducts;
    $product->producedByProductionLines;
    $producer = $productionLine->producer;

    $items_per_second = 0;

    // if ($producer->producer_type == 0) {
    //
    // } else {
    //
    // }
    foreach($productionLine->consumerProductionLines as $consumerProductionLine) {
      $consumerProduct = $consumerProductionLine->product;
      $consumerProducts = $consumerProduct->consumerProducts;

      $index = $consumerProducts->search(function ($consumerProductRef, $key) use ($product) {
        return $consumerProductRef->product_id == $product->id;
      });

      $requiredConsumerProduct = $consumerProducts[$index];
      $consumerRequirement = $requiredConsumerProduct->consumer_requirement;

      $items_per_second += ($consumerRequirement / $consumerProductionLine->seconds_per_item) * $consumerProductionLine->assembly_count;
    }

    $productionLine->items_per_second = $items_per_second;

    $seconds_per_item = $product->crafting_time / $producer->speed;
    $numberOfAssemblers = ($productionLine->items_per_second * $seconds_per_item) / $product->stock_size;

    $productionLine->assembly_count = $numberOfAssemblers;
    $productionLine->seconds_per_item = $seconds_per_item;
    $productionLine->save();

    foreach($productionLine->producerProductionLines as $pl) {
      $this->updateInputAssemblers($pl);
    }

    $productionLine->assembly_count = round($productionLine->assembly_count, 2);
    $productionLine->items_per_second = round($productionLine->items_per_second, 2);
    $productionLine->seconds_per_item = round($productionLine->seconds_per_item, 2);

    $productionLine->updated = true;
  }

}
