<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();

Route::get('/', 'HomeController@index')->name('home');

Route::get('/factories/{id}', function($id){
  $factories = App\User::find($id)->factories;
  foreach($factories as $factory) {
    foreach($factory->productionLines as $productionLine) {
      $productionLine->produces; // Get the product this line produces
    }
  }
  return $factories;
});

Route::get('/factories', function(){
  $factories = Auth::user()->factories;
  foreach($factories as $factory) {
    foreach($factory->productionLines as $productionLine) {
      $productionLine->produces; // Get the product this line produces
    }
  }
  return $factories;
});

Route::get('/product/{id}', function($id) {
  $product = Auth::user()->products()->find($id);
  $product->products; // Get the inputs for this product
  return $product;
});

