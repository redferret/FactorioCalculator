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
      $table->string('name')->default('New Producer');
      $table->string('image_file')->default('');
      $table->boolean('producer_type')->default(1);
      $table->float('speed')->default(0.5);
      $table->float('power')->nullable();

      $table->integer('user_id')->unsigned()->nullable();
      $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
      $table->integer('production_line_id')->unsigned()->nullable();
      $table->foreign('production_line_id')->references('id')->on('production_lines')->onDelete('cascade');
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
