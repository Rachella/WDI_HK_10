  #Model Validations

![The flowchart](../images/mvc-simple-explained.jpg)

####Sample Validations for Posts

```ruby
class Post < ActiveRecord::Base
  validates :title, :length => { maximum: 140 }, :presence => true
  validates :content, :length => { maximum: 140 }, :allow_blank => true

  validate :spam_free
  validate :post_count

  private

  def post_count
    count = Post.count
    if count > 20
      self.errors.add(:base, "Cannot posts more than 20 posts")
    end
  end

  def spam_free
    # order all the posts reverse chronologically
    # get the posted time for the latest post
    last_post = Post.order(:created_at).last

    # goal: the user can only post after 1 minute
    if Post.any? and last_post.created_at > 1.minute.ago
      # if this is true, the last post was made in less 1 minute ago, so please raise an error
      self.errors.add(:base, "Cannot post within 1 minute")
    end
  end
end
```