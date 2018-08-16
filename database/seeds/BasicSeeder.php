<?php

use Illuminate\Database\Seeder;

class BasicSeeder extends Seeder {

  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    App\User::create([
      'name' => 'Richard',
      'email' => str_random(10).'@gmail.com',
      'password' => bcrypt('secret')
    ]);
    
    App\Factory::create([
      'name' => "My Factory",
      'user_id' => 1
    ]);
    
    App\ProductionLine::create([
      'name' => 'Copper Production 1',
      'user_id' => 1,
      'factory_id' => 1
    ]);
    
    App\Product::create([
      'name' => 'Copper Plate',
      'crafting_time' => 3.5,
      'user_id' => 1,
      'production_line_id' => 1,
      'product_id' => 2
    ]);
    
    App\Product::create([
      'name' => 'Copper Ore',
      'crafting_time' => 3.5,
      'user_id' => 1,
      'product_id' => 1
    ]);
    
  }

}
