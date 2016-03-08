## File / Image Uploading
#### Using `paperclip` and `aws` to upload to AWS via Angular

##### 1. Install `ng-file-upload` for Angular

```
$ bower install --save ng-file-upload
```

##### 2. Include `ng-file-upload` dependencies

In `app/assets/javascripts/application.js`,

```js
...

//= require ng-file-upload/ng-file-upload.min
//= require ng-file-upload/ng-file-upload-shim.min
//= require_tree .
```

##### 3. Include `ng-file-upload` in Angular config files

In `app/assets/javascripts/angular/app.js.erb`, add **'ngFileUpload'**

```js
var app = angular.module('rails-instagram', ['ngRoute', 'ng-token-auth', 'ngFileUpload']);
```

##### 4. Configure post new controller with file upload methods

In `app/assets/javascripts/angular/controllers/posts/new.js.erb`,

```js
app.controller('PostsNewCtrl', ['$scope', '$http', 'Upload', function($scope, $http, Upload){

  var url = "<%= ENV['URL'] %>" || "http://localhost:3000/";

  $scope.post = {};
  $scope.image = {};
  $scope.form = {};

  $scope.form.create = function(){
    var data = {
      'post[title]': $scope.post.title,
      'post[content]': $scope.post.content,
      'post[category]': $scope.post.category
    };
	
    // ngFileUpload's method to upload a file
    Upload.upload({
      url: url + 'posts',
      fields: data,
      file: $scope.image.file,
      fileFormDataName: 'post[image]'
    }).success(function(response) {
        console.log(response);
    });;
  };
}]);
```

**Note:** Checkout also https://github.com/danialfarid/ng-file-upload/wiki/Rails-Example for an example on how to make `Upload.upload({..})` work nicely with rails...

##### 5. Modify template for making new post to include image upload button

In `app/assets/templates/posts/new.html`,

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

      <!-- File upload button -->
      <div class="button" ngf-select ng-model="image.file">Select File</div>
	
	   <!-- Image / file preview -->
      <img ngf-src="image.file" width="200" height="200">

      <button type="submit" class="btn btn-default">Submit</button>
    </form>
  </div>
</div>
```

##### 6. Change front-end for showing all posts with images

In `app/assets/templates/posts/index.html`,

```html
...

<div ng-repeat="post in posts track by $index">
  <img src="{{ post.image }}" width="500px" height="auto">
  
  ...
</div>

...
```
