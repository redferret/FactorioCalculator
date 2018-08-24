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
        $productionLine->produces;
        $productionLine->producer;
        $productionLine->assembly_count = round($productionLine->assembly_count, 2);
        $productionLine->seconds_per_item = round($productionLine->seconds_per_item, 2);
        $productionLine->items_per_second = round($productionLine->items_per_second, 2);

        // If this production line is an output only
        if ($productionLine->productionLine == null) {
          $totalItems += $productionLine->items_per_second;
        }
      }
      $factory->total_items = round($totalItems);
    }
    return $factories;
  }

  public static function update($productionLine) {
    $consumer = $productionLine->consumer;
    if ($consumer == null) {
      Utility::updateOutput($productionLine);
    }
    $productionLine->assembly_count = round($productionLine->assembly_count, 2);
    $productionLine->items_per_second = round($productionLine->items_per_second, 2);
    $productionLine->seconds_per_item = round($productionLine->seconds_per_item, 2);
    return $productionLine;
  }

  public static function updateOutput($productionLine) {
    $producer = $productionLine->producer;
    $product = $productionLine->produces;

    $seconds_per_item = $product->crafting_time / $producer->speed;
    $numberOfProducers = ($productionLine->items_per_second * $seconds_per_item) / $product->stock_size;

    $productionLine->assembly_count = $numberOfProducers;
    $productionLine->seconds_per_item = $seconds_per_item;
    $productionLine->save();

    foreach($productionLine->productionLines as $key => $pl) {
      Utility::updateInput($pl);
      $pl->assembly_count = round($pl->assembly_count, 2);
      $pl->items_per_second = round($pl->items_per_second, 2);
      $pl->seconds_per_item = round($pl->seconds_per_item, 2);
    }

    return $productionLine;
  }

  public static function updateInput($productionLine) {
    // Naming is strange but this is the production line that consumes this production lines product
    $consumer = $productionLine->productionLine;
    $producer = $productionLine->producer;

    $productionLine->items_per_second = ($consumer->consumer_requirement / $consumer->seconds_per_item) * $consumer->assembly_count;
    $product = $productionLine->produces;

    $seconds_per_item = $product->crafting_time / $producer->speed;
    $numberOfProducers = ($productionLine->items_per_second * $seconds_per_item) / $product->stock_size;

    $productionLine->assembly_count = $numberOfProducers;
    $productionLine->seconds_per_item = $seconds_per_item;
    $productionLine->save();

    foreach($productionLine->productionLines as $key => $pl) {
      Utility::updateInput($pl);
      $pl->assembly_count = round($pl->assembly_count, 2);
      $pl->items_per_second = round($pl->items_per_second, 2);
      $pl->seconds_per_item = round($pl->seconds_per_item, 2);
    }

    return $productionLine;
  }
}
