<?php

use Illuminate\Database\Seeder;

class ProductTypeSeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    $user = App\User::first();
    $user->productTypes()->save(App\ProductType::create([
      'name'=>'Logistics',
      'image_file' => 'Logistics_(research).png',
    ]));
    $user->productTypes()->save(App\ProductType::create([
      'name'=>'Production',
      'image_file' => 'Item-group_production.png',
    ]));
    $user->productTypes()->save(App\ProductType::create([
      'name'=>'Intermediate',
      'image_file' => 'Item-group_intermediate_products.png',
    ]));
    $user->productTypes()->save(App\ProductType::create([
      'name'=>'Combat',
      'image_file' => 'Item-group_military.png',
    ]));
  }
}
