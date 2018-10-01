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

Route::delete('/producers/{id}', 'ProducerController@destroy');
Route::get('/producers', 'ProducerController@getAll');
Route::post('/producers', 'ProducerController@store');
Route::put('/producers/{id}', 'ProducerController@update');

Route::delete('/productTypes/{id}', 'ProductTypeController@destroy');
Route::get('/productTypes', 'ProductTypeController@getAll');
Route::post('/productTypes', 'ProductTypeController@store');
Route::put('/productTypes/{id}', 'ProductTypeController@update');

Route::delete('/products/{id}', 'ProductController@destroy');
Route::get('/products', 'ProductController@getAll');
Route::get('/products/noprocess', 'ProductController@getAllNotInProcess');
Route::post('/products', 'ProductController@store');
Route::put('/products/{id}', 'ProductController@update');

Route::delete('/factories/{id}', 'FactoryController@destroy');
Route::get('/factories', 'FactoryController@getAll');
Route::post('/factories', 'FactoryController@store');
Route::put('/factories/{id}', 'FactoryController@update');

Route::delete('/productionlines/{id}', 'ProductionLineController@destroy');
// Route::get('/productionlines/{id}', 'ProductionLineController@getProductionLine');
Route::get('/productionlines/recalculate', 'ProductionLineController@recalculate');
Route::get('/productionlines/{id}/inputsOutputs', 'ProductionLineController@getProductionLineInputsOutputs');
Route::get('/productionlines/{id}/requiredinputs', 'ProductionLineController@getRequiredProducts');
Route::get('/productionlines', 'ProductionLineController@getProductionLines');
Route::post('/productionlines', 'ProductionLineController@store');
Route::put('/productionlines/{id}', 'ProductionLineController@update');
Route::put('/productionlines/{id}/producer', 'ProductionLineController@updateProducer');
Route::put('/productionlines/{id}/inputs', 'ProductionLineController@editInputs');
