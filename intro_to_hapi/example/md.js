var fs = require("fs");
var markdown = require("commonmark");
var path = require("path");

//CommonMark is a MarkDown text converter
//we use the following objects to turn MarkDown text into HTML
//see commonmark.org for more info
var renderer = new markdown.HtmlRenderer();
var parser = new markdown.Parser();

// This is our request handler
module.exports = function(request, reply) {
  //get the current filename, or default to "index.md"
  var filename = request.params.file || "index";
  var filePath = path.join(__dirname, filename + ".md");
  //does this file exist?
  fs.stat(filePath, function(err) {
    //file not found, 404
    if (err) return reply("File not found").code(404);
    //load the file each time
    fs.readFile(filePath, "utf8", function(err, file) {
      if (err) return reply("File couldn't be read").code(500);
      var html;
      try {
        //parse text into HTML using CommonMark
        var parsed = parser.parse(file);
        html = renderer.render(parsed);
      } catch (e) {
        return reply("Couldn't parse MarkDown").code(500);
      }
      reply(html);
    });
  });
};
