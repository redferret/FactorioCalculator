<?php

namespace App;

use Orchestra\Parser\Xml\Facade as XmlParser;

class AppBuilder {

  public function __construct() {

  }

  public function populateDatabase() {
    $this->createProducts();
    $this->createProducers();
    $this->createProductTypes();
  }

  private function createProducts() {
    $fileContents = \Storage::get('/builder/products.xml');
    $products = simplexml_load_string($fileContents);

    // Define all the products first
    foreach($products as $product) {
      $productAttributes = array();
      foreach($product->attributes() as $key => $value) {
        $productAttributes[$key] = $value;
      }
      $newProduct = Product::create($productAttributes);
    }

    // Next, link each dependent to each product
    foreach($products as $product) {
      $consumerProduct = Product::where('name', $product->attributes()['name'])->first();
      foreach($product->Inputs as $input) {
        foreach($input->Product as $inputProduct) {
          $requiredProduct = Product::where('name', $inputProduct->attributes()['name'])->first();
          if ($requiredProduct != null) {
            $productRequirement = ConsumerProduct::create([
              'consumer_requirement'=>$inputProduct->attributes()['amount']
            ]);
            $productRequirement->required_product_name = $requiredProduct->name;
            $consumerProduct->consumerProducts()->save($productRequirement);
          }
        }
      }
    }
  }

  private function createProducers() {
    $fileContents = \Storage::get('/builder/producers.xml');
    $producers = simplexml_load_string($fileContents);

    foreach($producers as $producer) {
      $product = Product::where('name', $producer->attributes()['name']);
      $producerAttributes = array();
      foreach($producer->attributes() as $key => $value) {
        $producerAttributes[$key] = $value;
      }
      $producerProduct = Product::where('name', $producer->Product->attributes()['name'])->first();
      $producerAttributes['name'] = $producerProduct->name;
      $producerAttributes['image_file'] = $producerProduct->image_file;
      Producer::create($producerAttributes);
    }
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
        $newProduct = Product::where('name', $product->attributes()['name'])->first();
        if ($newProduct != null) {
          $newProductType->products()->save($newProduct);
        }
      }
    }
  }

}
