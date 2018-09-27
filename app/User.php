<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable {
  use Notifiable;

  /**
   * Send the password reset notification.
   *
   * @param  string  $token
   * @return void
   */
  public function sendPasswordResetNotification($token) {
      $this->notify(new App\Notifications\MailResetPasswordNotification($token));
  }

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'name', 'email', 'password',
  ];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
      'password', 'remember_token',
  ];

  public function factories() {
    return $this->hasMany(Factory::class);
  }

  public function products() {
    return $this->hasMany(Product::class);
  }

  public function producers() {
    return $this->hasMany(Producer::class);
  }

  public function productionLines() {
    return $this->hasMany(ProductionLine::class);
  }

  public function productTypes() {
    return $this->hasMany(ProductType::class);
  }

}
