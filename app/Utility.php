
namespace App;

class Utility {
  public static function updateOutput(Productionline $productionLine) {
    $productionLine->produces;
    $producer = $productionLine->producer;
    $seconds_per_item = round($productionLine->items_per_second / $producer->speed, 2);
    $numberOfProducers = round(($productionLine->items_per_second * $seconds_per_item) / $product->stock_size, 2);

    $productionLine->assembly_count = $numberOfProducers;
    $productionLine->seconds_per_item = $seconds_per_item;
    $productionLine->save();

    foreach($productionLine->productionLines as $productionLine) {
      ProductionLineController::updateInput($productionLine);
    }
  }

  public static function updateInput(ProductionLine $productionLine) {
    // Naming is strange but this is the production line that consumes this production lines product
    $consumer = $productionLine->productionLine;
    $producer = $productionLine->producer;
    $productionLine->items_per_second = ($consumer->consumer_requirement / $consumer->seconds_per_item) * $consumer->assembly_count;

    $seconds_per_item = round($productionLine->items_per_second / $producer->speed, 2);
    $numberOfProducers = round(($productionLine->items_per_second * $seconds_per_item) / $product->stock_size, 2);

    $productionLine->assembly_count = $numberOfProducers;
    $productionLine->seconds_per_item = $seconds_per_item;
    $productionLine->save();

    foreach($productionLine->productionLines as $productionLine) {
      ProductionLineController::updateInput($productionLine);
    }
  }
}
