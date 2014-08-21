'use strict';

var ractive,
    ractiveName = 'foo',
    path = require('path'),
    inject = require('../lib/inject-script-tag'),
    helpers = require('yeoman-generator').test;

describe('yo ractive:ractive', function () {
  describe('when using the default setup', function () {
    beforeEach(function (done) {
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) {
          return done(err);
        }

        ractive = helpers.createGenerator('ractive:ractive', [
          '../../app',
          '../../ractive',
        ], [ractiveName], {});

        helpers.stub(ractive.config, 'get', function (key) {
          if (key === 'loadMethod') {
            return 'scriptTags';
          }
        });

        done();
      });
    });

    it('should generate a new ractive', function (done) {
      var expected = [
        'app/scripts/ractives/' + ractiveName + '.js',
        'test/ractives/' + ractiveName + '_test.js'
      ];

      ractive.run([], function () {
        helpers.assertFile(expected);

        done();
      });
    });

    it('should give the ractive the passed in name', function (done) {
      ractive.run([], function () {
        helpers.assertFileContent('app/scripts/ractives/' + ractiveName + '.js',
          new RegExp('.ractives.' + ractiveName + ' = ' + ractiveName, 'i')
        );

        done();
      });
    });

    it('should give the ractive element the passed in name', function (done) {
      ractive.run([], function () {
        helpers.assertFileContent('app/scripts/ractives/' + ractiveName + '.js',
          new RegExp('el: \'' + ractiveName + '\'', 'i')
        );

        done();
      });
    });

    it('should give the ractive template the passed in name', function (done) {
      ractive.run([], function () {
        helpers.assertFileContent('app/scripts/ractives/' + ractiveName + '.js',
          new RegExp('template: \'#' + ractiveName + '-template\'', 'i')
        );

        done();
      });
    });
  });

  describe('when using AMD', function () {
    beforeEach(function (done) {
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) {
          return done(err);
        }

        ractive = helpers.createGenerator('ractive:ractive', [
          '../../app',
          '../../ractive',
        ], [ractiveName], {});

        helpers.stub(ractive.config, 'get', function (key) {
          if (key === 'loadMethod') {
            return 'AMD';
          }
        });

        done();
      });
    });

    it('defines modules', function (done) {
      ractive.run({}, function () {
        helpers.assertFileContent('app/scripts/ractives/' + ractiveName + '.js',
          /define/i
        );
        helpers.assertFileContent('test/ractives/' + ractiveName + '_test.js',
          /define/i
        );

        done();
      })
    });
  });
});
