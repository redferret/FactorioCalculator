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

    // Producer Definitions for production lines
    $assembler1 = $user->producers()->save(App\Producer::create([
      'name' => 'Assembling Machine 1',
      'speed' => 0.5
    ]));
    $assembler2 = $user->producers()->save(App\Producer::create([
      'name' => 'Assembling Machine 2',
      'speed' => 0.75
    ]));
    $assembler3 = $user->producers()->save(App\Producer::create([
      'name' => 'Assembling Machine 3',
      'speed' => 1.25
    ]));

    $miner = $user->producers()->save(App\Producer::create([
      'name' => 'Miner',
      'speed' => 1,
      'power' => 3
    ]));

    // Producers for production lines
    $copperWireProduction->producer()->save($assembler3->replicate());
    $copperProduction->producer()->save($assembler2->replicate());
    $copperOreProduction->producer()->save($miner->replicate());
    $ironProduction->producer()->save($assembler1->replicate());
    $ironOreProduction->producer()->save($miner->replicate());

    // Product Types, always by default these are created
    $user->productTypes()->save(App\ProductType::create([
      'name'=>'Logistics'
    ]));
    $user->productTypes()->save(App\ProductType::create([
      'name'=>'Production'
    ]));
    $user->productTypes()->save(App\ProductType::create([
      'name'=>'Intermediate'
    ]));
    $user->productTypes()->save(App\ProductType::create([
      'name'=>'Combat'
    ]));

    // Products
    $copperWire = $user->products()->save(App\Product::create([
      'name' => 'Copper Wire',
      'crafting_time' => 0.5,
      'stock_size' => 2,
      'product_type_id'=>3
    ]));
    $copperPlate = $user->products()->save(App\Product::create([
      'name' => 'Copper Plate',
      'crafting_time' => 3.5,
      'product_type_id'=>3
    ]));
    $copperOre = $user->products()->save(App\Product::create([
      'name' => 'Copper Ore',
      'crafting_time' => 2,
      'hardness' => 0.9,
      'product_type_id'=>3
    ]));
    $ironPlate = $user->products()->save(App\Product::create([
      'name' => 'Iron Plate',
      'crafting_time' => 3.5,
      'product_type_id'=>3
    ]));
    $ironOre = $user->products()->save(App\Product::create([
      'name' => 'Iron Ore',
      'crafting_time' => 2,
      'hardness' => 0.9,
      'product_type_id'=>3
    ]));

    // Connect a product with a production line
    $copperWireProduction->produces()->save($copperWire);
    $copperProduction->produces()->save($copperPlate);
    $ironProduction->produces()->save($ironPlate);
    $copperOreProduction->produces()->save($copperOre);
    $ironOreProduction->produces()->save($ironOre);

    // Connect consumption needs to production lines
    $copperWireProduction->producerProductionLines()->save($copperProduction);
    $copperProduction->producerProductionLines()->save($copperOreProduction);
    $ironProduction->producerProductionLines()->save($ironOreProduction);
  }
}
