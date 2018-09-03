<?php

namespace App\Http\Controllers;

use App\Utility;
use Auth;
use Illuminate\Http\Request;

class FactoryController extends Controller {

  public function __construct() {
    $this->middleware('auth');
  }

  public function getAll() {
    return Utility::getAllFactories();
  }

  public function getFactory($id) {
    $factory = Auth::user()->factories()->find($id);
    $totalItems = 0;
    foreach($factory->productionLines as $productionLine) {
      Utility::update($productionLine);
      // If this production line is an output
      if ($productionLine->consumerProductionLines()->first() == null) {
        $totalItems += $productionLine->items_per_second;
        $productionLine->is_output = true;
      } else {
        $productionLine->is_output = false;
      }
    }
    $factory->total_items = round($totalItems);

    return $factory;
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $newFactory = Factory::create($request->all());
    Auth::user()->factories()->save($newFactory);
    return $newFactory;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    $factory = Auth::user()->factories()->find($id);
    if ($factory != null) {
      $factory->fill($request->all());
      $factory->save();
      return $this->getFactory($id);
    }
    return array('response'=>'Factory Not Found: id='.$id);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    $factory = Auth::user()->factories()->find($id);
    if ($factory != null) {
      $factory->delete();
      return array('response'=>'success');
    }
    return array('response'=>'failed');
  }

}
