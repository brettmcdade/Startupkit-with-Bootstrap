'use strict';

module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist1: {
                src: [
                    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
                    'bower_components/select2/dist/js/select2.min.js'
                ],
                dest: 'web/vendor/vendor.js'
            },
            dist2: {
                src: [
                    'bower_components/select2/dist/css/select2.min.css'
                ],
                dest: 'web/vendor/vendor.css'
            }
        },

        browserify: {
            dist: {
                src: ['src/scripts/main.js'],
                dest: 'web/js/main.js'
            }
        },

        uglify: {
            build: {
                src: 'web/js/main.js',
                dest: 'web/js/main.min.js'
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    loadPath: ['bower_components']
                },
                files: {
                    'web/css/style.css': 'src/styles/style.scss',
                }
            }
        },

        autoprefixer: {
            options: {
              browsers: [
                'last 2 versions',
                'Explorer >= 9',
                'Android >= 2.3',
                'iOS 7'
              ]
            },
            dist: {
              src: 'web/css/style.css'
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'web/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'web/css/',
                    ext: '.min.css'
                }]
            }
        },

        copy: {
            main: {
                files: [
                    {
                        cwd: 'bower_components',           // set working folder / root to copy
                        src: 'jquery/dist/jquery.min.js',  // copy all files and subfolders
                        dest: 'web/vendor',                // destination folder
                        expand: true                       // required when using cwd
                    },
                    {
                        cwd: 'bower_components',
                        src: 'picturefill/dist/picturefill.min.js',
                        dest: 'web/vendor', 
                        expand: true
                    },
                    {
                        cwd: 'bower_components/bootstrap-sass/assets/fonts',
                        src: '**/*',
                        dest: 'web/fonts',
                        expand: true
                    },
                ]
            }
        },

        imagemin : {
            all : {
                files : [{
                    expand : true, // Enable dynamic expansion
                    cwd: 'web/img/', // source images (not compressed)
                    src : ['**/*.{png,jpg,gif,svg}'], // Actual patterns to match
                    dest: 'web/img/' // Destination of compressed files
                }]
            }
        }, //end imagemin

        // Build the site using grunt-includes
        includereplace: {
            build: {
                cwd: 'src/html/',
                src: ['*.html', '*.php'],
                dest: 'web/',
                expand: true,
                options: {
                    flatten: true,
                    prefix: '@@',
			        suffix: ''
                    // includePath: 'src/html/includes'
                }
            }
        },

        connect: {
            server: {
              options: {
                port: 8000,
                watchTask: true,
                base: 'web'
              }
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'web/*.html',
                        'web/css/*.css'
                    ]
                },
                options: {
                    open: true,
                    browser: "google chrome",
                    notify: true,
                    watchTask: true,
                    server: 'web'
                }
            }
        },

        watch: {
            scripts: {
                files: ['src/scripts/*.js', 'src/scripts/**/*.js'],
                tasks: ['scripts'],
                options: {
                  spawn: false,
                },
            },

            css: {
                files: ['src/styles/*.scss', 'src/styles/**/*.scss'],
                tasks: ['styles'],
                options: {
                  spawn: false,
                }
            },

            includes: {
                files: ['src/html/*.html', 'src/html/*.php', 'src/html/includes/*.html'],
                tasks: ['html'],
                options: {
                    spawn: false,
                }
            }
        },


    });

    // 3. Where we tell Grunt we plan to use this plug-in.
      grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-delete-sync');
    // grunt.loadNpmTasks('grunt-includes');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('vendors', ['concat:dist1', 'concat:dist2', 'copy']);
    grunt.registerTask('scripts', ['browserify', 'uglify']);
    grunt.registerTask('styles', ['sass', 'autoprefixer', 'cssmin']);
    grunt.registerTask('html', ['includereplace']);

    grunt.registerTask('default', ['browserSync', 'vendors', 'styles', 'scripts', 'html', 'connect', 'watch']);

};
