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

Route::get('/product/{id}/productionlines', 'ProductController@getProductionLines');
Route::get('/products', 'ProductController@getAll');
Route::resource('products', 'ProductController')->only([
  'store', 'update', 'destroy'
]);

Route::get('/factories', 'FactoryController@getAll');
Route::resource('factories', 'FactoryController')->only([
  'store', 'update', 'destroy'
]);

Route::post('/productionline/{id}/recalculate', 'ProductionLineController@recalculate');
Route::get('/productionline/{id}/balance', 'ProductionLineController@balance');
Route::resource('productionlines', 'ProductionLineController')->only([
  'store', 'update', 'destroy'
]);
