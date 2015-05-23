var async = require("async");
var sqlite = require("sqlite3");
var db; // used across this module

var facade = {
  connection: null,
  init: function(ready) {
    db = new sqlite.Database("invoices.db", function(err) {
      if (err) {
        console.error("Couldn't open invoice database");
        process.exit(1);
      }
      
      //store the connection for outside modules to use directly
      facade.connection = db;
      
      //create tables, and execute ready callback when done
      async.parallel([
        function(c) {
          db.run("CREATE TABLE IF NOT EXISTS projects (name, client, address);", c);
        },
        function(c) {
          db.run("CREATE TABLE IF NOT EXISTS items (date, description, amount);", c);
        }
      ], function(err) {
        if (ready) ready(err);
      });
    });
  },
  getAllProjects: function(c) {
    db.all("SELECT name, client, address, rowid FROM projects;", c);
  }
};

module.exports = facade;