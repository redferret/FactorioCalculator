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
      $table->float('crafting_time')->default(1);
      $table->float('hardness')->nullable();
      $table->increments('id');
      $table->integer('product_type_id')->unsigned()->nullable();
      $table->integer('stock_size')->default(1);
      $table->string('image_file')->default('');
      $table->string('name')->default('New Product');

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
