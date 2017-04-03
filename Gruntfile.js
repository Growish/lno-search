module.exports = function(grunt) {


    grunt.initConfig({
        credentials: grunt.file.readJSON("credentials.json"),
        s3: {
            options: {
                accessKeyId: "<%= credentials.aws.accessKeyId %>",
                secretAccessKey: "<%= credentials.aws.secretAccessKey %>",
                bucket: "growish-partner",
                region: "eu-central-1"
            },
            move: {
                cwd: "dist/",
                src: "**",
                dest: "widget-network/"
            }
        },
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
        },
        add_comment: {
            app1: {
                options: {
                    comments: ['Compiled ' + new Date()],
                    carriageReturn: "\n",
                    prepend: true,
                    syntaxes: {
                        '.js': '//',
                        '.css': ['/*', '*/']
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**/*.js', '**/*.css'],
                    dest: 'dist/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-aws');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-stripcomments');
    grunt.loadNpmTasks('grunt-add-comment');

    grunt.registerTask('default', ['comments', 'cssmin', 'uglify', 'add_comment', 's3']);

};