'use strict';

var ractive,
    path = require('path'),
    helpers = require('yeoman-generator').test;

describe('yo ractive', function () {
  describe('when using the default setup', function () {
    describe('project files', function () {
      beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
          if (err) {
            return done(err);
          }

          ractive = helpers.createGenerator('ractive:app', [
            '../../app'
          ], false, {
            'skip-install': true,
            'skip-welcome-message': true,
            'skip-yo-rc': true
          });

          helpers.mockPrompt(ractive, {
            'appPath': 'app',
            'project': 'mock-project',
            'loadMethod': 'scriptTags',
          });

          done();
        });
      });

      it('creates the expected dot files', function (done) {
        var expected = [
          '.editorconfig',
          '.gitattributes',
          '.gitignore',
          '.jshintrc'
        ];

        ractive.run({}, function () {
          helpers.assertFile(expected);

          done();
        });
      });

      it('creates the expected stylesheets', function (done) {
        ractive.run({}, function () {
          helpers.assertFile(['app/styles/app.css']);

          done();
        });
      });

      it('creates the expected dependency management files', function (done) {
        var expected = [
          'bower.json',
          'package.json'
        ];

        ractive.run({}, function () {
          helpers.assertFile(expected);

          done();
        });
      });

      it('creates the expected JavaScript files', function (done) {
        var expected = [
          'Gruntfile.js',
          'app/scripts/app.js',
          'test/app_test.js'
        ];

        ractive.run({}, function () {
          helpers.assertFile(expected);

          done();
        });
      });

      it('creates the exepcted index file', function (done) {
        ractive.run({}, function () {
          helpers.assertFile(['app/index.html']);

          done();
        })
      });

      it('creates a closure', function (done) {
        var expected = 'app/scripts/app.js';

        ractive.run({}, function () {
          helpers.assertFileContent(expected,
            /^\(function \(window, undefined\) {/i
          );

          helpers.assertFileContent(expected,
            /}\)\(window\);/i
          );

          done();
        });
      });
    });
  });

  describe('when sass is included', function () {
    beforeEach(function (done) {
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) {
          return done(err);
        }

        ractive = helpers.createGenerator('ractive:app', [
          '../../app'
        ], false, {
          'skip-install': true,
          'skip-welcome-message': true,
          'skip-yo-rc': true
        });

        helpers.mockPrompt(ractive, {
          'appPath': 'app',
          'project': 'mock-project',
          'features': ['includeSass']
        });

        done();
      });
    });

    it('creates the expected stylesheets', function (done) {
      ractive.run({}, function () {
        var expected = [
          'app/styles/app.scss',
          'app/styles/_defaults.scss',
          'app/styles/_vendor.scss',
          'app/styles/_layout.scss',
        ];

        helpers.assertFile(expected);

        done();
      });
    });
  });

  describe('when jQuery is included', function () {
    beforeEach(function (done) {
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) {
          return done(err);
        }

        ractive = helpers.createGenerator('ractive:app', [
          '../../app'
        ], false, {
          'skip-install': true,
          'skip-welcome-message': true,
          'skip-yo-rc': true
        });

        helpers.mockPrompt(ractive, {
          'appPath': 'app',
          'project': 'mock-project',
          'features': ['includejQuery']
        });

        done();
      });
    });

    it('includes jQuery', function (done) {
      ractive.run({}, function () {
        helpers.assertFileContent('bower.json', /jQuery/i);

        done();
      })
    });
  });

  describe('when Modernizr is included', function () {
    beforeEach(function (done) {
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) {
          return done(err);
        }

        ractive = helpers.createGenerator('ractive:app', [
          '../../app'
        ], false, {
          'skip-install': true,
          'skip-welcome-message': true,
          'skip-yo-rc': true
        });

        helpers.mockPrompt(ractive, {
          'appPath': 'app',
          'project': 'mock-project',
          'features': ['includeModernizr']
        });

        done();
      });
    });

    it('includes Modernizr', function (done) {
      ractive.run({}, function () {
        helpers.assertFileContent('bower.json', /modernizr/i);
        helpers.assertFileContent('app/index.html', /modernizr.js/i);

        done();
      })
    });
  });

  describe('when Normalize CSS is included', function () {
    describe('when sass is not included', function () {
      beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
          if (err) {
            return done(err);
          }

          ractive = helpers.createGenerator('ractive:app', [
            '../../app'
          ], false, {
            'skip-install': true,
            'skip-welcome-message': true,
            'skip-yo-rc': true
          });

          helpers.mockPrompt(ractive, {
            'appPath': 'app',
            'project': 'mock-project',
            'features': ['includeNormalize']
          });

          done();
        });
      });

      it('includes Normalize CSS', function (done) {
        ractive.run({}, function () {
          helpers.assertFileContent('bower.json', /normalize-css/i);

          done();
        })
      });
    });
    describe('when sass is included', function () {
      beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
          if (err) {
            return done(err);
          }

          ractive = helpers.createGenerator('ractive:app', [
            '../../app'
          ], false, {
            'skip-install': true,
            'skip-welcome-message': true,
            'skip-yo-rc': true
          });

          helpers.mockPrompt(ractive, {
            'appPath': 'app',
            'project': 'mock-project',
            'features': [
              'includeNormalize',
              'includeSass'
            ]
          });

          done();
        });
      });

      it('includes Normalize SCSS', function (done) {
        ractive.run({}, function () {
          helpers.assertFileContent('bower.json', /normalize-scss/i);

          done();
        })
      });
    });
  });

  describe('when using AMD', function () {
    beforeEach(function (done) {
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) {
          return done(err);
        }

        ractive = helpers.createGenerator('ractive:app', [
          '../../app'
        ], false, {
          'skip-install': true,
          'skip-welcome-message': true,
          'skip-yo-rc': true
        });

        helpers.mockPrompt(ractive, {
          'appPath': 'app',
          'project': 'mock-project',
          'loadMethod': 'AMD'
        });

        done();
      });
    });

    it('creates the expected JavaScript files', function (done) {
      var expected = [
        'app/scripts/main.js',
        'app/scripts/app.js',
        'test/app_test.js'
      ];

      ractive.run({}, function () {
        helpers.assertFile(expected);

        done();
      });
    });

    it('includes Require.js', function (done) {
      ractive.run({}, function () {
        helpers.assertFileContent('Gruntfile.js', /requirejs/i);
        helpers.assertFileContent('bower.json', /requirejs/i);

        done();
      })
    });

    it('includes ractive-require', function (done) {
      ractive.run({}, function () {
        helpers.assertFileContent('bower.json', /requirejs-ractive/i);

        done();
      })
    });

    it('defines modules', function (done) {
      ractive.run({}, function () {
        helpers.assertFileContent('app/scripts/app.js', /define/i);
        helpers.assertFileContent('test/app_test.js', /define/i);

        done();
      })
    });
  });

  describe('when using a router', function () {
    describe('when choosing Router.js', function () {
      beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
          if (err) {
            return done(err);
          }

          ractive = helpers.createGenerator('ractive:app', [
            '../../app'
          ], false, {
            'skip-install': true,
            'skip-welcome-message': true,
            'skip-yo-rc': true
          });

          helpers.mockPrompt(ractive, {
            'appPath': 'app',
            'project': 'mock-project',
            'router': true,
            'includedRouter': 'routerjs'
          });

          done();
        });
      });

      it('includes Router.js', function (done) {
        ractive.run({}, function () {
          helpers.assertFileContent('bower.json', /router.js/);

          done();
        })
      });
    });
    describe('when choosing Router.js', function () {
      beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
          if (err) {
            return done(err);
          }

          ractive = helpers.createGenerator('ractive:app', [
            '../../app'
          ], false, {
            'skip-install': true,
            'skip-welcome-message': true,
            'skip-yo-rc': true
          });

          helpers.mockPrompt(ractive, {
            'appPath': 'app',
            'project': 'mock-project',
            'router': true,
            'includedRouter': 'pagejs'
          });

          done();
        });
      });

      it('includes Page.js', function (done) {
        ractive.run({}, function () {
          helpers.assertFileContent('bower.json', /page/);

          done();
        })
      });
    });
  });
});
