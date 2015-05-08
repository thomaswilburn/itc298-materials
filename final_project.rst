Final project requirements
==========================

The exact details and goals of your final project are up to you, although the sample projects are available if inspiration fails to strike. However, in the interests of not abandoning you to the wilderness, I do have three major areas in which your server should function: MVC, storage, and multi-user state.

Models, Views, and Controllers
------------------------------

We have not talked very much about MVC in this class, but that's because Hapi makes it so easy to use. Your views are literally just the view templates that you write and send with ``reply.view()``. The handlers for each route are considered your controllers, because they accept data from the browser and send data to the view. And your models are additional objects, likely stored in and accessed via Node modules, that contain the state of your application.

Although your application will naturally contain all three, it's good to be more specific. So here's a list of basic functionality I expect to see in order for your final project to be acceptable:

* It should use layouts to share navigation, header, and footer HTML between pages.
* It should use the Handlebars/Mustache templating to output data in a friendly fashion, instead of sending HTML directly to ``reply()`` or manually building strings. This includes using section tags (``{{#tag}} {{/tag}}``) to do looping/conditional blocks.
* You should maintain program and user state in a separate module, outside of the main ``index.js`` file (or whatever file you run to initialize and start the server).
* You should also minimize the amount of code inside of handlers. Whenever possible, perform complex data processing or retrieval in an external module, and call into that module from the handler.

Storage
-------

The entire point of a server, honestly, is to provide persistent storage between browsers. If we want to write applications that don't store anything, most of the time we can do that just with a static HTML page. Servers allow us to persist state between pages, and between sessions (i.e., different computers or after the browser is closed).

I am agnostic as to how you choose to store information on your server. You may do it using the file system, a database, a web API, or something. However, you must both read and write from the storage for your final project to pass muster. Below you'll find an example of how each backing store might work, as well as a recommended NPM module that you might use for it:

* *File system* - Read and write files that are stored in JSON format. Recommended module: ``fs`` (built-in, not on NPM)
* *Database* - Use SQL to create a table, read from it, and insert/delete rows based on user action, same as you would in PHP. Recommended module: ``sqlite3``, which creates small local databases without having to run a separate MySQL or Postgres server.
* *Web API* - Talk to an endpoint like Twitter or Google Docs to read and write information. Recommended module: varies by API, although the ``twitter`` module is excellent and can be used to both send and received posts from the service.

Multi-user login
----------------

I would love to see you do full, secure authentication for your application using bcrypt, as described in the Hapi documentation. However, your final project should be capable of performing simple "authentication" (possibly just selecting a user from a list, or entering a new name), persisting that login via cookies, and presenting distinct stored data based on the user. For example, a shopping list should be able to maintain lists for each user. A chat room should be able to keep track of who is who, and retain preferences for individual people.

Remember, real multi-user setup is more than just remembering the user's name. When designing the data structures and storage for your application, try to keep multiple users in mind. It may be helpful to store information under a "default" user at first, and save the actual login/multiuser code for last.