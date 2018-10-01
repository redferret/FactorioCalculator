<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Process extends Model {
  protected $fillable = ['name', 'image_file', 'crafting_time'];

  public function inputProducts() {
    return $this->belongsToMany(ConsumerProduct::class, 'process_input_products');
  }

  public function outputProducts() {
    return $this->belongsToMany(ConsumerProduct::class, 'process_output_products');
  }

  public function producer() {
    return $this->belongsTo(Producer::class);
  }
}
