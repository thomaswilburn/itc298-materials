var ReminderList = require("../models/reminderList");

module.exports = function(req, reply) {
  var list = new ReminderList();
  list.load(function() {
    var incomplete = list.where({ complete: false });
    list.reset(incomplete);
    reply.view("index", {
      title: "Incomplete items",
      reminders: list.toJSON()
    });
  });
};