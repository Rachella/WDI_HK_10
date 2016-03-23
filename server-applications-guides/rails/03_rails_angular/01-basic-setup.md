## Learning Rails + jQuery with Instagram

#### Initial Setup

Steps:

1. Generate Rails app
2. Configure Gemfile
3. Configure database.yml

In Terminal,

```
$ rails new rails-instagram -BT -d postgresql --skip-turbolinks
```

In `Gemfile`,

```ruby
source 'https://rubygems.org'

ruby '2.2.2' # change the version if needed
gem 'rails', '4.2.3' # change the version if needed

gem 'pg'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'

gem 'jquery-rails'
gem 'jbuilder', '~> 2.0'
gem 'unicorn'

group :development do
  gem "web-console"
  gem "better_errors"
  gem "binding_of_caller"
end

group :development, :test do
  gem "awesome_print"
  gem "bundler-audit", require: false
  gem "byebug"
  gem "pry-rails"
  gem "dotenv-rails"
  gem "factory_girl_rails"
  gem "rspec-rails", "~> 3.0"
end
```

- What do you usually do after modifying the Gemfile?

In `.gitignore`,

```ruby
*.rbc
capybara-*.html
.rspec
/log
/tmp
/db/*.sqlite3
/db/*.sqlite3-journal
/public/system
/coverage/
/spec/tmp
**.orig
rerun.txt
pickle-email-*.html

## Environment normalisation:
/.bundle
/vendor/bundle

# Ignore environment settings
.env

.DS_Store
```

- How do you start the server to see if things are working?
