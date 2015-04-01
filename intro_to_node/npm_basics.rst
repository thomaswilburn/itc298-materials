NPM basics
==========

Overview
--------

As we've learned, Node libraries are loaded as modules using ``require()``. For example, if we want to load the URL module to look at the different parts of a web address, we would run the following code::

    var url = require("url");
    var parsed = url.parse("http://github.com/sccc");
    console.log(parsed);

We can also require other files in the same project. By adding a "." at the front of the path, we tell Node to load another file relative to our current location. So, for example, if we create one file named "index.js"::

    var greeting = require("./hello");
    greeting.say("Thomas");

...and another named "hello.js" in the same directory::

    console.log("This is the hello.js module");
    module.exports = {
      say: function(name) {
        console.log("Hello, " + name + "!");
      }
    };

Running our script should now produce the following output::

    $ node index.js
    This is the hello.js module
    Hello, Thomas!

Two things happened here that are important: first, when we loaded our secondary module from hello.js, all the code inside of it ran. Even though reading and parsing files are normally async, they're considered synchronous when you call ``require()`` for ease-of-use in Node. So any code we insert there has a chance to initialize itself before it is used by another module, but this initialization is a one-time thing.

Second, we can transfer functions and other values from one module to another using the ``module.exports`` object, which is created for us in Node. In this case, we assigned an object to this value, so that the ``say`` function would be available in index.js. However, you can assign anything to ``module.exports``, including functions, strings, numbers, and booleans. You don't have to assign anything: if you don't, the module will return ``undefined`` when it's required.

Using NPM
---------

The standard library of modules that comes with Node is powerful, but it would be painful to have to write all functionality from scratch each time that we start a Node project. Instead, it's standard to use NPM, the Node package manager, to install third-party libraries that can handle various tasks. We run NPM commands from the regular shell, not from inside Node. 

Let's get started by creating a package.json file for NPM. From your project directory, run ``npm init`` and answer the questions it gives you (or just hit enter to accept the defaults, since you can always change your answers later). At the end of the process, you should end up with a package.json file that looks something like this::

    {
      "name": "itc298-materials",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "repository": {
        "type": "git",
        "url": "https://github.com/thomaswilburn/itc298-materials.git"
      },
      "author": "",
      "license": "ISC",
      "bugs": {
        "url": "https://github.com/thomaswilburn/itc298-materials/issues"
      },
      "homepage": "https://github.com/thomaswilburn/itc298-materials"
    }

The package.json is a manifest that lists all the libraries your project uses. When we install a library, we can tell NPM to save it to the manifest. Then if someone else downloads your project and wants to install all the third-party modules required, they can do so without having to dig through and find them manually.

We'll add a dependency to see how this works. Add the Chalk library, which lets us colorize our console output, with the following shell command::

    $ npm install chalk --save

This command will create a "node_modules" folder to contain all the third-party modules you've installed. It will also add a "dependencies" list to your package.json, with Chalk as the only current item.

Once a module is installed from NPM, you can use it by requiring it the same way that you load any of the built-in libraries. In this case, we'll use it to color some output::

    var chalk = require("chalk");
    var coloredText = chalk.bgBlue.white("White on blue\n");
    coloredText += chalk.bgRed.black("Black on red");
    console.log(coloredText);

It's important to save modules to your package.json, because we don't typically check them into Git (a typical node_modules folder might include literally hundreds of thousands of files). You should also make sure that the following line is in your .gitignore file::

    **/node_modules/

NPM can install and uninstall dependencies, but it can also do a lot more. You can see all the possible actions by running ``npm`` all by itself, and use ``npm help ____`` to see the help for that particular action.

Global modules
--------------

The last usage of NPM is global installation, which we'll talk more about in class. Generally, we don't install packages globally if possible. This ensures that if one project uses version 1.0 of a library, and another uses incompatible version 2.0, they don't conflict because each has its own local copy. However, we often install some packages globally so that they become available at the command line. Let's try this out with a useful module for creating a local testing server. Run the following command in your shell::

    $ npm install http-server -g

The "-g" tells NPM to install this globally, and because the http-server package specifies a "bin" field in its package.json, it will create a new command that you can run at any time to start this module. In this case, it will start a local server in your current folder, accessible in your browser at ``localhost:8080``. Try it out::

    $ http-server
    Starting up http-server, serving ./ on port: 8080
    Hit CTRL-C to stop the server

It's actually very easy to create your own command line packages. For example, here's one that I made for generating random project codenames: `Cantrip <https://github.com/thomaswilburn/cantrip>`__. You can install this by running ``npm install thomaswilburn/cantrip -g``, and then run the ``cantrip`` command to get a random adjective-noun codename.

We will talk more about global modules when we get to the section on build tools, because many of them are written in Node and installed exactly this way. Here are a few tools that you might want to look into:

* ``http-server`` - an easy way to create a local server for static files
* ``less`` - compiles `LESS <http://lesscss.org>`__ into CSS
* ``eslint`` - checks your JavaScript code for style and programming errors