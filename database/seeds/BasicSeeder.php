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
      'image_name' => 'Assembling_machine_1.png',
      'producer_type' => 1,
      'speed' => 0.5
    ]));
    $assembler2 = $user->producers()->save(App\Producer::create([
      'name' => 'Assembling Machine 2',
      'image_name' => 'Assembling_machine_2.png',
      'producer_type' => 1,
      'speed' => 0.75
    ]));
    $assembler3 = $user->producers()->save(App\Producer::create([
      'name' => 'Assembling Machine 3',
      'image_name' => 'Assembling_machine_3.png',
      'producer_type' => 1,
      'speed' => 1.25
    ]));
    $furnace = $user->producers()->save(App\Producer::create([
      'name' => 'Steel Furnace',
      'image_name' => 'Steel_furnace.png',
      'producer_type' => 2,
      'speed' => 2
    ]));
    $miner = $user->producers()->save(App\Producer::create([
      'name' => 'Electric Mining Drill',
      'image_name' => 'Electric_mining_drill.png',
      'producer_type' => 0,
      'speed' => 1,
      'power' => 3
    ]));

    // Producers for production lines
    $copperWireProduction->producer()->save($assembler3->replicate());
    $copperProduction->producer()->save($furnace->replicate());
    $copperOreProduction->producer()->save($miner->replicate());
    $ironProduction->producer()->save($furnace->replicate());
    $ironOreProduction->producer()->save($miner->replicate());

    // Product Types, always by default these are created
    $user->productTypes()->save(App\ProductType::create([
      'name'=>'Logistics',
      'image_name' => 'Item-group_logistics.png',
    ]));
    $user->productTypes()->save(App\ProductType::create([
      'name'=>'Production',
      'image_name' => 'Item-group_production.png',
    ]));
    $user->productTypes()->save(App\ProductType::create([
      'name'=>'Intermediate',
      'image_name' => 'Item-group_intermediate_products.png',
    ]));
    $user->productTypes()->save(App\ProductType::create([
      'name'=>'Combat',
      'image_name' => 'Item-group_military.png',
    ]));

    // Products
    $copperWire = $user->products()->save(App\Product::create([
      'name' => 'Copper Cable',
      'image_name' => 'Copper_cable.png',
      'crafting_time' => 0.5,
      'stock_size' => 2,
      'product_type_id' => 3
    ]));
    $copperPlate = $user->products()->save(App\Product::create([
      'name' => 'Copper Plate',
      'image_name' => 'Copper_plate.png',
      'crafting_time' => 3.5,
      'product_type_id' => 3
    ]));
    $copperOre = $user->products()->save(App\Product::create([
      'name' => 'Copper Ore',
      'image_name' => 'Copper_ore.png',
      'crafting_time' => 2,
      'hardness' => 0.9,
      'product_type_id' => 3
    ]));
    $ironPlate = $user->products()->save(App\Product::create([
      'name' => 'Iron Plate',
      'image_name' => 'Iron_plate.png',
      'crafting_time' => 3.5,
      'product_type_id' => 3
    ]));
    $ironOre = $user->products()->save(App\Product::create([
      'name' => 'Iron Ore',
      'image_name' => 'Iron_ore.png',
      'crafting_time' => 2,
      'hardness' => 0.9,
      'product_type_id' => 3
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
