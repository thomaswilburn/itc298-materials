var Reminder = require("../models/reminder");

module.exports = function(req, reply) {
  reply.view("form");
};