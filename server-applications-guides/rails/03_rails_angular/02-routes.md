## Learning Rails + Angular.js with Instagram
#### Adding Routes

Steps:

1. Configure routes
2. Check routes
3. Add the home page with `static_pages#index`
  - Add `static_pages` controller
  - Add `index` action
  - Add `index` view

In `config/routes.rb`,

```ruby
Rails.application.routes.draw do
  root 'static_pages#index'

  resources :posts
end
```

In Terminal,

```
$ rake routes
```

```
                  Prefix Verb   URI Pattern   Controller#Action
                    root GET    /                                      static_pages#index
                   posts GET    /posts(.:format)                       posts#index
                         POST   /posts(.:format)                       posts#create
                new_post GET    /posts/new(.:format)                   posts#new
               edit_post GET    /posts/:id/edit(.:format)              posts#edit
                    post GET    /posts/:id(.:format)                   posts#show
                         PATCH  /posts/:id(.:format)                   posts#update
                         PUT    /posts/:id(.:format)                   posts#update
                         DELETE /posts/:id(.:format)                   posts#destroy
```

- Create `static_pages` controller
- Add `index` action in `static_pages` controller
- Add the view `index.html` in `app/views/static_pages`
