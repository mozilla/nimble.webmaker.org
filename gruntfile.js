var Path = require('path');

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  grunt.initConfig({
    exec: {
      update_nimble_submodules: {
        command: 'cd ' + Path.join(__dirname, '/nimble') + '; git submodule update --init',
        stdout: true,
        stderr: true
      }
    },
    jshint: {
      files: ['gruntfile.js', 'app.js', 'lib/**/*.js']
    }
  });
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('init', ['exec:update_nimble_submodules']);
};
