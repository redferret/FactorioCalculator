<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductionLine extends Model
{
  protected $fillable = ['name', 'items_per_second', 'user_id',
    'factory_id', 'production_line_id'];

  public function produces() {
    return $this->hasOne(Product::class);
  }

  /**
   * The inputs for this production line
   */
  public function productionLines() {
    return $this->hasMany(ProductionLine::class);
  }

  public function consumer() {
    return $this->belongsTo(ProductionLine::class);
  }

  /**
   * The assemply machine or miner for this production line
   */
  public function producer() {
    return $this->hasOne(Producer::class);
  }

  public function factory() {
    return $this->belongsTo(Factory::class);
  }

  public function user() {
    return $this->belongsTo(User::class);
  }
}
