<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['crafting_time', 'name', 'image_file', 'user_id',
      'stock_size', 'hardness', 'product_type_id', 'is_fluid'];

    /**
     * The production lines that produce this product
     */
    public function producedByProductionLines() {
      return $this->hasMany(ProductionLine::class);
    }

    public function consumerProducts() {
      return $this->hasMany(ConsumerProduct::class);
    }

    public function process() {
      return $this->belongsToMany(Process::class, 'process_product');
    }

    public function productType() {
      return $this->belongsTo(ProductType::class);
    }

}
