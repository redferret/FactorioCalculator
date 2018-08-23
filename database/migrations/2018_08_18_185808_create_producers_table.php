<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProducersTable extends Migration {

  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('producers', function (Blueprint $table) {
      $table->increments('id');
      $table->boolean('is_miner')->default(false);
      $table->float('speed')->default(0.5);
      $table->float('power')->default(2);
      $table->integer('production_line_id')->unsigned()->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('producers');
  }

}
