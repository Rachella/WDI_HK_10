## Learning Rails + Angular.js with Instagram
#### Add Comment model and associations

Steps:

1. Add Route: Comments
2. Generate Controller: Comments
3. Create comments for each post

In `config/routes.rb`,

```ruby
  resources :comments, only: :create
```

In Terminal,

```
$ rails g controller comments --no-helper --no-assets
```

In `app/controllers/comments_controller.rb`,

```ruby
class CommentsController < ApplicationController
  before_action :authenticate_user!

  def create
    @comment = current_user.comments.new(comment_params)

    if @comment.save
      render json: { message: "201 Created" }, status: :created
    else
      render json: { message: "400 Bad Request" }, status: :bad_request
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :post_id)
  end
end
```

In `app/controllers/posts_controller.rb`,

```ruby
class PostsController < ApplicationController
  before_action :authenticate_user!

  def index
    @posts = Post.includes(:comments) # retrieve all the Post data, and store them in the variable @posts
  end
end
```

In `app/views/posts/index.jbuilder`,

```js
json.array! @posts do |post|
  ...

  json.comments post.comments do |comment|
    json.content comment.content
    json.user_id comment.user_id
    json.created_at comment.created_at
  end
end
```
