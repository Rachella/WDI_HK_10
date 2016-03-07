## Learning Rails + jQuery with Instagram

#### Associate user with posts

Steps:

1. Add associations in both `User` and `Post` model
2. Associate `User` to `Post` when creating posts with `current_user` method

In `app/models/posts.rb`,

```ruby
class Post < ActiveRecord::Base
  belongs_to :user
end
```

In `app/models/users.rb`,

```ruby
class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :posts
end
```

In `app/controllers/posts_controller.rb`,

```ruby
class PostsController < ApplicationController
  before_action :authenticate_user!

  ...

  def create
    @post = current_user.posts.new(post_params)

    ...
  end

  ...

end
```
