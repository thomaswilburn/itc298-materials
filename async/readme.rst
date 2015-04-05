Taming Async in Node
====================

Overview
--------

As we've discussed previously, Node performs many operations in a "non-blocking" manner: unlike in languages like PHP or Python, where the script pauses while reading a file or querying a database, in Node it continues running and handling other tasks. To be notified when the operation completes, all such operations take a callback function as their final argument. That callback receives any errors that occurs as its first argument, followed by the result or data. For example::

    //load the file system module
    var fs = require("fs");
    
    //let's read a file!
    fs.readFile("example.txt", "utf8", function(err, data) {
      //err contains any error - hopefully none!
      if (err) return console.log(err);
      
      //otherwise, the file contents will be in data
      console.log(data);
    });

This works pretty well for small sets of asynchronous processes, but as they stack up and accumulate, we end up with the dreaded "callback pyramid:" increasing numbers of nested, indented callback functions. Take, for example, this case in which we check for a directory's existence, read a file from it, change its contents, and write them to a new file::

    fs.stat("folder", function(err, stat) {
      if (err) return console.log("no such directory");
      fs.readFile("folder/example.txt", "utf8", function(err, data) {
        data += "...";
        fs.writeFile("folder/newFile.txt", data, function(err, data) {
          console.log("Write complete");
        });
      });
    });

Even worse, what if we need to process many items, say in an array, with an asynchronous process? Here we'll use the ``request`` module to fetch multiple web pages, but our loop is synchronous, so it won't complete the way we want it to::

    var pages = ["http://google.com", "http://github.com", "http://seattlecentral.edu"];
    var results = [];
    for (var i = 0; i < pages.length; i++) {
      var url = pages[i];
      request(url, function(err, response, body) {
        results.push(body);
      });
    }
    //Unfortunately, this code will run before the requests complete, so there's nothing there:
    console.log(results.length) // logs: 0

How do we handle these kinds of asynchronous dilemmas? By using the `async <https://github.com/caolan/async>`__ module, we can run functions in linear order, or process an array and wait for the final result. First we need to install it from NPM, so let's do that with the command ``npm install async --save``. Then, using the ``waterfall`` function, for example, we can run asynchronous operations in order, passing the result of the previous operation to the next using the trailing callback. Any errors will cancel the chain, so we don't need to handle them individually::

    var async = require("async");
    
    async.waterfall([
      function(next) { //does the directory exist?
        fs.stat("folder", next);
      },
      function(stat, next) { //now read the file
        fs.readFile("folder/example.txt", "utf8", next);
      },
      function(data, next) {
        data += "...";
        fs.writeFile("folder/newFile.txt", data, next);
      }
    ], function(err, result) {
      if (err) return console.log("unable to complete waterfall");
      //otherwise, we're done!
      console.log("write completed!");
    });

Using ``waterfall``, we escape the callback pyramid: even though our code runs the same way as before, it proceeds in a straightforward, linear way. But we don't have to process steps one at a time. ``async`` also offers functions that can run tasks in series, parallel, or as long as a condition is true, among other options.

Likewise, we can use the ``map`` function to process an array, but only continue once all the items are complete::

    async.map(pages, function(url, done) {
      request(url, function(err, response, body) {
        if (err) return done(err); //if any response fails, pass the error on
        done(null, body); //otherwise, error is null, and pass on the body
      });
    }, function(err, result) { //called when all are complete
      console.log(result.length); // logs: 3
    });

The ``async`` library actually provides equivalents for most of the array functions, such as ``each``, ``filter``, and ``sortBy``. As you can imagine, when almost every function call in Node is asynchronous, a library like this can save you a tremendous amount of time and energy, while also making your code shorter and easier to read.