Hapi Basics
===========

Last week we set up routes in Hapi and returned templated views, in order to field HTTP requests from browsers (and other clients, but mostly browsers). This week, we're going to complete the process of setting up a fully functional web server by adding two more major components: static resource routes, and layout templates. With these, we can build any site in Hapi that you would otherwise build in PHP or another web language.

Static routes
-------------

We could, of course, build routes in Hapi that would read a file and return it::

    var async = require("async");
    var fs = require("fs");
    var path = require("path");
    
    //assume the server is already started
    server.route({
      method: "GET",
      path: "/resources/{filename*}", //asterisk means it will include subdirectories
      handler: function(req, reply) {
        fs.readFile(path.join("assets", req.params.filename), function(err, data) {
          if (err) {
            return reply("File not found").statusCode(404);
          }
          reply(data);
        });
      }
    });

Seems like kind of a hassle, though. Since serving non-template files is something that we often need to do on a web server, for CSS, JS, and media, Hapi provides a `methods for doing so easily <http://hapijs.com/tutorials/serving-files>`__. We can call ``reply.file()`` to send a single file back to the browser, but a better solution is to register a directory route, in which we simply tell Hapi where our resources are located and it takes care of the rest. Here's a simple route that exposes the ``public`` directory as ``assets``::

    server.route({
      method: "GET",
      //we must use "param" here, not another route variable name
      path: "/assets/{param*}",
      handler: {
        directory: {
          path: "public"
        }
      }
    });

Once this route is registered, you can request a file located at ``project_folder/public/X`` by visiting ``server_name/assets/X`` in your browser, and so forth. For example, if the server is running on ``localhost:8000``, we might load a CSS file at ``/public/css/style.css`` at the URL ``localhost:8000/assets/css/style.css``. By adding the ``*`` to the path, it will include subdirectories of the directory path in addition to files only in the specific folder.

Layout templates
----------------

On most web sites, the inner content changes, but the surrounding design is the same from page to page: navigation menus and other header content, site footers, and sidebars, for example. It is always bad practice to copy and paste from one place to another, whether in code or templates. On the JavaScript side, we solve this problem with modules, but how do we do so in our templates? The answer is "layouts," a Hapi feature that lets each page load a standard wrapper template, into which its view is injected.

To try this out, let's create three files in our project folder. The first is the inner template, located at ``templates/inner.html``::

    <h1>This space intentionally left {{adj}}.</h1>
    
    <p>
      This template is loaded as a view, but will be injected into the layout.

Next is the layout template, which we'll place in ``layouts/default.html``::

    <!doctype html>
    <html>
      <head>
        <title>{{title}}</title>
        <meta charset=utf8>
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
        </nav>
        <main>
          {{{content}}}
        </main>
      </body>
    </html>

Finally, we'll create our server and register routes in ``index.js``::

    var hapi = require("hapi");
    
    var server = new hapi.Server();
    server.connection({ port: 8000 });
    server.start();
    
    //set up our view system
    server.views({
      //register templates
      engines: {
        html: require("handlebars")
      },
      path: "templates",
      //let Hapi know about our layout template folder
      layoutPath: "layouts",
      layout: "default"
    });
    
    server.route({
      method: "GET",
      path: "/",
      handler: function(req, reply) {
        //we still just reply with a view
        reply.view("inner", { adj: "blank", title: "Test page" });
      });
    });

When the route is hit, our route handler tells Hapi to serve the selected view, ``inner.html``, filling in the ``{{adj}}`` tag with the word "blank". However, because we have a default layout registered in our ``server.views()`` configuration function call, the contents of that view will be injected into the layout template in the place of the  ``{{{content}}}`` tag. Additionally, the same context object that we gave to the view will also be applied to the layout template, thus filling in the ``{{title}}`` tag with "Test page".

Partials
--------

Layouts give us the ability to create multiple routes and use multiple views, while sharing the common framing elements of each page. In fact, Hapi also integrates with the Handlebars templating system to share inner elements as well, through a special kind of "partials" tag, which is composed of a ``>`` character and the name of the sub-template to include in the larger page. For example, the tag ``{{> bio}}`` includes the ``bio.html`` template into the page.

Partials are a part of the `Mustache template language <https://mustache.github.io/mustache.5.html>`__ that's implemented by Handlebars. Mustache templating also provides a number of useful functions, such as section tags that loop through an array or object or act as conditionals. Section tags are opened with a ``#`` and closed with a ``/`` character, followed by the name of the array or object property, and everything in between will be repeated for each item in the collection.

Let's try an example. We're going to feed a JavaScript object with a list of people in it to a template::

    var musicians = {
      group: "Musicians",
      people: [
        { name: "Jack White", band: "The White Stripes" },
        { name: "Karen O", band: "Yeah Yeah Yeahs" },
        { name: "Dessa", band: "Doomtree" },
        { name: "Questlove", band: "The Roots" }
      ]
    }

Here's our view template, ``partials/listings.html`` (note that it is in ``templates/partials``, a new subdirectory)::

    <section>
      <h2>{{group}}</h2>
      <ul>
      {{#people}}
        {{> person}}
      {{/people}}
      </ul>
    </section>

And here's ``person.html``::

    <li> {{name}} from {{band}}

We also need to update our server's view configuration::

    server.views({
      engines: {
        html: require("handlebars")
      },
      path: "templates",
      layoutPath: "layouts",
      layout: "default",
      //add a partials path
      partialsPath: "templates/partials"
    });

Now, in our route handler, we'll call ``reply.view("listings", musicians)``. The listings template will replace ``{{group}}`` with "Musicians", then loop through ``musicians.people``, repeating the code between ``{{#people}}`` and ``{{/people}}`` for each item in that array. In this case, it includes ``person.html`` for each item. Inside the section, the ``{{name}}`` and ``{{band}}`` tags will refer to properties on the objects in the array. The resulting template output will be::

    <section>
      <h2>Musicians</h2>
      <ul>
        <li> Jack White from The White Stripes
        <li> Karen O from Yeah Yeah Yeahs
        <li> Dessa from Doomtree
        <li> Questlove from The Roots
      </ul>
    </section>

Of course, we don't have to use partials only in section helpers. They can be useful in many other places: sidebars, widgets, repeated design elements... any time that a part of the page might be repeated or re-used. Instead of building the page from scratch each time, we can create a vocabulary of building blocks, embedded in a common wrapper template.

Homework assignment
-------------------

Combining static resources, layouts, and partials, it's possible to build any site in Hapi that would also be built in a system like WordPress. So let's put one together! Imagine that you have a hapless friend who loves to borrow books, movies, and CDs from you. You don't mind lending your stuff, but you would prefer to minimize browsing time in person, so create a website that basically inventories your shelves for your friend. It should have the following page types:

* A home page that provides a short description of the site and a welcome message.
* A list page for each media type, such as all your CDs or all your books.
* A detail page, linked from the lists, that shows the metadata for a particular item (i.e., a book's author, page count, genre, and synopsis.

Additionally, these pages should share a common layout, including navigation and CSS that's shared between pages. Consider carefully where it will be easier to use Handlebars section tags and partials, rather than repeating your code or hand-coding the content.