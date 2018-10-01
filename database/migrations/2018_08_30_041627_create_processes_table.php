<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProcessesTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('processes', function (Blueprint $table) {
      $table->increments('id');
      $table->string('name')->default('Unnamed Process');
      $table->string('image_file')->default('');
      $table->integer('crafting_time')->default(1);
      $table->integer('producer_id')->unsigned()->nullable();
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
    Schema::dropIfExists('processes');
  }
}
