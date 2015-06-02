var hapi = require("hapi");
var server = new hapi.Server();
server.connection({ port: 8000 });

server.views({
  engines: {
    html: require("handlebars")
  },
  path: "./views",
  layoutPath: ".",
  layout: "layout",
  isCached: false
});

var sql = require("./database");

sql.init(function() {
  //add some dummy data
  var async = require("async");
  var Reminder = require("./models/reminder");
  var list = [
    { description: "Take out trash", assigned: "me", complete: true },
    { description: "Clean cat box", assigned: "you", complete: false },
    { description: "Walk dog", assigned: "me", complete: false },
    { description: "Get mail", assigned: "me", complete: true },
    { description: "Wash dishes", assigned: "you", complete: false }
  ];

  async.each(list, function(props, c) {
    var reminder = new Reminder(props);
    reminder.create(c);
  }, function() { 
    server.start(function() {
      console.log("Server ready");
    });
  });

});

server.route(require("./routes"));