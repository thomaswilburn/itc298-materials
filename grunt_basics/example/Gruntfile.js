module.exports = function(grunt) {

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks("grunt-concurrent");
  
  grunt.initConfig({
    concurrent: {
      dev: {
        tasks: ["nodemon", "watch"],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        script: "index.js"
      }
    },
    watch: {
      css: {
        files: "*.css",
        tasks: ["test"]
      }
    }
  });
  
  grunt.registerTask("default", ["concurrent"]);
  grunt.registerTask("test", console.log.bind(console));

};
