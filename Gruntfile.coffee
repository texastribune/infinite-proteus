module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    concat:
      options:
        banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      dist:
        src: ['src/**/*.js']
        dest: 'dist/<%= pkg.name %>.js'
    jshint:
      files: ['src/**/*.js']
    uglify:
      options:
        banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      dist:
        files:
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.registerTask 'default', ['jshint', 'concat', 'uglify']
