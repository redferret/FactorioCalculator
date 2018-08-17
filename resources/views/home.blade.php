@extends('layouts.app')

@section('content')
<div class="container">
  <div class="row justify-content-center">
    <div>
      <!-- Entry Point for ReactJS -->
      <div id='root' url='{{url('/')}}'></div>
    </div>
  </div>
</div>
</div>
@endsection
