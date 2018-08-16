<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductionLine extends Model
{
  protected $fillable = ['name', 'user_id'];
  
  public function produces() {
    return $this->hasOne(Product::class);
  }
  
  public function factory() {
    return $this->belongsTo(Factory::class);
  }
  
  public function user() {
    return $this->belongsTo(User::class);
  }
}
