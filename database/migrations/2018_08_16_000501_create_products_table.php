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
      $table->increments('id');
      $table->string('name')->default('New Product');
      $table->float('consumption_count')->default(0);
      $table->integer('desired_assembly_count')->default(0);
      $table->integer('stock_size')->default(1);
      $table->float('crafting_time')->default(1);
      $table->float('hardness')->nullable();

      $table->integer('production_line_id')->unsigned()->nullable();
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
