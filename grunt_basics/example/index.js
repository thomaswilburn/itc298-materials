var hapi = require("hapi");
var server = new hapi.Server();
server.connection({ port: 8000 });
server.start();

//view config
server.views({
  path: "templates",
  engines: {
    html: require("handlebars")
  },
  isCached: false
});

//home page
server.route({
  method: "GET",
  path: "/",
  handler: function(req, reply) {
    reply.view("index");
  }
});

//static resources - CSS, images, etc.
//served from the build folder, since they're generated/copied via Grunt
server.route({
  method: "GET",
  path: "/assets/{param*}",
  handler: {
    directory: {
      path: "build"
    }
  }
});
