<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ConsumerProducerLines extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
      Schema::create('consumer_producer', function(Blueprint $table) {
        $table->integer('consumer_production_line_id')->unsigned()->nullable();
        $table->integer('producer_production_line_id')->unsigned()->nullable();
        $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
      Schema::dropIfExists('consumer_producer');
    }
}
