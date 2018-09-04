<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ConsumerProduct extends Model{
  protected $fillable = ['product_id', 'consumer_requirement'];

  public function consumerProduct() {
    return $this->belongsTo(Product::class);
  }

  public function requiredProduct() {
    return $this->hasOne(Product::class);
  }
}
