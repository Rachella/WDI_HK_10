## Learning Rails + Angular.js with Instagram
#### Require Authenticated User to do actions on the app

- To require authenticated user on the app, add the following Devise method in any controller

```ruby
class PostsController < ApplicationController
  before_action :authenticate_user!

  ...
end
```
