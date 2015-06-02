var sql = require("../database");
var ReminderList = require("../models/reminderList");

module.exports = function(req, reply) {
  var list = new ReminderList();
  list.load(function() {
    reply.view("index", {
      title: "Home",
      reminders: list.toJSON()
    });
  });
};