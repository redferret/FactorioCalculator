<?php

namespace App;

use Orchestra\Parser\Xml\Facade as XmlParser;

class AppBuilder {

  private $user;

  public function __construct($user) {
    $this->user = $user;
  }

  public function populateDatabase() {
    $this->createProductTypes();
    $this->createIntermediates();
  }

  private function createProductTypes() {
    $fileContents = \Storage::get('/builder/product-types.xml');
    $productTypes = simplexml_load_string($fileContents);
    foreach($productTypes as $productType) {
      $productTypeAttributes = array();
      foreach($productType->attributes() as $key => $value) {
        $productTypeAttributes[$key] = $value;
      }
      $newProductType = ProductType::create($productTypeAttributes);

      foreach($productType->Product as $product) {
        $productAttributes = array();
        foreach($product->attributes() as $key => $value) {
          $productAttributes[$key] = $value;
        }
        $newProduct = Product::create($productAttributes);
        $newProductType->products()->save($newProduct);
      }
    }
  }

  private function createIntermediates() {

  }

  private function createProductType($values) {
    $this->user->productTypes()->save(ProductType::create($values));
  }

  private function createProduct($values, $products) {
    $newProduct = Product::create($values);
    $this->user->products()->save($newProduct);
    foreach ($products as $inputProduct) {
      $productRequirement = ConsumerProduct::create([
        'consumer_requirement'=>$inputProduct['consumer_requirement']
      ]);
      $product = $this->user->products()->find($inputProduct['id']);
      $productRequirement->requiredProduct()->save($product);
      $newProduct->consumerProducts()->save($productRequirement);
    }
  }
}
