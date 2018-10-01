<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ConsumerProduct extends Model{
  protected $fillable = ['product_id', 'consumer_requirement', 'required_product_name'];

  public function consumerProduct() {
    return $this->belongsTo(Product::class);
  }

  public function inputForProcesses() {
    return $this->belongsToMany(Process::class, 'process_input_products');
  }

  public function outputForProcesses() {
    return $this->belongsToMany(Process::class, 'process_output_products');
  }
}
