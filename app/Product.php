<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['crafting_time', 'name', 'image_file', 'user_id',
      'stock_size', 'hardness', 'product_type_id', 'is_fluid', 'consumer_product_id'];

    /**
     * The production lines that produce this product
     */
    public function producedByProductionLines() {
      return $this->hasMany(ProductionLine::class);
    }

    public function consumerProducts() {
      return $this->hasMany(ConsumerProduct::class);
    }

    public function consumerProduct() {
      return $this->belongsTo(ConsumerProduct::class);
    }

    public function productType() {
      return $this->belongsTo(ProductType::class);
    }

    public function user() {
      return $this->belongsTo(User::class);
    }
}
