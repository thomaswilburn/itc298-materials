var fs = require("fs");
var markdown = require("commonmark");
var path = require("path");

var renderer = new markdown.HtmlRenderer();
var parser = new markdown.Parser();

module.exports = function(request, reply) {
  var filename = request.params.file || "index";
  var filePath = path.join(__dirname, filename + ".md");
  fs.stat(filePath, function(err) {
    if (err) return reply("File not found").code(404);
    fs.readFile(filePath, "utf8", function(err, file) {
      // file not found
      if (err) return reply("File couldn't be read").code(500);
      var parsed = parser.parse(file);
      var html = renderer.render(parsed);
      if (!parsed || !html) {
        return reply("Couldn't parse MarkDown").code(500);
      }
      reply(html);
    });
  });
};