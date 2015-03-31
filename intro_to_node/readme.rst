Intro to Node
=============

Overview
--------

In 2009, Ryan Dahl released Node.js, which combined Google's V8 JavaScript engine with a set of C bindings to various system APIs. The initial purpose of this was to handle long-running file uploads: other server-side frameworks tended to treat each upload as a blocking task, meaning that a process was tied up completely until each upload finished. Node, on the other hand, almost exclusively uses "non-blocking" I/O, so it can process multiple requests while performing lengthy tasks outside of the scripting engine, such as writing to the file system or reading from the network.

Just as JavaScript itself is a conventional-looking language with a surprising heritage, Node's asynchronous nature is not entirely new: other languages and frameworks have used something similar. But few of them have had the kind of success experienced by Node. In addition to its uptake in the business community, Node has become the de-facto runtime for web development buid scripts and tooling.

REPL
----

Let's start by using the basic Read-Evaluate-Print Loop (REPL) interface to explore Node. Run the ``node`` command from your shell, which should present a ``>`` prompt. From this, you can run simple JavaScript statements, such as below::

    > 1 + 1;
    2
    > ["Hello", "world"].join(" ");
    "Hello world"
    
From this command line, you can perform any task available in JavaScript, although it's painful to work across multiple lines. You can also use the console, just as in the browser::

    > var x = "Node is awesome";
    undefined
    > console.log(x);
    "Node is awesome"

Of course, working entirely from inside the REPL is helpful, but not a good way to build large applications. Instead, we'll usually run a script from the command line. For example, place the following lines of code into a file named "index.js"::

    var text = "This space intentionally left blank.";
    console.log(text);

We can run this file by using the following command in our shell: ``node index.js``. You should see the text string output to the shell, if it was successful.

Modules
-------

In the browser, we can interface with the page using the built-in APIs, such as ``document.querySelector``. In Node, however, we don't have a page. Instead, the runtime provides an array of libraries that can be used to manipulate files, talk to other servers, and perform utility operations like encryption. These libraries are available via "modules," and loaded via the special ``require`` function. Let's try accessing the file system via the "fs" module::

    var fs = require("fs");
    
When a module is required, it can be assigned to a variable. At that point, we can access the various functions in the module via that module object. For example, the following code uses the ``writeFile`` function to create and output a new file in the current folder::

    var fs = require("fs");
    fs.writeFile("testfile.txt", "File contents here", function(err) {
      console.log("File written!");
    });

After running this script, you should see a new file in the same directory as the script, containing the contents provided. From the same module, we can also read data from the disc, list items in a directory, and even move or rename files.

In addition to the file system, Node comes with a large number of these built-in. For information on their function, please be sure to check the `API documentation <https://nodejs.org/docs/latest/api/>`__. Typically, however, we won't use these directly. Instead, we'll require libraries that are built on top of them, and written by the Node community. See the guide on NPM for more information (TK). 

Callbacks
---------

You may have noticed that in the example above, we passed a function as the last argument to ``fs.writeFile``. This function was called when the file contents had been completely written to the hard drive. During that time, however, the Node runtime is capable of handling other requests and operations. In other words, it is "non-blocking," as compared to languages like PHP or Python, which are "blocking." In those languages, while a file is being written, no other operations can take place. This makes Node well-suited to web applications, which often perform lots of slow I/O over the network.

APIs that yield to other processes while I/O occurs are called "asynchronous" (as opposed to "synchronous" operations that block progress). To keep this manageable, Node has adopted a convention for all async functions: the last argument is always a "callback" function, which will be run when the operation continues. Callbacks also follow a standard pattern. The first argument is always an optional error (or ``null`` if no error took place).

Let's put this in context. The following code reads a file that should contain a number, adds one, and then writes it back out. If, however, the file can't be read (because it doesn't exist or is locked), the process logs an error and quits::

    var fs = require("fs");
    fs.readFile("number.txt", "utf8", function(err, file) {
      //use an early return to quit on errors
      if (err) return console.log("Couldn't read file!");
      //otherwise, add one and write the file
      var added = (file * 1) + 1;
      fs.writeFile("number.txt", added, function(err) {
        //on error, let the user know
        if (err) return console.log("Couldn't write to the file!");
        //otherwise, log success
        console.log("Wrote file: ", added);
      });
    });
    
As you can see, Node programs can quickly become very deeply indented with nested callbacks. However, by writing separate functions for each stage of the process, it becomes possible to compose them more easily. The following code does not require nearly as much nesting::

    var fs = require("fs");
    
    var onRead = function(err, data) {
      if (err) return console.log("Couldn't read file");
      added = (data * 1) + 1;
      fs.writeFile("number.txt", added, onWrite);
    };
    
    var onWrite = function(err) {
      if (err) return console.log("Couldn't write file");
    }
    
    fs.readFile("number.txt", "utf8", onRead);
    
We will also learn more about how to manage deep asynchronous processes in another lecture. But for now, breaking code into multiple named will make it much easier to write Node scripts. Consider, for example a typical web request, which involves:

* Getting a page request
* Reading the page template from the hard drive
* Writing to site analytics
* Talking to a database for data
* Performing GZIP compression on the response text
* Responding to the browser
* Cleaning up once the response is complete

Clearly, learning to handle asynchronicity will be one of the most difficult (and most important) skills we'll learn in this class.