Intro to Hapi.js
================

History and Overview
--------------------

First released in 2012, Hapi.js is a web framework for Node originally built by a team at Walmart. In his `introduction post <http://hueniverse.com/2012/12/20/hapi-a-prologue/>`__, lead developer Eran Hammer describes how it was originally built on top of the Express framework, but rapidly outgrew it and began to offer a more standardized, configurable platform. The framework has proven successful, handling Black Friday traffic for one of the largest retailers in the world with relatively low hardware requirements.

Hapi.js is not a CMS like WordPress, although it can be used to build one if you want. It is a lower-level, more general-purpose application framework, playing a role most similar to Ruby on Rails or Laravel. This means it may be different from the systems you're familiar with. However, Hapi does offer us a tremendous amount of power to write powerful applications that don't fall into the "blog" archetype, including RESTful URLs, API creation, and multi-user authenticated systems.

Setting up your first server
----------------------------

First, we must make a distinction between "servers" with regards to Node. Of course we have a physical server, consisting of hardware attached to a network. On that physical computer, however, there are also software servers, each of which may play a different role, and not all of which are web-related. For example, your computer might run a file sharing server to provide network drives, or a game server so that people can play a multiplayer game.

Unlike PHP, where your scripts are run automatically by the Apache server, in Node we have to start up new software servers as a part of our code. One Node application may run no servers, one server, or many. It is a little more difficult to manually initialize and manage our software servers, but in exchange we receive some extra power and control.

The following code sets up a very simple Hapi server on your local machine, running on port 8080::

    var hapi = require("hapi");
    var server = new hapi.Server();
    server.connection({ port: 8080 });
    server.start(function() {
      console.log("Server running!");
      console.log(server.info);
    });

    server.route({
      method: "GET",
      path: "/",
      handler: function(request, reply) {
        reply("Hello, world!");
      }
    });

If you run this script, you'll notice that it doesn't exit and return to the prompt. Instead, it prints out the server's configuration info and continues running. In order to kill the server and return to the command prompt, use Ctrl-C (regardless of operating system), just as you would in the Node REPL.

Now, visit ``localhost:8080`` in your browser to see your server at work. It should show a page reading "Hello, world!" or whatever string you decided to pass to ``reply()``.

Routing
-------

Another change from PHP that may surprise you is that there is no file that directly translates into a "page." Instead, we are registering "routes," or URL patterns, that trigger a handler function. The handler function, in turn, replies with a string, which is what gets sent to the client.

The goal of this system is to support well-structured URLs. For example, say we are creating a web application that can manage table reservations at local restaurants. Our base URL would be ``tables.biz/reservations``, which would list all restaurants available on the service. By tacking on a restaurant name or ID number, such as ``tables.biz/reservations/el-camion``, we would access the reservations for that specific restaurant. A GET to this URL would get available tables, a POST would make a reservation. Individual reservation #100 could be accessed or changed at ``tables.biz/reservations/el-camion/100``

This style of creating URLs that stand for resources in our application is known as RESTful, based on the theory of Representational State Transfer. REST is a complicated topic, but the basic principle for this kind of URL design is that it makes the system easier to consume by both users and automated services. However, in a traditional file-based PHP application, it is hard to build this kind of route: we would need a new .php file for every restaurant and every resource. In Hapi.js, we can register a single route that can handle multiple parameters very easily. Let's create a route on the server above that says hello to a particular person::

    server.route({
      method: "GET",
      path: "/{name}",
      handler: function(request, reply) {
        reply("Hello, " + request.params.name + "!");
      }
    });

Now when you visit ``localhost:8080/Thomas``, you should see "Hello, Thomas!" on the page. Hapi uses the ``{name}`` portion of the route you register, and matches it against the URL that a user requests. Any matching parameters are added to the ``request`` object that's passed to your handler function.

