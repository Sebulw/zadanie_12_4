module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'workspace/css/style.css': 'workspace/sass/style.sass'
        }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'workspace/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/'
        }]
      }
    },

    watch: {
      scripts: {
          files: ['workspace/sass/style.sass', 'workspace/css/style.css'],
          tasks: ['sass'],
          options: {
              spawn: false,
          },
      }
    },

    browserSync: {
        bsFiles: {
            src : ['workspace/index.html', 'workspace/sass/style.sass', 'workspace/css/style.css', 'workspace/js/scripts.js']
        },
        options: {
            server: {
                baseDir: ["workspace/sass/", "workspace/", "workspace/css/", "workspace/js/"]
            },
            watchTask: true
        }
    },

    jshint: {
      all: ['workspace/js/*.js']
    }
  });
  // Load the plugins tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // Default task(s).

  grunt.registerTask('default', ['sass', 'imagemin', 'browserSync', 'watch']);
  grunt.registerTask('hint', ['jshint']);
};