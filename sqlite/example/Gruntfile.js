module.exports = function(grunt) {
  
  var npm = ["grunt-contrib-watch", "grunt-concurrent", "grunt-nodemon", "grunt-contrib-less"];
  npm.forEach(grunt.loadNpmTasks);
  
  grunt.initConfig({
    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      less: {
        files: "src/**/*.less",
        tasks: ["less"]
      },
      html: {
        files: "views/**/*.html",
        tasks: []
      },
      server: {
        files: "**/*.js",
        tasks: []
      }
    },
    concurrent: {
      dev: {
        tasks: ["watch", "nodemon"],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        scripts: ["index.js"]
      }
    },
    less: {
      dev: {
        files: {
          "public/style.css": "src/style.less"
        }
      }
    }
  });
  
  grunt.registerTask("default", ["less", "concurrent"]);
  
};