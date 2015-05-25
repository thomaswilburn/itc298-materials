Using SQLite with Node
======================

You can do a lot with in-memory storage, or JSON files, but eventually most web applications will want to use a database. There are Node options for connection to the big relational databases (Postgres and MySQL/MariaDB), as well as a variety of non-relational databases (MongoDB, Couch). For simple applications and prototyping, however, SQLite is a great solution. It's the database library used on iOS and Android, and the default for the Rails framework, and it also uses a simple file format that's easy to move around or back up.

Getting started
---------------

SQLite can be installed easily using the ``sqlite3`` module, which is run by MapBox. It should install on almost any operating system, including Windows, without a build process. Just run ``npm install sqlite3 --save`` to start.

Once the module is installed, we'll want to use it. SQLite opens a database file via the Database constructor::

    var sqlite = require("sqlite3");
    var db = new sqlite.Database("test.db");
    
If ``test.db`` doesn't exist, it'll be created. If it does exist, it'll be opened for access. There are additional options that can be passed to your database, such as a callback that will be used once it's actually open and ready for use (which is a good time to start your server).

Once we have a database object, we can use it to run queries. For example, we probably want to create a table and insert a couple of rows. We use the callback version of the ``run()`` method to execute at least the first query, to make sure that our table is created before we try to insert into it::

    db.run("CREATE TABLE IF NOT EXISTS people (name, age, title);", function(err) {
      //this function is run when the query completes
      db.run("INSERT INTO people VALUES ('Alice', 27, 'District Manager');");
      db.run("INSERT INTO people VALUES ('Bob', 23, 'Assistant to the District Manager');");
    });

You'll notice a couple of things about our ``CREATE TABLE`` statement. First of all, the ``IF NOT EXISTS`` clause, which tells SQLite to only create our table if there's not one with that name already. That's useful for our apps, so that they can set themselves up from scratch. Second, the columns do not have types the way you may be used to in MySQL. This is because SQLite is an untyped database. You can declare "affinities" for a column, and the database will try to convert values to match, but in general a column will accept any value. This makes SQLite a great match for dynamic languages like JavaScript, where a variable does not have a set "type," especially during prototyping.

In addititon to running regular string queries, you can create parameterized queries to insert values, which is slightly safer when working with user input. The parameters in the SQL must start with ``$``, ``@``, or ``:``. I recommend using ``$``, since it's a valid JS variable name::

    db.run("INSERT INTO people VALUES ($name, $age, $title)", {
      $name: "Carly",
      $age: 18,
      $title: "Intern"
    });
    
If you provide a callback for ``run()``, it'll be called with a statement object as the ``this`` value. You can get the ``this.lastID`` to find the ``rowid`` (which is automatically created for every row, whether you included it in your table or not) of the new row. This is very handy for running subsequent statements that might depend on the previous result. For example, if we were creating a project invoice tracker with line-items on each project, we might want to create the project first, then attach the line items in separate table using the ``rowid`` as a foreign key::

    db.run("INSERT INTO projects ($name, $client)", {
      $name: "ITC 298",
      $client: "Seattle Central"
    }, function(err) {
      if (err) {
        console.error(err);
      }
      var rowID = this.lastID;
      db.run("INSERT INTO items ($projectID, $description, $cost)", {
        $projectID: rowID,
        $description: "Server setup costs",
        $cost: 15
      });
    });

Requesting data
---------------

The ``run()`` method of the database will let you create tables and insert rows, but it's meant to perform tasks that do not produce output. To get a result from the database, you'll want to use the ``get()`` and ``all()`` methods. ``get()`` will return a single item at a time, and ``all()`` returns all matching items. Each row returned will take the form of an object with keys for each column. Like all I/O in Node, the functions are asynchronous, so you'll get the result in a callback function::

    db.get("SELECT * FROM people", function(err, result) {
      //queries via get() will return a single object
      //result == { name: "Alice", age: 27, title: "District Manager" }
    });
    
    db.all("SELECT * FROM people WHERE age < 25", function(err, result) {
      /* 
      queries via all() return an array of 0 or more rows
      result == [
        { name: "Bob", age: 23, title: "Assistant to the District Manager" },
        { name: "Carly", age: 18, title: "Intern" }
      ];
      */
    });
    
Between these various reads and writes from the database, you could clearly end up with very indented code, particularly compared with languages that use blocking database I/O. Remember to take advantage of the ``async`` library to manage many queries that must happen in sequence, or should be batched together.

Preparing queries for security
------------------------------

If you've taken one of my PHP classes before, you'll know that I'm not a fan of creating SQL queries by adding strings together. It's an easy way to introduce a security hole, and it also means that the database engine must re-compile the statement each time. You can speed up your queries and make sure that they're secure by using "prepared" statements instead. The ``prepare()`` method returns a statement object, on which you can call ``run()``, ``get()`` or ``all()`` and pass in parameters to be bound. You'll notice that the syntax looks very similar to parameterized queries::

    var insert = db.prepare("INSERT INTO people ($name, $age, $title)");
    insert.run({ $name: "Daisy", $age: 42, $title: "Office Manager" });
    insert.run({ $name: "Edward", $age: 34, $title: "Salesperson" });

I would strongly recommend using prepared statements whenever possible. They're cleaner, safer, and faster. This is true even beyond SQLite and Node: prepared statements are also available in PHP/MySQL, and should be used there as well.