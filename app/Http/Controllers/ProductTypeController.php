<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;

class ProductTypeController extends Controller {

  public function __construct() {
    $this->middleware('auth');
  }

  public function getAll() {
    $productTypes = Auth::user()->productTypes;
    foreach($productTypes as $type) {
      $type->products = collect($type->products)->sortBy('name')->values()->all();
    }
    return $productTypes;
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    //
  }

}
