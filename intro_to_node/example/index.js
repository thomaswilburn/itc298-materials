var fs = require("fs"); // load the built-in FS module

var chalk = require("chalk"); //load the chalk module from NPM

var process = require("./process"); //load the local "process.js" module

//readfile takes three arguments: file name, encoding, and callback
fs.readFile("sample.html", "utf8", function(err, data) {
  // check for errors
  if (err) return console.log(err);
  
  //use the exported function from process to look for URLs
  process.findURLs(data, function(err, urls) {
    
    //again, check for errors
    if (err) return console.log(err);
    
    //console.log allows us to substitute strings for %s markers
    console.log(chalk.bgGreen.white("Found %s URLs!"), urls.length);
    
    //now display each URL
    urls.forEach(function(item) {
      //console.log(item); //debugging
      //color the various parts of the URL
      var colored = chalk.bgBlue.white(item.protocol) + chalk.bgWhite.black("//");
      colored += chalk.bgRed(item.host);
      colored += chalk.bgMagenta(item.path);
      //print the colored URL to standard output
      console.log(colored);
    }); //end forEach
    
  }); //end process.findURLs
  
}); //end fs.readFile