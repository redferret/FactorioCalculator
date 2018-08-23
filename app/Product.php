<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['crafting_time', 'name', 'user_id',
        'production_line_id', 'desired_assembly_count',
        'items_per_second', 'stock_size', 'consumption_count', 'hardness'];

    /**
     * The production line that produces this product
     */
    public function productionLine() {
      return $this->belongsTo(ProductionLine::class);
    }

    public function user() {
      return $this->belongsTo(User::class);
    }
}
