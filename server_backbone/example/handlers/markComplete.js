var Reminder = require("../models/reminder");

module.exports = function(req, reply) {
  var id = req.params.id;
  var reminder = new Reminder({ id: id, complete: true });
  reminder.mark(function() {
    reply.redirect("/");
  });
};