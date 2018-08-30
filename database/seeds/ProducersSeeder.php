<?php

use Illuminate\Database\Seeder;

class ProducersSeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    $user = App\User::first();
    $user->producers()->save(App\Producer::create([
      'name' => 'Assembling Machine 1',
      'image_file' => 'Assembling_machine_1.png',
      'producer_type' => 1,
      'speed' => 0.5
    ]));
    $user->producers()->save(App\Producer::create([
      'name' => 'Assembling Machine 2',
      'image_file' => 'Assembling_machine_2.png',
      'producer_type' => 1,
      'speed' => 0.75
    ]));
    $user->producers()->save(App\Producer::create([
      'name' => 'Assembling Machine 3',
      'image_file' => 'Assembling_machine_3.png',
      'producer_type' => 1,
      'speed' => 1.25
    ]));
    $user->producers()->save(App\Producer::create([
      'name' => 'Steel Furnace',
      'image_file' => 'Steel_furnace.png',
      'producer_type' => 2,
      'speed' => 2
    ]));
    $user->producers()->save(App\Producer::create([
      'name' => 'Electric Mining Drill',
      'image_file' => 'Electric_mining_drill.png',
      'producer_type' => 0,
      'speed' => 1,
      'power' => 3
    ]));

    $oilRefinery = $user->producers()->save(App\Producer::create([
      'name' => 'Oil refinery',
      'image_file' => 'Oil_refinery.png',
      'producer_type' => 3,
      'speed' => 2
    ]));
    $basicOilProcess = $oilRefinery->processes()->save(App\Process::create([
      'name'=>'Basic oil processing',
      'image_file' => 'Basic_oil_processing.png'
    ]));
    $advancedOilProcess = $oilRefinery->processes()->save(App\Process::create([
      'name'=>'Advanced oil processing',
      'image_file' => 'Advanced_oil_processing.png'
    ]));
    $coalLiquefaction = $oilRefinery->processes()->save(App\Process::create([
      'name'=>'Coal liquefaction',
      'image_file' => 'Coal_liquefaction.png'
    ]));
  }
}
