<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {

  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run() {
    $this->call(UserSeeder::class);
    $this->call(ProductTypeSeeder::class);
    $this->call(ProducersSeeder::class);
    $this->call(ProductsSeeder::class);
    $this->call(BasicSeeder::class);

  }

}
