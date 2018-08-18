<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['crafting_time', 'name', 'user_id', 'product_id',
        'production_line_id', 'desired_assembly_count', 
        'items_per_second', 'stock_size', 'consumption_count', 'hardness'];
    
    public function productionLine() {
      return $this->belongsTo(ProductionLine::class);
    }
    
    public function product() {
      return $this->belongsTo(Product::class);
    }
    
    public function products() {
      return $this->hasMany(Product::class);
    }
    
    public function producer() {
      return $this->hasOne(Producer::class);
    }
    
    public function user() {
      return $this->belongsTo(User::class);
    }
}
