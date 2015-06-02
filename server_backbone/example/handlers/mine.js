var ReminderList = require("../models/reminderList");

module.exports = function(req, reply) {
  var list = new ReminderList();
  list.load(function() {
    var filtered = list.where({ assigned: "me" });
    list.reset(filtered);
    reply.view("index", {
      title: "Mine",
      reminders: list.toJSON()
    });
  });
};