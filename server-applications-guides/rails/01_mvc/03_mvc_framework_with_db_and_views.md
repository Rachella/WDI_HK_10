#MVC Framework With Database and Views (HTML and jBuilder/JSON)

![The flowchart](../images/mvc-simple-explained.jpg)

###The Components:

1. **User**
2. **Routes** - Point the user request to the correct controller
3. **Controller** - Processes the user request
4. **Model** - Validates the data before querying the Database
5. **Database** - Contains all the data
4. **View** - Define response format (HTML/JSON or other formats)

####Step 1: Define your routes
Everything starts with the route, we will now create an index page for posts.

In **routes.rb**,

```ruby
Rails.application.routes.draw do
  root 'static_pages#index'
  resources :posts
end
```

This is very useful as this will help you create a RESTful API

This will give you the following routes, check them with `rake routes`

```
     Prefix Verb   URI Pattern               Controller#Action
       root GET    /                         static_pages#index
      posts GET    /posts(.:format)          posts#index
            POST   /posts(.:format)          posts#create
   new_post GET    /posts/new(.:format)      posts#new
  edit_post GET    /posts/:id/edit(.:format) posts#edit
       post GET    /posts/:id(.:format)      posts#show
            PATCH  /posts/:id(.:format)      posts#update
            PUT    /posts/:id(.:format)      posts#update
            DELETE /posts/:id(.:format)      posts#destroy
```

Another way, if you prefer, is typing all these out one by one like this (not recommended):

```ruby
get '/posts', to: 'posts#index'
post '/posts', to: 'posts#create'
#and so on
```

###Step 2: Create a controller for `posts`
In iTerm, create controller for **posts** with `rails generate controller posts --no-helper --no-assets --no-controller-specs` in the Terminal.

```
      create  app/controllers/posts_controller.rb
      invoke  erb
      create    app/views/posts
```

Notice that `posts` for controller generators are plural.

###Step 3: Creating an action called `index` for the `posts` controller
In the controller we just created, add the **index action**

```ruby
class PostsController < ApplicationController
  def index

  end
end
```

###Step 4: Defining the `index` action
Inside the **index action**, add

```ruby
class PostsController < ApplicationController
  def index
    @posts = Post.all # retrieve all the Post data, and store them in the variable @posts
  end
end
```

Here we are trying to create a variable that can be **accessed** by the view. Remember, any variable with **"@"** in the front can be access by the view.

###Step 5: Creating the HTML view file for `index` action
Create a file **index.html.erb** for **posts controller** in `app > views > posts`

Remember, almost every action should have a **action_name.html.erb**

###Step 6: Defining the HTML view file for `index` action
Edit the **index.html.erb** we created for **posts controller**

```html
<h1>List of all Comments</h1>

<% @posts.each do |post| %>
  <div>
    <%= post.id %>
    <%= post.title %>
    <%= post.content %>
    <%= post.created_at %>
  </div>
<% end %>
```

Basically the code with the `=` sign will try to print out the variable specified while the code without the `=` sign will simply run the logic.

###Step 7: Start server and try it out!
Start the server if you havn't already (hint: run `rails s`), then go to `localhost:3000/posts`

Bravo! You have just used the whole MVC model!!!!

###Step 8: Change HTML view file to JSON view file

Change the filename of **index.html.erb** to **index.jbuilder**

```js
json.array! @posts do |post|
  json.title post.title
  json.content post.content
  json.category post.category
  json.created_at post.created_at
end
```

What is jBuilder?
- jBuilder is a Ruby gem (library) that helps you build view files in JSON format
