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

    // Producers for production lines
    $copperWireProduction->producer()->save(App\Producer::create([
      'speed' => 0.75,
    ]));
    $copperProduction->producer()->save(App\Producer::create([
      'speed' => 1,
    ]));
    $copperOreProduction->producer()->save(App\Producer::create([
      'is_miner' => true,
      'speed' => 0.5,
      'power' => 3
    ]));
    $ironProduction->producer()->save(App\Producer::create([
      'speed' => 1,
    ]));
    $ironOreProduction->producer()->save(App\Producer::create([
      'is_miner' => true,
      'speed' => 0.5,
      'power' => 3
    ]));

    // Products
    $copperWire = $user->products()->save(App\Product::create([
      'name' => 'Copper Wire',
      'crafting_time' => 0.5,
      'stock_size' => 2
    ]));
    $copperPlate = $user->products()->save(App\Product::create([
      'name' => 'Copper Plate',
      'crafting_time' => 3.5
    ]));
    $copperOre = $user->products()->save(App\Product::create([
      'name' => 'Copper Ore',
      'crafting_time' => 2,
      'hardness' => 0.9
    ]));
    $ironPlate = $user->products()->save(App\Product::create([
      'name' => 'Iron Plate',
      'crafting_time' => 3.5
    ]));
    $ironOre = $user->products()->save(App\Product::create([
      'name' => 'Iron Ore',
      'crafting_time' => 2,
      'hardness' => 0.9
    ]));

    // Connect a product with a production line
    $copperWireProduction->produces()->save($copperWire);
    $copperProduction->produces()->save($copperPlate);
    $ironProduction->produces()->save($ironPlate);
    $copperOreProduction->produces()->save($copperOre);
    $ironOreProduction->produces()->save($ironOre);

    // Connect consumption needs to production lines
    $copperWireProduction->productionLines()->save($copperProduction);
    $copperProduction->productionLines()->save($copperOreProduction);
    $ironProduction->productionLines()->save($ironOreProduction);
  }
}
