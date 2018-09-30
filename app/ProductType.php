<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductType extends Model {
  protected $fillable = ['name', 'image_file'];

  public function products() {
    return $this->hasMany(Product::class);
  }
}
