<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producer extends Model {

  protected $fillable = ['producer_type', 'image_file', 'speed',
    'power', 'production_line_id', 'name', 'yield'];

  public function productionLine() {
    return $this->belongsTo(ProductionLine::class);
  }

  public function processes() {
    return $this->hasMany(Process::class);
  }
}
