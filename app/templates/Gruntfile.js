// Generated on <%= (new Date).toISOString().split('T')[0] %> using
// <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically<% if (loadMethod === 'scriptTags' || loadMethod === 'AMD' && testFramework === 'mocha') { %>
  require('load-grunt-tasks')(grunt);<% } else if (loadMethod === 'AMD' && testFramework === 'jasmine') { %>
  require('load-grunt-tasks')(grunt, { pattern: ['grunt-*', '!grunt-template-jasmine-requirejs'] });<% } %>

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },<% if (includeSass) { %>
      sass: {
        files: ['<%%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },<% } %>
      styles: {
        files: ['<%%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= config.dist %>/*',
            '!<%%= config.dist %>/.git*'
          ]
        }]
      },<% if (loadMethod === 'AMD') { %>
      requirejs: {
        dot: true,
        src: [
          '<%%= config.dist %>/**/*.js',
          '!<%%= config.dist %>/scripts/main.js'
        ]
      },<% } %>
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%%= config.app %>/scripts/{,*/}*.js',
        '!<%%= config.app %>/scripts/vendor/*',
        'test/{,*/}*.js'
      ]
    },<% if (testFramework === 'mocha') { %>

    // Mocha testing framework configuration options
    mocha: {
      test: {
        options: {
          run: <%= loadMethod === 'scriptTags' %>,
          urls: ['http://<%%= connect.options.hostname %>:<%%= connect.test.options.port %>/spec_runner.html']
        }
      }
    },<% } else if (testFramework === 'jasmine') { %>

    // Jasmine testing framework configuration options
    jasmine: {
      all: {
        options: {
          specs: 'test/{,*/}*.js'<% if (loadMethod === 'AMD') { %>,
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: '<%%= config.app %>/scripts/main.js',
            requireConfig: {
              baseUrl: '<%%= config.app %>/scripts',
            }
          }<% } %>
        }
      }
    },<% } if (includeSass) { %>

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {<% if (includeLibSass) { %>
        sourceMap: true,
        includePaths: ['bower_components']
        <% } else { %>
        sourcemap: true,
        loadPath: 'bower_components'<% } %>
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },<% } %>

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^<%= config.app %>\/|\.\.\//,
        src: ['<%%= config.app %>/index.html']<% if (loadMethod === 'AMD') { %>,
        exclude: /ractive/<% } %>
      }<% if (includeSass) { %>,
      sass: {
        src: ['<%%= config.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }<% } %>
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%%= config.dist %>/scripts/{,*/}*.js',
            '<%%= config.dist %>/styles/{,*/}*.css',
            '<%%= config.dist %>/images/{,*/}*.*',
            '<%%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },<% if (loadMethod === 'AMD') { %>

    // Build the application using Require.js
    requirejs: {
      compile: {
        options: {
          almond: true,
          replaceRequireScript: [{
            files: ['<%%= config.dist %>/index.html'],
            module: 'main'
          }],
          modules: [{name: 'main'}],
          mainConfigFile: '<%%= config.app %>/scripts/main.js',
          dir: '<%%= config.dist %>/scripts',
          baseUrl: '<%%= config.app %>/scripts',
          optimize: 'none',
          useStrict: true,
          logLevel: 2
        }
      }
    },<% } %>

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%%= config.dist %>'
      },
      html: '<%%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: ['<%%= config.dist %>', '<%%= config.dist %>/images']
      },
      html: ['<%%= config.dist %>/{,*/}*.html'],
      css: ['<%%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    <% if (loadMethod === 'scriptTags') { %>// },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%%= config.dist %>/scripts/scripts.js': [
    //         '<%%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },<% } %>

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= config.app %>',
          dest: '<%%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },<% if (includeModernizr) { %>

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%%= config.dist %>/scripts/modernizr.js',
        files: {
          src: [
            '<%%= config.dist %>/styles/{,*/}*.css',
            '<%%= config.dist %>/scripts/{,*/}*.js',
            '!<%%= config.dist %>/scripts/modernizr.js'
          ]
        },
        uglify: true
      }
    },<% } %>

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [<% if (includeSass) { %>
        'sass:server',<% } %>
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [<% if (includeSass) { %>
        'sass',<% } %>
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, ' +
    '--allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. ' +
      'Use `grunt serve` to start a server.'
    );
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      <% if (testFramework === 'mocha') { %>'connect:test',
      'mocha'<% }
      else if (testFramework === 'jasmine') { %>'jasmine'<% } %>
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',<% if (loadMethod === 'scriptTags') { %>
    'uglify',<% } %>
    'copy:dist',<% if (loadMethod === 'AMD') { %>
    'requirejs',
    'clean:requirejs',<% } if (includeModernizr) { %>
    'modernizr',<% } %>
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
