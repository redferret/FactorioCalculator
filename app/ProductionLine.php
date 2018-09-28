<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductionLine extends Model
{
  protected $fillable = ['name', 'items_per_second', 'user_id',
    'assembly_count', 'seconds_per_item'];

  public function product() {
    return $this->belongsToMany(Product::class, 'product_production_line');
  }

  public function producerProductionLines() {
    return $this->belongsToMany(ProductionLine::class, 'consumer_producer',
      'consumer_production_line_id', 'producer_production_line_id');
  }

  public function consumerProductionLines() {
    return $this->belongsToMany(ProductionLine::class, 'consumer_producer',
      'producer_production_line_id', 'consumer_production_line_id');
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
