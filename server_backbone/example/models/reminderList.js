var Backbone = require("backbone");
var Reminder = require("./reminder");
var sql = require("../database");

module.exports = Backbone.Collection.extend({
  model: Reminder,
  load: function(callback) {
    var self = this;
    sql.db.all("SELECT description, complete, assigned, rowid as id FROM reminders", function(err, results) {
      self.add(results);
      self.each(function(item) {
        //convert 1 and 0 to true/false
        var completed = item.get("complete");
        item.set("complete", !!completed);
      });
      callback();
    });
  }
});