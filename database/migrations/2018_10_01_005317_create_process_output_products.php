<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProcessOutputProducts extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('process_output_products', function(Blueprint $table) {
      $table->integer('process_id')->unsigned();
      $table->integer('consumer_product_id')->unsigned();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down(){
    Schema::dropIfExists('process_output_products');
  }
}
