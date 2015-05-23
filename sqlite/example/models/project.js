var Backbone = require("backbone");
var db = require("../db");

var LOAD = "SELECT name, client, address FROM projects WHERE rowid = $id;";
var SAVE_NEW = "INSERT INTO projects (name, client, address) VALUES ($name, $client, $address);";
var UPDATE = "UPDATE projects SET name = $name, client = $client, address = $address WHERE rowid = $id;";
var LAST = "SELECT last_insert_rowid() AS rowid FROM projects;";

module.exports = Backbone.Model.extend({
  defaults: {
    name: "Untitled Project",
    client: "",
    address: "",
    id: "new"
  },
  load: function(done) {
    var self = this;
    var query = db.connection.prepare(LOAD);
    var data = this.toJSON();
    query.get({
      $id: data.id
    }, function(err, loaded) {
      self.set(loaded);
      done(err);
    });
  },
  save: function(done) {
    var self = this;
    var id = this.get("id");
    var q = id == "new" ? SAVE_NEW : UPDATE;
    var query = db.connection.prepare(q);
    var data = this.toJSON();
    query.run({
      $name: data.name,
      $client: data.client,
      $address: data.address,
      $id: id == "new" ? undefined : data.id
    }, function() {
      if (id == "new") {
        return db.connection.get(LAST, function(err, row) {
          console.log("New project inserted at %s", row.rowid);
          self.set("id", row.rowid);
          done();
        });
      }
      done();
    });
  }
});