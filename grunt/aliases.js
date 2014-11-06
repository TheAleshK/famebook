module.exports = function (grunt) {
  'use strict';
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'processhtml:dev',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    // 'clean:dist',
    'copy:dist',
    'copy:libs',
    'lint',
    'processhtml:dist',
    'useminPrepare',
    'requirejs',
    // 'concat',
    // 'cssmin',
    // 'uglify',
    // 'rev',
    // 'usemin',
    // 'htmlmin'
  ]);

  grunt.registerTask('lint', [
    'jshint'
  ]);
  
  // grunt.registerTask('test', [
  //   'lint'
  // ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
