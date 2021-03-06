<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConsumerProductsTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('consumer_products', function (Blueprint $table) {
      $table->increments('id');
      $table->integer('consumer_requirement')->default(1);
      $table->string('required_product_name')->default('');
      $table->integer('product_id')->unsigned()->nullable();
      $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('consumer_products');
  }
}
