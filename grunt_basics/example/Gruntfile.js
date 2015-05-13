module.exports = function(grunt) {

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-autoprefixer");
  
  grunt.initConfig({
    //concurrent runs simultaneous tasks -- our server and our watch task
    concurrent: {
      dev: {
        tasks: ["nodemon", "watch"],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    //nodemon tracks and restarts our server for us
    nodemon: {
      dev: {
        script: "index.js"
      }
    },
    //autoprefixer processes CSS for us and adds browser prefixes
    autoprefixer: {
      dev: {
        //puts files in the target directory
        flatten: true,
        //uses a globbing pattern instead of reading a single file
        expand: true,
        src: "src/css/*.css",
        dest: "build/css"
      }
    },
    //watch performs tasks whenever we save matching files
    watch: {
      //turn on live reload for all targets
      options: {
        livereload: true
      },
      //css target - just does autoprefixing when CSS files change
      css: {
        files: "src/**/*.css",
        tasks: ["autoprefixer"]
      },
      //html target - triggers live reload when templates are edited
      html: {
        files: "**/*.html",
        //no tasks, just live reload
        tasks: []
      }
    }
  });
  //by default, regenerates CSS and then runs our long-lived processes (Hapi server and watch)
  grunt.registerTask("default", ["autoprefixer", "concurrent"]);
  
};
