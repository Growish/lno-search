module.exports = function(grunt) {


    grunt.initConfig({
        cssmin: {
            target: {
                files: {
                    'dist/lno-search.min.css': [ 'src/*.css' ]
                }
            }
        },

        uglify: {
            app1: {
                files: {
                    'dist/lno-search.min.js': [ 'src/*.js' ]
                }
            }
        },
        comments: {
            app1: {
                options: {
                    singleline: true,
                    multiline: true,
                    keepSpecialComments: false
                },
                src: [ 'src/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-stripcomments');

    grunt.registerTask('default', ['comments', 'cssmin', 'uglify']);

};