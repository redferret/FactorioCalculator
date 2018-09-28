<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Process extends Model {
  protected $fillable = ['name', 'image_file'];

  public function products() {
    return $this->belongsToMany(Product::class, 'process_product');
  }

  public function producer() {
    return $this->belongsTo(Producer::class);
  }
}
