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
    $totalItems = 0;
    foreach($factory->productionLines as $productionLine) {
      $product = $productionLine->produces; // Get the product this line produces
      if ($product != null) {
        $totalItems += $product->items_per_second;
        $producer = $product->producer;
        $product->seconds_per_item = round($product->items_per_second / $producer->speed, 2);
        $product->assembly_count = round(($product->items_per_second * $product->seconds_per_item) / $product->stock_size, 2);
        $product->products;
        // Update inputs for this product
        
      }
    }
    $factory->total_items = round($totalItems, 2);
  }
  return $factories;
});

function updateDependents(App\Product $parent) {
  foreach($parent->products as $input) {
    $input->items_per_second;
  }
}

Route::get('/factories', function(){
  $factories = Auth::user()->factories;
  foreach($factories as $factory) {
    $totalItems = 0;
    foreach($factory->productionLines as $productionLine) {
      $product = $productionLine->produces; // Get the product this line produces
      if ($product != null) {
        $totalItems += $product->items_per_second;
        $producer = $product->producer;
        $product->seconds_per_item = round($product->items_per_second / $producer->speed, 2);
        $product->assembly_count = round(($product->items_per_second * $product->seconds_per_item) / $product->stock_size, 2);
        $product->products;
        // Update inputs for this product
        
      }
    }
    $factory->total_items = round($totalItems, 2);
  }
  return $factories;
});

Route::get('/balance', function() {
  return array('message'=>'success');
});

Route::get('/product/{id}', function($id) {
  $product = Auth::user()->products()->find($id);
  $product->products; // Get the inputs for this product
  return $product;
});

