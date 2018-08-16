<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Factory extends Model {
  
  protected $fillable = ['name', 'user_id'];
  
  public function productionLines() {
    return $this->hasMany(ProductionLine::class);
  }
  
  public function user() {
    return $this->belongsTo(User::class);
  }
}
