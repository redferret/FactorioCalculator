<?php

use Illuminate\Database\Seeder;
use App\AppBuilder;

class DatabaseSeeder extends Seeder {

  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run() {
    echo "Building database...\n";
    $builder = new AppBuilder();
    $builder->populateDatabase();
    echo "Done\n";
  }

}
