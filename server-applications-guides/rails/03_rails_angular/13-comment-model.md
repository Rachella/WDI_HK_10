## Learning Rails + Angular.js with Instagram
#### Add Comment model and associations

Steps:

1. Add Model: Comment
2. Add Migration: Create Comment Table
3. Associate `Comment` with `User` and `Post`

In Terminal,

```
$ rails g model Comment
```

In `db/migrate/xxx_create_comment.rb`,

```ruby
class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :post_id
      t.text :content

      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
```

- What do you do after adding and configuring a migration file?

In `app/models/comment.rb`,

```ruby
  ...

  belongs_to :user
  belongs_to :post

  ...
```

In `app/models/user.rb`,

```ruby
  ...

  has_many :comments

  ...
```

In `app/models/post.rb`,

```ruby
  ...

  has_many :comments

  ...
```
