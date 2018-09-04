<?php

namespace App;

use Auth;
use ProductionLine;

class Utility {

  public static function getAllFactories() {
    $factories = Auth::user()->factories;
    foreach($factories as $factory) {
      $totalItems = 0;
      foreach($factory->productionLines as $productionLine) {
        Utility::update($productionLine);
        // If this production line is an output
        if ($productionLine->consumerProductionLines()->first() == null) {
          $totalItems += $productionLine->items_per_second;
          $productionLine->is_output = true;
        } else {
          $productionLine->is_output = false;
        }
      }
      $factory->total_items = round($totalItems);
    }
    return $factories;
  }

  /**
   * Updates the production line by recalculating the number of assemblers,
   * the seconds per item, and will also update all the input lines for this
   * production line.
   * @param type $productionLine
   * @return type The production line instance
   */
  public static function update($productionLine) {
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
      Utility::updateInput($pl);
    }

    $productionLine->assembly_count = round($productionLine->assembly_count, 2);
    $productionLine->items_per_second = round($productionLine->items_per_second, 2);
    $productionLine->seconds_per_item = round($productionLine->seconds_per_item, 2);

    return $productionLine;
  }

  /**
   * (Mining power - Mining hardness) * Mining speed / Mining time
   * @param type $productionLine
   * @return type
   */
  public static function updateInput($productionLine) {
    // Naming is strange but this is the production line that consumes this production lines product
    if ($productionLine->consumerProductionLines()->first() == null) {
      throw new Exception("Production line '".$productionLine->name."' must be an input");
    }

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
      Utility::updateInput($pl);
    }

    $productionLine->assembly_count = round($productionLine->assembly_count, 2);
    $productionLine->items_per_second = round($productionLine->items_per_second, 2);
    $productionLine->seconds_per_item = round($productionLine->seconds_per_item, 2);

    return $productionLine;
  }
}
