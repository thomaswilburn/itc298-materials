var async = require("async");
var sqlite = require("sqlite3");

var facade = {
  db: null,
  init: function(callback) {
    facade.db = new sqlite.Database("reminders.db", function(err) {
      var db = this;
      if (err) {
        console.error(err);
        process.exit();
      }
      db.run("CREATE TABLE IF NOT EXISTS reminders (description, assigned, complete)", function() {
        db.run("DELETE FROM reminders", function() {
          callback();
        });
      });
    });
  }
}

module.exports = facade;