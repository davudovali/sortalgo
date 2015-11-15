module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      all: ['script/iter.js']   
    },
    concat: {
      extra: {
        src: ['script/action.js', 'script/iter.js'],
        dest: "script/main.js"
      },
      main: {
        src: ["node_modules/traceur/bin/traceur-runtime.js", "script/main5.js"],
        dest: "public/main.js"
      }
    },
    uglify: {},
    watch:  { scripts: {
      files: ['script/action.js', 'script/iter.js'],
      tasks: ['concat:extra','traceur', 'concat:main'] }
    },
    traceur: {
      options: {
        includeRuntime: false,
        traceurCommand: "node_modules/traceur/src/node/command.js",
        traceurOptions: "--experimental"
      },
      'app': {
        files: {
          'script/main5.js': ['script/main.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-traceur-simple');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};

