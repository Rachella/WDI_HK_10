#Instagram with Rails and AngularJS (Comments)

####Step 1: Add `post_id` to the `user` table
`$ rails g migration AddUserIdToPosts user_id:integer`

`$ rake db:migrate`

####Step 2: Add associations between `user` and `post` model
In **app/models/user.rb**
```ruby
class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :posts
end
```

In **app/models/post.rb**
```ruby
class Post < ActiveRecord::Base
  belongs_to :user
end
```

####Step 3: Add `comment` model and migration for the database

`$ rails g model comment`

In **db/migrate/xxxx_create_comments.rb**
```ruby
class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :post_id
      t.integer :user_id
      t.text :content
      
      t.timestamps null: false
    end
  end
end

```

####Step 4: Add associations between `user`, `post` and `comment` model
In **app/models/post.rb**
```ruby
class Post < ActiveRecord::Base
  belongs_to :user
  has_many :comments
end
```

In **app/models/comment.rb**
```ruby
class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :post
end
```

In **app/models/user.rb**
```ruby
class User < ActiveRecord::Base
  # ...

  has_many :posts
  has_many :comments
end
```

####Step 5: Add `comments` routes
In **config/routes.rb**
```ruby
Rails.application.routes.draw do
  # ...

  resources :comments
end
```

####Step 6: Create `comments` controller with the `create` method

`$ rails g controller comments`

In **app/controllers/comments_controller.rb**
```ruby
class CommentsController < ApplicationController
  def create
    @post = current_user.comments.new(comment_params)

    if @post.save
      render :json => {
        :message => { :message => "Successful", :saved => true }
      }
    else
      render :json => {
        :message => { :message => "Unsuccessful", :saved => false }
      }
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :post_id)
  end
end

```

####Step 7: Eager loading `comments` in every single `post`

In **app/controllers/posts_controllers.rb**
```ruby
class PostsController < ApplicationController
  # ...

  def index
    @posts = Post.includes(:comments)
  end

  # ...
```

####Step 7: Modify `posts#index` jbuilder view with eager loading comments

In **app/views/posts/index.jbuilder**
```js
json.array! @posts do |post|
  json.id post.id
  json.title post.title
  json.content post.content
  json.category post.category
  json.created_at post.created_at

  json.comments post.comments do |comment|
    json.content comment.content
    json.user_id comment.user_id
    json.created_at comment.created_at
  end
end
```

####Step 8: Modify `posts#index` Angular controller to make new comments for each post

In **app/assets/javascripts/angular/posts/index.js.erb**
```js
app.controller('PostsIndexCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){

  var url = "<%= ENV['URL'] %>" || "http://localhost:3000/";

  $http.get(url + '/posts').success(function(response){
    console.log(response);
    $scope.posts = response;
  });

  $scope.form = {};

  $scope.form.create = function(post_id, index){
    var data = {
      comment: {
        content: $scope.posts[index].new_comment.content,
        post_id: post_id
      }
    };

    $http.post(url + '/comments', data).success(function(response){
      console.log(response);

      $scope.posts[index].comments.push(data.comment);
    });
  };
}]);
```

####Step 8: Modify `posts#index` Angular template to make new comments for each post

In **app/assets/templates/posts/index.html**
```html
<div ng-repeat="post in posts track by $index">
  <div class="page-header">
    {{ post.title }}
    {{ post.content }}
    {{ post.category }}
    <small>
      {{ post.created_at | date }}
    </small>
  </div>

  <ul class="list-group">
    <li class="list-group-item" ng-repeat="comment in post.comments">
      <div>
        {{ comment.content }}
      </div>
      <small>
        {{ comment.created_at | date }}
      </small>
    </li>

    <li class="list-group-item">
      <form ng-submit="form.create(post.id, $index)">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Your comment" ng-model="post.new_comment.content">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
    </li>
  </ul>
</div>
```

