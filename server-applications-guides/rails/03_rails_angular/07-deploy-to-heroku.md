## Learning Rails + jQuery with Instagram

- Create a new Heroku APP
- Add rails 12 factor
- Bower in Heroku
- Add postgres database to Heroku
- Push git file to Heroku
- Run migrations on heroku

Steps:

MAKE SURE YOU HAVE GIT FIRST!!!!

1. Create a new Heroku APP

  `$ heroku create [name-of-app](optional)`

2. Add rails 12 factor

  In `Gemfile`, add Heroku-recommended Gem

  ```ruby
  gem 'rails_12factor', group: :production
  ```

3. Bower in Heroku

  In Terminal, add buildpack

  ```
  $ heroku config:set BUILDPACK_URL='git://github.com/qnyp/heroku-buildpack-ruby-bower.git#run-bower'
  ```

  What is buildpack?
  - Use a custom Heroku buildpack that includes Node.js and Bower (see heroku/heroku-buildpack-ruby#67). If you vendored your components (skipping the .gitignore step above), you can skip this step and use the regular Ruby buildpack.

4. Add postgres database to Heroku

  `$ heroku addons:create heroku-postgresql:hobby-dev`

5. Push git file to Heroku

  `$ git push heroku master`

6. Run migrations on heroku

  ```
  $ heroku run rake db:migrate
  $ heroku run rake db:seed (if needed)
  ```

7. View your website

  `$ heroku open`

