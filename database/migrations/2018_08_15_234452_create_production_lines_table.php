<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductionLinesTable extends Migration {

  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('production_lines', function (Blueprint $table) {
      $table->increments('id');
      $table->string('name')->default('New Production Line');
      $table->float('items_per_second')->default(0);
      $table->float('consumer_requirement')->default(1);
      $table->float('assembly_count')->default(0);
      $table->float('seconds_per_item')->default(0);
      
      $table->integer('factory_id')->unsigned()->nullable();
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
    Schema::dropIfExists('production_lines');
  }

}
