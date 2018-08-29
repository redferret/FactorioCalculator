<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producer extends Model {

  protected $fillable = ['producer_type', 'speed', 'power', 'production_line_id'];

  public function productionLine() {
    return $this->belongsTo(ProductionLine::class);
  }

  public function user() {
    return $this->belongsTo(User::class);
  }
}
