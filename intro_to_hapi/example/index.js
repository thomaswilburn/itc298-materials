var hapi = require("hapi");
/*
This server uses two handlers loaded from other modules. The first is a MarkDown loader, letting us use CommonMark files instead of writing HTML code. The second uses Hapi's view support to output from a Handlebars template.
*/
var markdownHandler = require("./md");
var helloHandler = require("./hello");

//create the server
var server = new hapi.Server();
//this server runs on http://localhost:8080
server.connection({ port: 8080 });
//load Handlebars for view support on .hbs files
server.views({
  engines: {
    hbs: require("handlebars")
  },
  path: "templates"
});

//start the server's active listening process
server.start(function() {
  console.log(server.info);
});

//routes can be added before or after the server is started
server.route([
  //this route loads .md files and renders them to HTML
  { method: "GET", path: "/{file?}", handler: markdownHandler },
  //this route returns a Handlebars view
  { method: "GET", path: "/hello/{name}", handler: helloHandler }
]);