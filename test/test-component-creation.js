'use strict';

var component,
    componentName = 'foo',
    path = require('path'),
    helpers = require('yeoman-generator').test;

describe('yo ractive:component', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      component = helpers.createGenerator('ractive:component', [
        '../../app',
        '../../component',
      ], [componentName], {});

      done();
    });
  });

  it('should generate a new component', function (done) {
    var expected = [
      'app/scripts/components/' + componentName + '.js',
      'test/components/' + componentName + '_test.js'
    ];

    component.run([], function () {
      helpers.assertFile(expected);

      done();
    });
  });

  it('should give the component the passed in name', function (done) {
    component.run([], function () {
      helpers.assertFileContent('app/scripts/components/' + componentName + '.js',
        new RegExp('Ractive.components.' + componentName + ' = Ractive.extend', 'i')
      );

      done();
    });
  });

  it('should give the component template the passed in name', function (done) {
    component.run([], function () {
      helpers.assertFileContent('app/scripts/components/' + componentName + '.js',
        new RegExp('template: \'component/' + componentName + '-template\'', 'i')
      );

      done();
    });
  });

  it('should give it an isolated setting', function (done) {
    component.run([], function () {
      helpers.assertFileContent('app/scripts/components/' + componentName + '.js',
        /isolated: true/i
      );

      done();
    })
  });
});
