var Reminder = require("../models/reminder");

module.exports = function(req, reply) {
  var reminder = new Reminder(req.payload);
  reminder.create(function() {
    reply.redirect("/");
  });
};