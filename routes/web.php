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
        $product->productionLines;
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
        $product->productionLines;
        // Update inputs for this product

      }
    }
    $factory->total_items = round($totalItems, 2);
  }
  return $factories;
});

Route::get('/balance/{id}', function($id) {
  $productionLine = Auth::user()->productionLines->find($id);
  $product = $productionLine->produces; // Get the product this line produces
  if ($product != null) {
    $producer = $product->producer;
    $seconds_per_item = round($product->items_per_second / $producer->speed, 2);
    $assembly_count = ceil(($product->items_per_second * $seconds_per_item) / $product->stock_size);
    $product->desired_assembly_count = $assembly_count;
    $productionLine->produces()->save($product);

    $product->assembly_count = $assembly_count;
    $product->seconds_per_item = $seconds_per_item;
    $product->productionLines;
    // Update inputs for this product
  }

  return $productionLine;
});

Route::get('/product/{id}/productionLines', function($id){
  $product = Auth::user()->products()->find($id);
  $productionLines = $product->productionLines;
  foreach($productionLines as $productionLine) {
    $productionLine->produces;
    $productionLine->consumer;
  }
  return $productionLines;
});

Route::get('/product/{id}', function($id) {
  $product = Auth::user()->products()->find($id);
  $product->productionLines; // Get the inputs for this product
  $product->producer;
  return $product;
});
