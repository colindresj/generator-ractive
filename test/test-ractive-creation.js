'use strict';

var ractive,
    ractiveName = 'foo',
    path = require('path'),
    helpers = require('yeoman-generator').test;

describe('yo ractive:ractive', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      ractive = helpers.createGenerator('ractive:ractive', [
        '../../app',
        '../../ractive',
      ], [ractiveName], {
        'appPath': 'app',
        'skip-install': true,
        'skip-welcome-message': true,
        'skip-message': true
      });

      done();
    });
  });

  it('should generate a new ractive', function (done) {
    var expected = [
      'app/ractives/' + ractiveName + '.js',
      'test/ractives/' + ractiveName + '_test.js'
    ];

    ractive.run([], function () {
      helpers.assertFile(expected);

      done();
    });
  });

  it('should give the ractive the passed in name', function (done) {
    ractive.run([], function () {
      helpers.assertFileContent('app/ractives/' + ractiveName + '.js',
        new RegExp('App.Ractives.' + ractiveName + ' = new Ractive', 'i')
      );

      done();
    });
  });

  it('should give the ractive element the passed in name', function (done) {
    ractive.run([], function () {
      helpers.assertFileContent('app/ractives/' + ractiveName + '.js',
        new RegExp('el: \'' + ractiveName + '\'', 'i')
      );

      done();
    });
  });

  it('should give the ractive template the passed in name', function (done) {
    ractive.run([], function () {
      helpers.assertFileContent('app/ractives/' + ractiveName + '.js',
        new RegExp('template: \'' + ractiveName + '-template\'', 'i')
      );

      done();
    });
  });
});
