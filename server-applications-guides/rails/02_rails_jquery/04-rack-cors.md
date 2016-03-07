## Learning Rails + jQuery with Instagram

#### Configuring CORS to protect from CRSF

Steps:

1. Add Gem: [Rack Cors](https://github.com/cyu/rack-cors)
2. Disable `protect_from_forgery`
3. Add CORS Policy in `config/application.rb`

#### What is CORS and CSRF?
- Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts, JavaScript, etc.) on a web page to be requested from another domain outside the domain from which the resource originated.
- Cross-Site Request Forgery (CSRF) is a type of attack that occurs when a malicious Web site, email, blog, instant message, or program causes a user's Web browser to perform an unwanted action on a trusted site for which the user is currently authenticated.
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
- https://news.ycombinator.com/item?id=4463207

In Gemfile,

```ruby
...

gem 'rack-cors', :require => 'rack/cors'

...
```

- What do you do after modifying Gemfile?

In `app/controllers/application_controller.rb`

```ruby
# Comment Out Forgery Protection
# protect_from_forgery with: :exception
```

In `config/application.rb`

```ruby
module RailsInstagram
  class Application < Rails::Application
    ...

    config.middleware.insert_before 0, "Rack::Cors" do
      allow do
        origins '*' # Control the domains
        resource '*', :headers => :any, :methods => [:get, :post, :options, :put, :patch, :delete] # Control the resources
      end
    end
  end
end
```
