## Learning Rails + Angular.js with Instagram
#### Initial Setup

Steps:

1. Generate Rails app
2. Configure Gemfile
3. Configure database.yml

In Terminal,

```
$ rails new rails-instagram -BT
```

In `Gemfile`,

```ruby
source 'https://rubygems.org'

ruby '2.2.2'
gem 'rails', '4.2.3'

gem 'pg'
gem 'jbuilder', '~> 2.0'
gem 'uglifier', '>= 1.3.0'
gem 'unicorn'
# gem 'bcrypt', '~> 3.1.7'
# gem 'active_hash'

group :development do
  gem "web-console"
  gem "better_errors"
  gem "binding_of_caller"
end

group :development, :test do
  gem "awesome_print"
  gem "bundler-audit", require: false
  gem "byebug"
  gem "dotenv-rails"
  gem "factory_girl_rails"
  gem "pry-rails"
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

# TODO Comment out these rules if you are OK with secrets being uploaded to the repo
config/initializers/secret_token.rb
config/secrets.yml

## Environment normalisation:
/.bundle
/vendor/bundle

# Ignore environment settings
.env

.DS_Store
```

In `config/database.yml`,

```yaml
default: &default
  adapter: postgresql
  host: localhost
  port: 5432
  pool: 5
  timeout: 5000

development:
  <<: *default
  database: rails_instagram_development

# Warning: The database defined as "test" will be erased and
# re-generated from your development database when you run "rake".
# Do not set this db to the same as development or production.
test:
  <<: *default
  database: rails_instagram_test

production:
  <<: *default
  database: db/production.sqlite3
```

- What do you do after configuring database.yml? Do the databases exist yet?
- How do you start the server to see if things are working?
