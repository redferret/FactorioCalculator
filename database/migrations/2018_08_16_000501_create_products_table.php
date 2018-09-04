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
      $table->float('crafting_time')->nullable();
      $table->float('hardness')->nullable();
      $table->integer('stock_size')->nullable();
      $table->string('image_file')->nullable();
      $table->string('name')->default('New Product');

      $table->increments('id');
      $table->integer('consumer_product_id')->unsigned()->nullable();
      $table->integer('product_type_id')->unsigned()->nullable();
      $table->integer('user_id')->unsigned()->nullable();
      $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
