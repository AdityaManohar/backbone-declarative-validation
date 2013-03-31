module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("m/d/yyyy") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: {
          'dist/backbone.declarative.validator.min.js' : ['src/backbone.declarative.validator.js']
        }
      }
    },
    jasmine : {
      src: 'src/**/*.js',
      options : {
      	vendor: 'lib/**/*.js',
        specs : 'spec/**/*.js'
      }
    },
    jshint: {
    	files: ['src/backbone.declarative.validator.js'],
    	options: {
    		camelcase: true,
    		curly: true,
    		eqeqeq: true,
    		forin: true,
    		indent: 4,
    		latedef: true,
    		noempty: true,
    		quotmark: true,
    		undef: true,
    		unused: true,
    		force: true,
    		globals: {
    			jQuery: true,
    			console: true,
    			module: true,
    			_: true,
    			Backbone: true
    		}
    	}
    }
    
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  grunt.registerTask('default', ['jshint', 'uglify', 'jasmine']);

};
