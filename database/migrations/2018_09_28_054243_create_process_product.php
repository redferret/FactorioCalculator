<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProcessProduct extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('process_product', function(Blueprint $table) {
      $table->integer('process_id')->unsigned();
      $table->integer('product_id')->unsigned();
      $table->primary('process_id', 'product_id');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down(){
    Schema::dropIfExists('process_product');
  }
}
