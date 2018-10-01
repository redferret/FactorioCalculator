<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\AppBuilder;
use App\User;
use App\Product;
use App\Process;

class ExampleTest extends TestCase {

  use RefreshDatabase;
  /**
   * A basic test example.
   *
   * @return void
   */
  public function testAppBuilder() {
    $builder = new AppBuilder();
    $builder->populateDatabase();

    $this->assertDatabaseHas('product_types', [
      'name' => 'Logistics',
      'image_file' => 'Logistics_(research).png'
    ]);

    $this->assertDatabaseHas('product_types', [
      'name' => 'Production',
      'image_file' => 'Item-group_production.png'
    ]);

    $this->assertDatabaseHas('product_types', [
      'name' => 'Intermediates',
      'image_file' => 'Item-group_intermediate_products.png'
    ]);

    $this->assertDatabaseHas('product_types', [
      'name' => 'Combat',
      'image_file' => 'Item-group_military.png'
    ]);

    $product = Product::where('name', 'Coal')->firstOrFail();
    $productType = $product->productType;
    $this->assertTrue($productType->name == 'Intermediates');

    $process = Process::where('name', 'Basic oil processing')->firstOrFail();
    $this->assertTrue($process->inputProducts()->count() == 1);
    $this->assertTrue($process->inputProducts()->first()->required_product_name == 'Crude oil');

    $this->assertTrue($process->outputProducts()->count() == 3);
    $this->assertTrue($process->outputProducts()->first()->required_product_name == 'Heavy oil');
  }
}
