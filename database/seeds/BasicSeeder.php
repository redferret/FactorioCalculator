<?php

use Illuminate\Database\Seeder;

class BasicSeeder extends Seeder {

  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    $user = App\User::create([
      'name' => 'Richard',
      'email' => 'TestUserEmail@gmail.com',
      'password' => bcrypt('secret')
    ]);

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

    $copperProduction = $user->productionLines()->save(
      App\ProductionLine::create([
        'name' => 'Copper Production 1'
      ])
    );

    $ironProduction = $user->productionLines()->save(
      App\ProductionLine::create([
        'name' => 'Iron Production 1'
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
        'name' => 'Copper Wire Production'
      ])
    );

    $emptyProduction = $user->productionLines()->save(
      App\ProductionLine::create([
        'name' => 'Empty Production Example'
      ])
    );

    $factory->productionLines()->save($copperWireProduction);
    $factory->productionLines()->save($copperProduction);
    $factory->productionLines()->save($ironProduction);
    $factory->productionLines()->save($emptyProduction);
    $factory->productionLines()->save($ironOreProduction);
    $factory->productionLines()->save($copperOreProduction);

    $copperWire = $user->products()->save(App\Product::create([
      'name' => 'Copper Wire',
      'crafting_time' => 0.5,
      'items_per_second' => 8
    ]));

    $copperWire->producer()->save(App\Producer::create([
      'speed' => 0.75,
    ]));

    $copperPlate = $user->products()->save(App\Product::create([
      'name' => 'Copper Plate',
      'crafting_time' => 3.5,
      'items_per_second' => 2
    ]));

    $copperPlate->producer()->save(App\Producer::create([
      'speed' => 0.75,
    ]));

    $copperOre = $user->products()->save(App\Product::create([
      'name' => 'Copper Ore',
      'crafting_time' => 2,
      'consumption_count' => 1,
      'hardness' => 0.9
    ]));

    $copperOre->producer()->save(App\Producer::create([
      'is_miner' => true,
      'speed' => 0.5,
      'power' => 3
    ]));

    $ironPlate = $user->products()->save(App\Product::create([
      'name' => 'Iron Plate',
      'crafting_time' => 3.5,
      'items_per_second' => 2
    ]));

    $ironPlate->producer()->save(App\Producer::create([
      'speed' => 0.75,
    ]));

    $ironOre = $user->products()->save(App\Product::create([
      'name' => 'Iron Ore',
      'crafting_time' => 2,
      'consumption_count' => 1,
      'hardness' => 0.9
    ]));

    $ironOre->producer()->save(App\Producer::create([
      'is_miner' => true,
      'speed' => 0.5,
      'power' => 3
    ]));

    $copperWireProduction->produces()->save($copperWire);
    $copperProduction->produces()->save($copperPlate);
    $ironProduction->produces()->save($ironPlate);
    $copperOreProduction->produces()->save($copperOre);
    $ironOreProduction->produces()->save($ironOre);

    $copperWire->productionLines()->save($copperProduction);
    $copperPlate->productionLines()->save($copperOreProduction);
    $ironPlate->productionLines()->save($ironOreProduction);
  }
}
