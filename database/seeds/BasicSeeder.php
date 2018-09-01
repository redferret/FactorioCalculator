<?php

use Illuminate\Database\Seeder;

class BasicSeeder extends Seeder {

  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    $user = App\User::first();
    // Factories
    $factory = $user->factories()->save(
      App\Factory::create([
        'name' => 'Metal Plate Factory'
      ])
    );
    $user->factories()->save(
      App\Factory::create([
        'name' => 'Empty Factory Example'
      ])
    );

    // Production lines
    $copperProduction = $user->productionLines()->save(
      App\ProductionLine::create([
        'name' => 'Copper Production 1'
      ])
    );
    $ironProduction = $user->productionLines()->save(
      App\ProductionLine::create([
        'name' => 'Iron Production 1',
        'items_per_second' => 12
      ])
    );
    $copperOreProduction = $user->productionLines()->save(
      App\ProductionLine::create([
        'name' => 'Copper Ore Production'
      ])
    );
    $ironOreProduction = $user->productionLines()->save(
      App\ProductionLine::create([
        'name' => 'Iron Ore Production'
      ])
    );
    $copperWireProduction = $user->productionLines()->save(
      App\ProductionLine::create([
        'name' => 'Copper Wire Production',
        'items_per_second' => 8
      ])
    );

    // Connect production lines with a factory
    $factory->productionLines()->save($copperWireProduction);
    $factory->productionLines()->save($copperProduction);
    $factory->productionLines()->save($ironProduction);
    $factory->productionLines()->save($ironOreProduction);
    $factory->productionLines()->save($copperOreProduction);

    // Producer Definitions for production lines
    $assembler1 = $user->producers()->where('name', 'Assembling Machine 1')->first();
    $assembler2 = $user->producers()->where('name', 'Assembling Machine 2')->first();
    $assembler3 = $user->producers()->where('name', 'Assembling Machine 3')->first();
    $furnace = $user->producers()->where('name', 'Steel Furnace')->first();
    $miner = $user->producers()->where('name', 'Electric Mining Drill')->first();

    // Producers for production lines
    $copperWireProduction->producer()->save($assembler3->replicate());
    $copperProduction->producer()->save($furnace->replicate());
    $copperOreProduction->producer()->save($miner->replicate());
    $ironProduction->producer()->save($furnace->replicate());
    $ironOreProduction->producer()->save($miner->replicate());

    // Products
    $copperWire = $user->products()->where('name', 'Copper Cable')->first();
    $copperPlate = $user->products()->where('name', 'Copper Plate')->first();
    $copperOre = $user->products()->where('name', 'Copper Ore')->first();
    $ironPlate = $user->products()->where('name', 'Iron Plate')->first();
    $ironOre = $user->products()->where('name', 'Iron Ore')->first();

    // Connect a product with a production line
    $copperWire->producedByProductionLines()->save($copperWireProduction);
    $copperPlate->producedByProductionLines()->save($copperProduction);
    $ironPlate->producedByProductionLines()->save($ironProduction);
    $copperOre->producedByProductionLines()->save($copperOreProduction);
    $ironOre->producedByProductionLines()->save($ironOreProduction);
    
    // Connect consumption needs to production lines
    $copperWireProduction->producerProductionLines()->save($copperProduction);
    $copperProduction->producerProductionLines()->save($copperOreProduction);
    $ironProduction->producerProductionLines()->save($ironOreProduction);
  }
}
