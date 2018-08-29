<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductType extends Model {
  protected $fillable = ['name'];

  public function user() {
    return $this->belongsTo(User::class);
  }

  public function products() {
    return $this->hasMany(Product::class);
  }
}
