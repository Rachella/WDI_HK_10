## Learning Rails + Angular.js with Instagram
#### Adding Bower to Rails

What is Bower?
- Bower is a package manager for JavaScript libraries that allows you to define, version, and retrieve your dependencies.
- We are going to separate front-end dependencies (libraries) with back-end dependencies. So, Bower (js) will manage all our front-end dependencies, and Gem (ruby) will manage all back-end dependencies

What is `bower.json`?
- `bower.json` lists out all JavaScript libraries dependencies, similar to `Gemfile` for Rails

Steps:

1. Add Gem: [Bower](https://github.com/stve/bower)
2. Install Bower Configurations
3. Configure `.bowerrc`
4. Configure `bower.json`
5. Add `bower_components` folder to `.gitignore`

In `Gemfile`,

```ruby
...

gem 'bower'

...
```

- The gem includes a generator that sets up your project:

In Terminal,

```
$ rails generate bower:install
```

- This will install a configuration file (`.bowerrc`) in your project's root. The configuration file tells bower where to install components and where it expects `bower.json`.

In `.bowerrc`, set the location where all bower components will be installed

```js
{
  "directory": "bower_components"
}
```

In `bower.json`

```js
{
  "name" : "rails-instagram",
  "version": "0.0.1",
  "dependencies": {}
} 
```

In `.gitignore`,
```
...

bower_components

...
```

-To Install all bower components, run `$ bower install`
- If you system doesn't have bower yet, you need to install bower by running `$ npm install -g bower`
