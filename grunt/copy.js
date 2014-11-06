// Copies remaining files to places other tasks can use
module.exports = {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= config.app %>',
      dest: '<%= config.dist %>',
      src: [
        'content/**/**.*',
        '.htaccess',
        'images/{,*/}*.webp',
        // '{,*/}*.html',
        'styles/fonts/{,*/}*.*'
      ]
    }]
  },
  libs: {
    files: [
      {
        expand: true,
        cwd: 'bower_components/famous/src',
        dest: 'app/lib/famous',
        src: [
          '**'
        ]
      },
      {
        expand: true,
        cwd: 'bower_components',
        dest: 'app/lib',
        src: [
          'almond/almond.js',
          'famous-polyfills/*.js',
          'requirejs/require.js'
        ]
      }
    ]
  }
};
