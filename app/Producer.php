<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producer extends Model {
  
  protected $fillable = ['is_miner', 'speed', 'power', 'product_id'];
  
  public function product() {
    return $this->belongsTo(Product::class);
  }
}
