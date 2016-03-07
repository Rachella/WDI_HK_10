#Rails and AngularJS Default Paths

In **app/views/application.html.erb**
```html
<!DOCTYPE html>
<html ng-app="app">
<head>
  <!-- ... -->

  <base href="/">
</head>
<body ng-view>
</body>
</html>
```

In **config/routes.rb**
```ruby
Rails.application.routes.draw do
  # ...

  get '/*path' => 'static_pages#index'
end
```