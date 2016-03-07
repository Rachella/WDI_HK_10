## Learning Rails + jQuery with Instagram

#### Add Configurations for Bower to work on Heroku

- To make Bower work on Heroku

Steps:

1. Add Gem: [rails_12factor](https://github.com/heroku/rails_12factor)
2. Add Heroku Buildpack for Bower

In `Gemfile`, add Heroku-recommended Gem

```ruby
# For Bower on Heroku
gem 'rails_12factor', group: :production
```

In Terminal, add buildpack

```
$ heroku config:set BUILDPACK_URL='git://github.com/qnyp/heroku-buildpack-ruby-bower.git#run-bower'
```

What is buildpack?
- Use a custom Heroku buildpack that includes Node.js and Bower (see heroku/heroku-buildpack-ruby#67). If you vendored your components (skipping the .gitignore step above), you can skip this step and use the regular Ruby buildpack.
