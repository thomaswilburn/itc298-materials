var url = require("url"); //load the built-in URL module

module.exports = {
  findURLs: function(text, callback) {
    var re = /(https?:)?\/\/[\w\.-\/]+/g; //regular expression that finds URLs
    var found = text.match(re);
    //use map() to convert URLs to parsed objects
    try {
      var parsed = found.map(function(item) {
        return url.parse(item);
      });
    } catch (e) {
      //if there's a parse error, go ahead and toss it to the callback for handling
      return callback(e);
    }
    //no errors!
    callback(null, parsed);
  }
}