<?php

namespace App\Http\Controllers;

use App\Producer;
use App\Product;
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
    }
    return $productionLines;
  }

  public function getRequiredProducts($id) {
    $productionLine = Auth::user()->productionLines()->find($id);
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
    return $consumerProducts;
  }

  public function editInputs(Request $request, $id) {
    $productionLine = Auth::user()->productionLines()->find($id);
    $inputs = $request->input('inputs');
    $currentInputs = $productionLine->producerProductionLines;

    foreach ($currentInputs as $currentInput) {
      $foundInput = false;
      foreach ($inputs as $input) {
        if ($input['id'] == $currentInput->id) {
          $foundInput = true;
          break;
        }
      }
      if (!$foundInput) {
        $productionLine->producerProductionLines()->detach($currentInput->id);
      }
    }

    foreach ($inputs as $input) {
      $currentInput = $productionLine->producerProductionLines()->find($input['id']);
      if ($currentInput == null) {
        $newInput = Auth::user()->productionLines()->find($input['id']);
        $productionLine->producerProductionLines()->save($newInput);
      }
    }

    return $productionLine;
  }

  public function getProductionLineInputsOutputs($id) {
    $primaryProductionLine = Auth::user()->productionLines()->find($id);
    $inputProductionLines = $primaryProductionLine->producerProductionLines;
    foreach($inputProductionLines as $productionLine) {
      $productionLine->product;
      $productionLine->producer;
      $productionLine->assembly_count = ceil($productionLine->assembly_count);
      $productionLine->items_per_second = round($productionLine->items_per_second, 2);
      $ips = $productionLine->items_per_second;
      $productionLine->seconds_per_item = ($ips == 0? 0 : 1 / $ips);
      $productionLine->seconds_per_item = round($productionLine->seconds_per_item, 1);
      $productionLine->is_output = false;
    }

    $outputProductionLines = $primaryProductionLine->consumerProductionLines;
    foreach($outputProductionLines as $productionLine) {
      $productionLine->product;
      $productionLine->producer;
      $productionLine->assembly_count = ceil($productionLine->assembly_count);
      $productionLine->items_per_second = round($productionLine->items_per_second, 2);
      $ips = $productionLine->items_per_second;
      $productionLine->seconds_per_item = ($ips == 0? 0 : 1 / $ips);
      $productionLine->seconds_per_item = round($productionLine->seconds_per_item, 1);
      $productionLine->is_output = true;
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
    $producer = Producer::find($producerJson['id'])->replicate();
    $newProductionLine->producer()->save($producer);

    $productJson = $request->input('product');
    $product = Product::find($productJson['id']);
    if ($product != null) {
      $product->producedByProductionLines()->save($newProductionLine);
    }

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
    $this->updateProductionLineAssemblers($productionLine);
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
    if($productionLine != null) {
      $productionLine->delete();
      return $productionLine;
    }
    return array('response'=>'failed');
  }

  // private function updateProductionLineItemsPerSecond(& $productionLine) {
  //   $producer = $productionLine->producer;
  //   $product = $productionLine->product;
  //
  //   $consumerProducts = $product->consumerProducts;
  //   foreach ($consumerProducts as $consumerProduct) {
  //     $consumerProduct->requiredProduct = Product::where('name', $consumerProduct->required_product_name)->first();
  //   }
  //   $product->producedByProductionLines;
  //
  //   $previousProducerCount = $productionLine->assembly_count;
  //
  //   $seconds_per_item = $product->crafting_time / $producer->speed;
  //   $desiredItemsPerSecond = ($previousProducerCount / $seconds_per_item) * $product->stock_size;
  //   $productionLine->items_per_second = $desiredItemsPerSecond;
  //   $productionLine->assembly_count = $previousProducerCount;
  //   $productionLine->seconds_per_item = $seconds_per_item;
  //   $productionLine->save();
  //
  //   foreach($productionLine->producerProductionLines as $pl) {
  //     $this->updateInputAssemblers($pl);
  //   }
  //
  //   $productionLine->assembly_count = ceil($productionLine->assembly_count);
  //   $productionLine->items_per_second = round($productionLine->items_per_second, 2);
  //   $ips = $productionLine->items_per_second;
  //   $productionLine->seconds_per_item = ($ips == 0? 0 : 1 / $ips);
  //   $productionLine->seconds_per_item = round($productionLine->seconds_per_item, 1);
  // }

  /**
   * Updates the production line by recalculating the number of assemblers,
   * the seconds per item, and will also update all the input lines for this
   * production line.
   * @param type $productionLine
   * @return type The production line instance
   */
  private function updateProductionLineAssemblers(& $productionLine) {
    $producer = $productionLine->producer;
    if ($productionLine->product != null) {
      $product = $productionLine->product;
      $consumerProducts = $product->consumerProducts;
      $crafting_time = $product->crafting_time;
      $product->producedByProductionLines;
    } else if ($productionLine->process != null) {
      $process = $productionLine->process;
      $consumerProducts = $process->inputProducts;
      $crafting_time = $process->crafting_time;
    } else {
      $this->updateValues($productionLine, 0, 0);
      return;
    }

    foreach ($consumerProducts as $consumerProduct) {
      $consumerProduct->requiredProduct = Product::where('name', $consumerProduct->required_product_name)->first();
    }

    $seconds_per_item = $crafting_time / $producer->speed;
    $numberOfAssemblers = $this->calculateNumberOfProducersNeeded($productionLine, $producer, $seconds_per_item);
    $this->updateValues($productionLine, $numberOfAssemblers, $seconds_per_item);
  }

  /**
   * (Mining power - Mining hardness) * Mining speed / Mining time
   * @param type $productionLine
   * @return type
   */
  private function updateInputAssemblers(& $productionLine) {

    if ($productionLine->product != null) {
      $this->singleProductCalculation($productionLine);
      return;
    } else if ($productionLine->process != null) {
      $products = $productionLine->process->outputProducts;
      foreach ($products as $p) {
        $p->requiredProduct = Product::where('name', $p->required_product_name)->first();
      }
      $product = null;
    } else {
      $numberOfAssemblers = 0;
      $productionLine->items_per_second = 0;
      $seconds_per_item = 0;
      $this->updateValues($productionLine, $numberOfAssemblers, $seconds_per_item);
      return;
    }

  }

  private function singleProductCalculation(& $productionLine) {
    $product = $productionLine->product;
    $consumerProducts = $product->consumerProducts;
    foreach ($consumerProducts as $consumerProduct) {
      $consumerProduct->requiredProduct = Product::where('name', $consumerProduct->required_product_name)->first();
    }
    $product->producedByProductionLines;
    $producer = $productionLine->producer;

    $items_per_second = $this->getItemsPerSecond($productionLine, $product);

    $productionLine->items_per_second = $items_per_second;
    $seconds_per_item = $product->crafting_time / $producer->speed;

    $numberOfAssemblers = $this->calculateNumberOfProducersNeeded($productionLine, $producer, $seconds_per_item);

    $this->updateValues($productionLine, $numberOfAssemblers, $seconds_per_item);
  }

  private function getItemsPerSecond(& $productionLine, & $product) {
    $items_per_second = 0;
    foreach($productionLine->consumerProductionLines as $consumerProductionLine) {

      if ($consumerProductionLine->product != null) {
        $consumerProduct = $consumerProductionLine->product;
        $consumerProducts = $consumerProduct->consumerProducts;
      } else if ($consumerProductionLine->process != null) {
        $consumerProcess = $consumerProductionLine->process;
        $consumerProducts = $consumerProcess->inputProducts;
      } else {
        continue;
      }

      $index = $consumerProducts->search(function ($consumerProductRef, $key) use ($product) {
        return $consumerProductRef->product_id == $product->id;
      });

      $requiredConsumerProduct = $consumerProducts[$index];
      $consumerRequirement = $requiredConsumerProduct->consumer_requirement;

      $items_per_second += ($consumerRequirement / $consumerProductionLine->seconds_per_item) * $consumerProductionLine->assembly_count;
    }
    return $items_per_second;
  }

  private function calculateNumberOfProducersNeeded(& $productionLine, & $producer, $seconds_per_item) {
    switch($producer->producer_type){
      case 0:
        $product = $productionLine->product;
        return ($productionLine->items_per_second * $product->crafting_time) /
              ($producer->speed * ($producer->power - $product->hardness));
      case 1:
      case 2:
        $product = $productionLine->product;
        return ($productionLine->items_per_second * $seconds_per_item) / $product->stock_size;
      case 3:
        return ($productionLine->items_per_second * 10) / ($producer->yield * $producer->speed);
      case 4:
        return 0;
      case 5:
        return 1;
    }
  }

  private function updateValues(& $productionLine, $numberOfAssemblers, $seconds_per_item) {
    $productionLine->assembly_count = $numberOfAssemblers;
    $productionLine->seconds_per_item = $seconds_per_item;
    $productionLine->save();

    foreach($productionLine->producerProductionLines as $pl) {
      $this->updateInputAssemblers($pl);
    }

    $productionLine->assembly_count = ceil($productionLine->assembly_count);
    $productionLine->items_per_second = round($productionLine->items_per_second, 2);
    $ips = $productionLine->items_per_second;
    $productionLine->seconds_per_item = ($ips == 0? 0 : 1 / $ips);
    $productionLine->seconds_per_item = round($productionLine->seconds_per_item, 1);

    $productionLine->updated = true;
  }
}
