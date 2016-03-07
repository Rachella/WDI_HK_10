#Instagram with Rails and AngularJS (Posts)

####Step 1: Configure AngularJS routes

In **app/assets/javascripts/app.js.erb**
```js
'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
    // ...
    when('/posts', {
      templateUrl: "<%= asset_path('posts/index.html') %>",
      controller: 'PostsIndexCtrl'
    }).
    when('/posts/:id', {
      templateUrl: "<%= asset_path('posts/show.html') %>",
      controller: 'PostsShowCtrl'
    }).
    when('/new_posts', {
      templateUrl: "<%= asset_path('posts/new.html') %>",
      controller: 'PostsNewCtrl'
    })
}]);

```

####Step 2: Add `posts#index` controller in AngularJS

In **app/assets/javascripts/angular/controllers/posts/index.js.erb**
```js
app.controller('PostsIndexCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){

  var url = "<%= ENV['URL'] %>" || "http://localhost:3000/";

  $http.get(url + '/posts').success(function(response){
    console.log(response);
    $scope.posts = response;
  });
}]);
```

####Step 3: Add `posts#index` HTML template in AngularJS

In **app/assets/templates/posts/index.html**
```html
<div class="container-fluid">
  <div class="row">
    <div ng-repeat="post in posts track by $index">
      <div class="page-header">
        {{ post.title }}
        {{ post.content }}
        {{ post.category }}
        <small>
          {{ post.created_at | date }}
        </small>
      </div>
    </div>
  </div>
</div>
```

####Step 4: Add `posts#show` controller in AngularJS

In **app/assets/javascripts/angular/controllers/posts/show.js.erb**
```js
app.controller('PostsShowCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){

  var url = "<%= ENV['URL'] %>" || "http://localhost:3000/";

  $http.get(url + '/posts/' + $routeParams.id).success(function(response){
    $scope.post = response;
  });
}]);
```

####Step 5: Add `posts#show` HTML template in AngularJS

In **app/assets/templates/posts/show.html**
```html
<div class="container">
  <div class="row">
    <h1>Show One Post</h1>

    <h4>Title: {{ post.title }}</h4>
    <h4>Content: {{ post.content }}</h4>
    <h4>Category: {{ post.category ? post.category : 'null' }}</h4>
  </div>
</div>
```

####Step 6: Add `posts#new` controller in AngularJS

In **app/assets/javascripts/angular/controllers/posts/new.js.erb**
```js
app.controller('PostsNewCtrl', ['$scope', '$http', function($scope, $http){

  var url = "<%= ENV['URL'] %>" || "http://localhost:3000/";
    
  $scope.post = {};
  $scope.form = {};

  $scope.form.create = function(){
    var data = {
      post: $scope.post
    };

    $http.post(url + '/posts', data).success(function(response){
      console.log(response);
    });
  };
}]);
```

####Step 7: Add `posts#new` HTML template in AngularJS

In **app/assets/templates/posts/new.html**
```html
<div class="container">
  <div class="row">
    <h1>Create A New Post</h1>

    <form ng-submit="form.create()">
      <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" placeholder="Enter title" ng-model="post.title">
      </div>
      <div class="form-group">
        <label>Content</label>
        <input type="text" class="form-control" placeholder="Enter content" ng-model="post.content">
      </div>
      <div class="form-group">
        <label>Category</label>
        <input type="text" class="form-control" placeholder="Enter category" ng-model="post.category">
      </div>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
  </div>
</div>
```