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

Route::delete('/producer/{id}', 'ProducerController@destroy');
Route::get('/producer', 'ProducerController@getAll');
Route::post('/producer', 'ProducerController@store');
Route::put('/producer/{id}', 'ProducerController@update');

Route::delete('/products/{id}', 'ProductController@destroy');
Route::get('/products', 'ProductController@getAll');
Route::post('/products', 'ProductController@store');
Route::put('/products/{id}', 'ProductController@update');

Route::delete('/factories/{id}', 'FactoryController@destroy');
Route::get('/factories', 'FactoryController@getAll');
Route::post('/factories', 'FactoryController@store');
Route::put('/factories/{id}', 'FactoryController@update');

Route::delete('/productionline/{id}', 'ProductionLineController@destroy');
Route::get('/productionline/{id}/balance', 'ProductionLineController@balance');
Route::get('/productionline/{id}/productionlines', 'ProductionLineController@getProductionLines');
Route::post('/productionline', 'ProductionLineController@store');
Route::put('/productionline/{id}', 'ProductionLineController@update');
