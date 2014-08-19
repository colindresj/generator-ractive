'use strict';

var ractive,
    path = require('path'),
    helpers = require('yeoman-generator').test;

describe('yo ractive', function () {
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
        'router': false,
        'loadMethod': 'scriptTags',
        'includeSass': false,
        'includeModernizr': false,
        'includejQuery': false
      });

      done();
    });
  });

  describe('project files', function () {
    it('creates the expected dot files', function (done) {
      var expected = [
        '.editorconfig',
        '.gitattributes',
        '.gitignore',
        '.jshintrc',
        'Gruntfile.js',
        'app/styles/main.css'
      ];

      ractive.run({}, function () {
        helpers.assertFile(expected);

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
