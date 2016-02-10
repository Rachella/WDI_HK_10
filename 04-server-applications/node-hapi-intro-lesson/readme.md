# Node.js, NPM.js, Hapi.js

## Node.js

### What is Node.js?

[Node.js](https://nodejs.org/)® is a platform built on [Chrome's JavaScript runtime](https://code.google.com/p/v8/) for easily building fast, scalable network applications.

Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.
∏

### Install Node.js

If you're using Mac or Windows, the best way to install Node.js is to use one of the [installers from nodejs.org](https://nodejs.org/download/).

If you're using Linux, you can use the installer, or you can check [NodeSource's binary distributions](https://github.com/nodesource/distributions) to see whether or not there's a more recent version that works with your system.

We can check after installation that node is correctly installed by running:

```
  $ node -v
  v0.12.2
```

### NPM - the Node Package Manager

[NPM](https://www.npmjs.com/) comes bundled with node. NPM is a node utility that makes it super easy for JavaScript developers to share and reuse code. Think of it as an app store of useful js libraries that allow us to easily add different libraries in our projects and use them.

It will also become a good friend to avoid dealing with [dependency hell](http://en.wikipedia.org/wiki/Dependency_hell).

We can check that NPM is installed by running

```
  $ npm -v
  2.7.4
```

You can get a lot more info about NPM by going through their [Getting Started](https://docs.npmjs.com/getting-started/) guides.

## HapiJS

[Hapi](http://hapijs.com/) is a rich javascript framework for building applications and services on top of nodeJS. Hapi enables developers to focus on writing reusable application logic instead of spending time building infrastructure.

### Getting Started with HapiJS

Let build our first API using HapiJS!

#### Package.json

We should start by creating a [package.json](https://docs.npmjs.com/files/package.json), which will contain all the configuration directives for our application.

*Note: It must be actual [JSON](http://json.org), not just a JavaScript [object literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).*

'npm init' will walk you through creating a package.json file. It only covers the most common items, and tries to guess sane defaults. For our case, we only need to give it a name, for example: `hapijs`.

```
  $ npm init
```

*Notes:*

> See `npm help json` for definitive documentation on these fields and exactly what they do.
>
> Use `npm install <pkg> --save` afterwards to install a package and save it as a dependency in the package.json file.

This will generate the following `package.json`:

```json
  {
    "name": "hapijs",
    "version": "1.0.0",
    "description": "This is a sample project using HapiJS to build an API",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC"
  }
```

### Install Hapi

To install hapi into our `node_modules` directory, we run `npm install hapi --save`. Please note that this will also add hapi to your package.json dependencies,

```
  $ npm install hapi --save

  npm WARN package.json hapijs@1.0.0 No repository field.
  npm WARN package.json hapijs@1.0.0 No README data
  hapi@8.4.0 node_modules/hapi
  ├── cryptiles@2.0.4
  ├── peekaboo@1.0.0
  ├── ammo@1.0.0
  ├── topo@1.0.2
  ├── accept@1.0.0
  ├── items@1.1.0
  ├── kilt@1.1.1
  ├── catbox-memory@1.1.1
  ├── call@2.0.1
  ├── qs@2.4.0
  ├── shot@1.4.2
  ├── boom@2.6.1
  ├── iron@2.1.2
  ├── wreck@5.2.0
  ├── hoek@2.11.1
  ├── catbox@4.2.2
  ├── mimos@2.0.2 (mime-db@1.7.0)
  ├── inert@2.1.4 (lru-cache@2.5.0)
  ├── subtext@1.0.2 (content@1.0.1, pez@1.0.0)
  ├── h2o2@4.0.0 (joi@5.1.0)
  ├── heavy@3.0.0 (joi@5.1.0)
  ├── joi@6.0.8 (isemail@1.1.1, moment@2.9.0)
  ├── vision@2.0.0 (joi@5.1.0)
  └── statehood@2.0.0 (joi@5.1.0)
```

And our `package.json` file should now contain information about the dependencies of our project (just hapi for now):

```
  {
    "name": "hapijs",

    ... other stuff ...

    "dependencies": {
      "hapi": "^8.4.0"
    }
  }
```

## Hapi Server

Now we need to create the server! For that it will be as simple as creating an `index.js` file at the root of our project. This file will contain our application code and will be run by node.js.

### Index.js

Hapi follows the [CommonJS module system](http://nodejs.org/docs/v0.4.1/api/modules.html) convention to require libraries. Easy enough!

```js
  var Hapi = require('hapi');
```

Now we should be able to call the Hapi object to create a [Hapi Server](http://hapijs.com/api#server).

```js
  var server = new Hapi.Server();
```

Now that we have a Hapi Server, we will have to add the [connection](http://hapijs.com/api#serverconnectionoptions) properties by passing a hash with the configuration options.

We would have to configure the server with a [host](http://en.wikipedia.org/wiki/Host_(network)) and a [port](http://en.wikipedia.org/wiki/Port_(computer_networking)). In our case, we choose to have a server that will listen in our `localhost` (local computer), and in the `port` 8000.

```js
  server.connection({
      host: 'localhost',
      port: 8000
  });
```

#### Adding a Routes

In order for our server to understand how to handle requests, we need to set up the concept of [routes](http://hapijs.com/api#serverrouteoptions). Routes is the way hapi.js understands requests.

It does it by setting up **routes**, whose responsibility is to map [HTTP Methods](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) and URLs (paths), to a handler function that will return whatever we want to return.

The `handler function` takes two parameters, one containing the `request` we receive, and another one with the `reply` our server will send back. For now, Hapi will help us to send back a good old `hello world!` :)

```js
  // Add the route
  server.route({
      method: 'GET',
      path:'/hello',
      handler: function (request, reply) {
         reply('hello world');
      }
  });
```
And of course, we need to start the party so that our already configured server will run!

```js
  server.start();
```

### Launching Server

Launch the application by running:

```
  $ node .
```

and then we can open [localhost:8000/hello](http://localhost:8000/hello) in your browser and give yourself a pat in the back for successfully running your first Hapi JS Server!

*Note: Since we have configured our `path` to contains `/hello` we need to put that in our URL or our Hapi Server would NOT know what to do and just return a [404 HTTP Error Code Message](http://en.wikipedia.org/wiki/HTTP_404)*
