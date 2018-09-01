<?php

use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    $user = App\User::first();
    $coal = $user->products()->save(App\Product::create([
      'name' => 'Coal',
      'image_file' => 'Coal.png',
      'crafting_time' => 2,
      'hardness' => 0.9,
      'stock_size' => 1,
      'product_type_id' => 3
    ]));
    $stone = $user->products()->save(App\Product::create([
      'name' => 'Stone',
      'image_file' => 'Stone.png',
      'crafting_time' => 2,
      'hardness' => 0.4,
      'stock_size' => 1,
      'product_type_id' => 3
    ]));
    $ironOre = $user->products()->save(App\Product::create([
      'name' => 'Iron Ore',
      'image_file' => 'Iron_ore.png',
      'crafting_time' => 2,
      'hardness' => 0.9,
      'stock_size' => 1,
      'product_type_id' => 3
    ]));
    $copperOre = $user->products()->save(App\Product::create([
      'name' => 'Copper Ore',
      'image_file' => 'Copper_ore.png',
      'crafting_time' => 2,
      'hardness' => 0.9,
      'stock_size' => 1,
      'product_type_id' => 3
    ]));

    $copperPlate = $user->products()->save(App\Product::create([
      'name' => 'Copper Plate',
      'image_file' => 'Copper_plate.png',
      'crafting_time' => 3.5,
      'stock_size' => 1,
      'product_type_id' => 3
    ]));
    $copperPlate->consumerProducts()->save($copperOre);

    $copperWire = $user->products()->save(App\Product::create([
      'name' => 'Copper Cable',
      'image_file' => 'Copper_cable.png',
      'crafting_time' => 0.5,
      'stock_size' => 2,
      'product_type_id' => 3
    ]));
    $copperWire->consumerProducts()->save($copperPlate);

    $ironPlate = $user->products()->save(App\Product::create([
      'name' => 'Iron Plate',
      'image_file' => 'Iron_plate.png',
      'crafting_time' => 3.5,
      'stock_size' => 1,
      'product_type_id' => 3
    ]));
    $ironPlate->consumerProducts()->save($ironOre);

    $uraniumOre = $user->products()->save(App\Product::create([
      'name' => 'Uranium Ore',
      'image_file' => 'Uranium_ore.png',
      'crafting_time' => 4,
      'hardness' => 0.9,
      'stock_size' => 1,
      'product_type_id' => 3
    ]));

    $crudeOil = $user->products()->save(App\Product::create([
      'name' => 'Crude Oil',
      'image_file' => 'Crude_oil.png',
      'product_type_id' => 3,
      'is_fluid'=>true
    ]));
    $heavyOil = $user->products()->save(App\Product::create([
      'name' => 'Heavy Oil',
      'image_file' => 'Heavy_oil.png',
      'product_type_id' => 3,
      'is_fluid'=>true
    ]));
    $lightOil = $user->products()->save(App\Product::create([
      'name' => 'Light Oil',
      'image_file' => 'Light_oil.png',
      'product_type_id' => 3,
      'is_fluid'=>true
    ]));
    $lubricant = $user->products()->save(App\Product::create([
      'name' => 'Lubricant',
      'image_file' => 'Lubricant.png',
      'product_type_id' => 3,
      'is_fluid'=>true
    ]));

  }
}
