@extends('trace::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('trace.name') !!}</p>
@endsection
