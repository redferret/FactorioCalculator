<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['crafting_time', 'name', 'image_file', 'user_id',
      'stock_size', 'hardness', 'product_type_id'];

    /**
     * The production lines that produce this product
     */
    public function producedByProductionLines() {
      return $this->hasMany(ProductionLine::class);
    }

    public function consumerProducts() {
      return $this->belongsToMany(Product::class, 'consumer_consumed',
        'consumed_by_product_id', 'consumer_product_id');
    }

    public function consumedByProducts() {
      return $this->belongsToMany(Product::class, 'consumer_consumed',
        'consumer_product_id', 'consumed_by_product_id');
    }

    public function productType() {
      return $this->belongsTo(ProductType::class);
    }

    public function user() {
      return $this->belongsTo(User::class);
    }
}
