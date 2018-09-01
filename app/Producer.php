<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producer extends Model {

  protected $fillable = ['producer_type', 'image_file', 'speed',
    'power', 'production_line_id', 'process', 'name'];

  public function productionLine() {
    return $this->belongsTo(ProductionLine::class);
  }

  public function processes() {
    return $this->hasMany(Process::class);
  }

  public function user() {
    return $this->belongsTo(User::class);
  }
}
