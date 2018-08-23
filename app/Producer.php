<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producer extends Model {

  protected $fillable = ['is_miner', 'speed', 'power', 'production_line_id'];

  public function product() {
    return $this->belongsTo(ProductionLine::class);
  }
}
