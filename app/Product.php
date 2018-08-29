<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['crafting_time', 'name', 'user_id',
        'production_line_id', 'stock_size', 'hardness', 'product_type_id'];

    /**
     * The production line that produces this product
     */
    public function productionLine() {
      return $this->belongsTo(ProductionLine::class);
    }

    public function productType() {
      return $this->belongsTo(ProductType::class);
    }

    public function user() {
      return $this->belongsTo(User::class);
    }
}
