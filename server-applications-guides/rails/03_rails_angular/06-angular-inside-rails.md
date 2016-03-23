## Learning Rails + Angular.js with Instagram
#### Adding Bower to Rails

What is Angular.js?
- `Angular.js` is a structural framework for dynamic web apps. It lets you use HTML as your template language and lets you extend HTML's syntax to express your application's components clearly and succinctly. Angular's data binding and dependency injection eliminate much of the code you would otherwise have to write.
- https://docs.angularjs.org/guide/introduction

Steps:

1. Install Angular using Bower
2. Use Angular in Rails. Add Angular dependencies in `app/assets/javascripts/application.js`
3. Configure `application.html.erb` to make sure that our app is a "one-page app"
4. Configure Angular.js routes and dependencies
5. Add `localhost:3000/#/` route
6. Add Angular controller `StaticPagesCtrl`
7. Add Angular view for `localhost:3000/#/`

In Terminal,

```
$ bower install --save angular
$ bower install --save angular-route
```

Check `bower.json` to make sure both `angular` and `angular-route` are in the dependencies

```js
{
  "name" : "rails-instagram",
  "version": "0.1",
  "dependencies": {
    "angular": "*",
    "angular-route": "~1.4.4"
  }
}
```

In `app/assets/javascripts/application.js`, add before `//= require_tree .`

```js
//= require angular/angular
//= require angular-route/angular-route

...

//= require_tree .
```

In `app/views/layouts/application.html.erb`, add `ng-app` and `ng-view` in `application.html.erb`

```html
<!DOCTYPE html>
<html ng-app="rails-instagram">
<head>
  ...
</head>
<body ng-view>
  <%= yield %>
</body>
</html>
```

- Configure AngularJS routes and dependencies

In `app/assets/javascripts/angular/app.js.erb`, define all Angular dependencies and routes

```js
'use strict'; // Make sure you don't have syntax errors

// var app = angular.module('appName', ['oneDependency']);
var app = angular.module('rails-instagram', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  // Configure Angular Routes
  $routeProvider.
    when('/', {
      templateUrl: "<%= asset_path('static_pages/index.html') %>",
      controller: 'StaticPagesCtrl'
    })
}]);
```

In `app/assets/javascripts/angular/controllers/static_pages.js.erb`, define the StaticPagesCtrl (controller) in AngularJS

```js
// Note: you have to duplicate $scope in 2 places to make it work
app.controller('StaticPagesCtrl', ['$scope', function($scope){
  $scope.message = "Hello World!";
}]);
```

In `app/assets/templates/static_pages/index.html`, define the `static_pages/index.html` (view) in AngularJS

```html
<div class="container">
  <div class="row">
    <h1> {{ message }} </h1>
  </div>
</div>
```

Go to [http://localhost:3000/#/](http://localhost:3000/#/)
