<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration {

  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('products', function (Blueprint $table) {
      $table->boolean('is_fluid')->default(false);
      $table->float('crafting_time');
      $table->float('hardness')->nullable();
      $table->integer('stock_size')->default(1);
      $table->string('image_file')->nullable();
      $table->boolean('from_process')->default(false);
      $table->string('name')->default('New Product');

      $table->increments('id');
      $table->integer('consumer_product_id')->unsigned()->nullable();
      $table->integer('product_type_id')->unsigned()->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('products');
  }

}
