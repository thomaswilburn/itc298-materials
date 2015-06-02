var Backbone = require("backbone");
var sql = require("../database");

var INSERT = "INSERT INTO reminders (description, assigned, complete) VALUES ($description, $assigned, $complete)";
var COMPLETE = "UPDATE reminders SET complete = 1 WHERE rowid = $id;";

module.exports = Backbone.Model.extend({
  defaults: {
    description: "",
    complete: false,
    assigned: "you",
    id: null
  },
  create: function(done) {
    var json = this.toJSON();
    sql.db.run(INSERT, {
      $description: json.description,
      $complete: json.complete,
      $assigned: json.assigned
    }, function(err) {
      if (err) console.error(err);
      done();
    });
  },
  mark: function(done) {
    var json = this.toJSON();
    var statement = sql.db.prepare(COMPLETE);
    statement.run({
      $id: json.id
    }, function(err) {
      if (err) console.error(err);
      done();
    });
  }
});