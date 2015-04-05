Events and Streams
==================

Event Emitters
--------------

In addition to regular callbacks, some Node objects also communicate through events. Usually, events are used instead of callbacks when the target is a long-lived object instead of simply an API function. For example, the ``http`` module lets us create servers, and then fires a ``request`` event whenever a page request comes in::

    var http = require("http");
    var server = new http.Server();
    server.listen(8080);
    
    //handle request events
    server.on("request", function(request, response) {
      response.end("Hello from port 8080!");
    });

All objects that fire events in Node use the same `EventEmitter <https://nodejs.org/docs/latest/api/events.html>`__ interface, which is similar to jQuery's event methods: it has an ``on()`` method to register for events and a ``removeListener()`` method to remove it. You can also trigger events by using the ``emit()`` method. It's possible to build our own EventEmitters, if we want. The following code creates a simple emitter and subscribes to some events::

    var events = require("events");
    
    //when our user status changes, we should let subscribers know
    var user = new events.EventEmitter();
    user.setStatus = function(status) {
      this.status = status;
      this.emit("statuschange", this.status);
    };
    
    //listen for updates
    user.on("statuschange", function(status) {
      console.log("The user is now: " + status);
    });
    
    //trigger status changes
    user.setStatus("authenticated"); // logs: "The user is now: authenticated"
    user.setStatus("admin"); //logs: "The user is now: admin"

Streams
-------

Events are often used in Node to work with Streams, which are an abstraction for long-running I/O operations. For example, if you're reading a file, using a callback means that you'll only get access once the file is completed. Using a stream, you can process it in chunks as it is read from the disk, which often means a more responsive application. Typically, a stream will emit ``readable`` events when it is ready, followed by ``data`` events as the contents become available, and finally a ``finish`` event when there's nothing more. That said, many libraries emit different events, which are available in their documentation. Streams also have ``read()`` and ``write()`` functions that are used to send data to them.

At the Seattle Times, we commonly read information in from spreadsheets for our data visualizations. The ``csv`` module from NPM exposes itself as a stream, to allow us to filter lines based on their content. In the code below, we build a filtered array of objects from a spreadsheet by reading from the CSV parser stream::

    var fs = require("fs");
    var csv = require("csv");
    var parser = csv.parse({
      columns: true //use the header row to construct objects from each following row
    });
    
    var sheet = [];
    
    parser.on("data", function(line) {
      //check that this line does not have the "exclude" column checked
      if (line.exclude) return;
      //otherwise, add it to our sheet array
      sheet.push(line);
    });
    
    parser.on("finish", function() {
      //when we're done, let's write out the complete sheet
      fs.createWriteStream("parsed.json");
      fs.write(JSON.stringify(sheet));
      fs.end();
    });
    
    //read the file and feed it to the parser
    fs.readFile("data.csv", function(err, data) {
      parser.write(data);
      parser.end();
    });

Streams can also be connected via a "pipe," which may sound familiar if you have used UNIX command lines (or plumbing). Streams connected in this way are an easy way to transfer data from one place to another when you don't actually need to look at the data in detail. For example, the ``request`` network library lets you download a file directly to the hard drive just by connecting its stream to a file stream::

    var request = require("request");
    var fs = require("fs");
    
    //create an output stream, then pipe() the request into it
    var output = fs.createWriteStream("google.html");
    request("http://google.com").pipe(output);

Using pipes this way is much easier than manually feeding the data from one stream to the next as each stage completes. By using pipes, we can create a program where data literally flows through our code, and we deal with it gradually, not all at once.