<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\AppBuilder;
use App\User;
use App\Product;

class ExampleTest extends TestCase {

  use RefreshDatabase;
  /**
   * A basic test example.
   *
   * @return void
   */
  public function testAppBuilder() {
    $user = factory(User::class)->make();

    $builder = new AppBuilder($user);
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

  }
}
