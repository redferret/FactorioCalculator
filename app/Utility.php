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
        // If this production line is an output
        if ($productionLine->consumerProductionLines()->first() == null) {
          Utility::update($productionLine);
          $totalItems += $productionLine->items_per_second;
          $productionLine->is_output = true;
        } else {
          $productionLine->producer;
          $productionLine->produces;
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
    $product = $productionLine->produces;

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
   *
   * @param type $productionLine
   * @return type
   */
  public static function updateInput($productionLine) {
    // Naming is strange but this is the production line that consumes this production lines product
    if ($productionLine->consumerProductionLines()->first() == null) {
      throw new Exception("Production line '".$productionLine->name."' must be an input");
    }

    $items_per_second = 0;

    foreach($productionLine->consumerProductionLines as $consumer) {
      $items_per_second += ($consumer->consumer_requirement / $consumer->seconds_per_item) * $consumer->assembly_count;
    }

    $productionLine->items_per_second = $items_per_second;

    $product = $productionLine->produces;
    $producer = $productionLine->producer;

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
