module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Copy web assets from bower_components to more convenient directories.
      browserify: {
        		options: {
    				extensions: ['.js'],
    				debug: true
  					},
  				dist: {
    			files: {
      			'web/js/output.js' : 
      			[
        		'bower_components/bootstrap-sass/assets/javascripts/**/*.js',
        		'js/*.js'
      			]
    		}}
  		},		

  		minified : {
  			files: {
    		src: [
    			'web/js/output.js'
    		],
    		dest: 'web/js/'
  			},
  			options : {
    		sourcemap: true,
    		allinone: false
  			}
		},

        // Compile SASS files into minified CSS.
        sass: {
            options: {
                includePaths: ['bower_components/bootstrap-sass/assets/stylesheets']
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'web/css/output.css': 'client/css/app.css'
                }
            }
        },

        cssmin: {
  			minify: {
    			src: 'web/css/app.css',
    			dest: 'web/css/output.min.css'
  			}
		},

        // Watch these files and notify of changes.
        watch: {
            grunt: { files: ['Gruntfile.js'] },

            sass: {
                files: [
                    'scss/**/*.scss'
                ],
                tasks: ['sass']

            }
        }
    });
grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-minified');
    // Establish tasks we can run from the terminal.
    grunt.registerTask('build', [ 'browserify', 'minified','sass']);
    grunt.registerTask('default', ['build', 'watch']);
}
