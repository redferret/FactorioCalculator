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

    /**
     * The inputs for this product
     */
    public function productionLines() {
      return $this->hasMany(ProductionLine::class);
    }

    /**
     * The assemply machine or miner for this product
     */
    public function producer() {
      return $this->hasOne(Producer::class);
    }

    public function user() {
      return $this->belongsTo(User::class);
    }
}
