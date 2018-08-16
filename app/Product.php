<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['crafting_time', 'name'];
    
    public function productionLine() {
      return $this->belongsTo(ProductionLine::class);
    }
    
    public function inputs() {
      return $this->hasMany(Product::class);
    }
    
    public function user() {
      return $this->belongsTo(User::class);
    }
}
