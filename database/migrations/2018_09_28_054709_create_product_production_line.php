<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductProductionLine extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('product_production_line', function(Blueprint $table) {
      $table->integer('product_id')->unsigned();
      $table->integer('production_line_id')->unsigned();
      $table->primary('product_id', 'production_line_id');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('product_production_line');
  }
}
