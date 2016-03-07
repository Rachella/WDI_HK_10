#MVC Framework With Full CRUD

![The flowchart](../images/mvc-simple-explained.jpg)

###The Components:

1. **User**
2. **Routes** - Point the user request to the correct controller
3. **Controller** - Processes the user request
4. **Model** - Validates the data before querying the Database
5. **Database** - Contains all the data
4. **View** - Define response format (HTML/JSON or other formats)

####Step 1: Add the `create` method in the `posts` controller
- We define a method for the POST endpoint for creating posts `http://localhost:3000/posts`
- We constraints the params using http://apidock.com/rails/ActionController/Parameters/permit

**posts_controller.rb** in `app > controllers`

```ruby
class PostsController < ApplicationController
  # ...

  def create
    @post = Post.new(post_params)

    @post.save
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :category)
  end
end
```

####Step 2: Disable CSRF protection when request is made through JSOn
- `protect_from_forgery` protects CRSF attacked.
- We want to disable it when the request is made through JSON

**application_controller.rb** in `app > controllers`

```ruby
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery unless: -> { request.format.json? }
end
```

####Step 3: Render JSON response for `create`
- When a `post` entry is sucessfully created, render the new `post` object in JSON.

**create.jbuilder** in `app > views > posts`

```js
json.title @post.title
json.content @post.content
json.category @post.category
```

####Step 4: Test `create`
In Postman, make a **POST** request to `http://localhost:3000/posts` with the necessary parameters

How do you know what url you should make the request to? Recall the following by `rake routes`

```
     Prefix Verb   URI Pattern               Controller#Action
      posts GET    /posts(.:format)          posts#index
            POST   /posts(.:format)          posts#create
   new_post GET    /posts/new(.:format)      posts#new
  edit_post GET    /posts/:id/edit(.:format) posts#edit
       post GET    /posts/:id(.:format)      posts#show
            PATCH  /posts/:id(.:format)      posts#update
            PUT    /posts/:id(.:format)      posts#update
            DELETE /posts/:id(.:format)      posts#destroy
```

####Step 5: Add the `update` method in the `posts` controller

```ruby
class PostsController < ApplicationController
  # ...

  def update
    @post = Post.find_by_id(params[:id])

    if @post.nil?
      render :json => {
        :message => { :message => "Cannot find post", :delete => false }
      }
    else
      @post.update(post_params)
    end
  end

  # ...
end
```

####Step 6: Render JSON response for `update`
**update.jbuilder** in `app > views > posts`

```js
json.id @post.id
json.title @post.title
json.content @post.content
json.category @post.category
```

####Step 7: Test `update`
In Postman, make a **PATCH** request to `http://localhost:3000/posts/<id>` with the necessary parameters

####Step 8: Add the `show` method in the `posts` controller

```ruby
class PostsController < ApplicationController
  # ...

  def show
    @post = Post.find_by_id(params[:id])

    if @post.nil?
      render :json => {
        :message => { :message => "Cannot find post" }
      }
    end
  end

  # ...
end
```

####Step 9: Render JSON response for `show`
**show.jbuilder** in `app > views > posts`

```js
json.id @post.id
json.title @post.title
json.content @post.content
json.category @post.category
```

####Step 10: Test `show`
In Postman, make a **GET** request to `http://localhost:3000/posts/<id>`

####Step 11: Add the `destroy` method in the `posts` controller

```ruby
class PostsController < ApplicationController
  # ...

  def destroy
    @post = Post.find_by_id(params[:id])

    if @post.nil?
      render :json => {
        :message => { :message => "Cannot find post", :delete => false }
      }
    else
      if @post.destroy
        render :json => {
          :message => { :message => "Successful", :delete => true }
        }
      else
        render :json => {
          :message => { :message => "Unsuccessful", :delete => false }
        }
      end
    end
  end

  # ...
end
```

####Step 12: Test `destroy`
In Postman, make a **DELETE** request to `http://localhost:3000/posts/<id>`