## Learning Rails + Angular.js with Instagram
#### Adding Post controller, model, views and migrations

Steps:

1. Add Model: Post
2. Add Migration: Create Post Table
3. Add Post Controller
4. Add Post Controller Actions
5. Correctly render responses

In Terminal,

```
$ rails g model Post
```

In `db/migrate/xxx_create_posts.rb`,

```ruby
class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string   "title"
      t.string   "content"
      t.string   "category"

      t.timestamps null: false
    end
  end
end
```

- What do you do after adding and configuring a migration file?

In Terminal,

```
$ rails g controller posts --no-helper --no-assets
```

In `app/controllers/posts_controller.rb`,

```ruby
class PostsController < ApplicationController

  def index
    @posts = Post.all
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      # render success in Jbuilder
    else
      render json: { message: "400 Bad Request" }, status: :bad_request
    end
  end

  def update
    @post = Post.find_by_id(params[:id])

    if @post.nil?
      render json: { message: "Cannot find post" }, status: :not_found
    else
      @post.update(post_params)
    end
  end

  def show
    @post = Post.find_by_id(params[:id])
    
    if @post.nil?
      render json: { message: "Cannot find post" }, status: :not_found
    end
  end

  def destroy
    @post = Post.find_by_id(params[:id])

    if @post.nil?
      render json: { message: "Cannot find post" }, status: :not_found
    else
      if @post.destroy
        render json: { message: "Successfully deleted" }, status: :no_content
      else
        render json: { message: "Unsuccessfully deleted" }, status: :bad_request 
      end
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :category)
  end
end
```

In `app/views/posts/index.jbuilder`

```json
json.array! @posts do |post|
  json.id post.id
  json.title post.title
  json.content post.content
  json.category post.category
  json.created_at post.created_at
end
```

In `app/views/posts/show.jbuilder`

```json
json.id @post.id
json.title @post.title
json.content @post.content
json.category @post.category
```

In `app/views/posts/create.jbuilder`

```json
json.id @post.id
json.title @post.title
json.content @post.content
json.category @post.category
```

In `app/views/posts/update.jbuilder`

```json
json.id @post.id
json.title @post.title
json.content @post.content
json.category @post.category
```

- Do we need a view for `DESTROY`?
