<?php

namespace App;

use ProductionLine;

class Utility {

  public static function update($productionLine) {
    $consumer = $productionLine->consumer;
    if ($consumer == null) {
      Utility::updateOutput($productionLine);
    }
  }

  public static function updateOutput($productionLine) {
    $producer = $productionLine->producer;
    $product = $productionLine->produces;

    $seconds_per_item = $product->crafting_time / $producer->speed;
    $numberOfProducers = ($productionLine->items_per_second * $seconds_per_item) / $product->stock_size;

    $productionLine->assembly_count = $numberOfProducers;
    $productionLine->seconds_per_item = $seconds_per_item;
    $productionLine->save();

    foreach($productionLine->productionLines as $productionLine) {
      Utility::updateInput($productionLine);
    }
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

    foreach($productionLine->productionLines as $productionLine) {
      Utility::updateInput($productionLine);
    }
  }
}
