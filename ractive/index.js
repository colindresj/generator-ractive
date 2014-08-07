'use strict';

var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    RactiveGenerator;

RactiveGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    this.nameSpace = this.config.get('nameSpace');
    this.template('ractive.js', 'app/scripts/ractives/' + this.name + '.js');
  },
  testFiles: function () {
    this.testFramework = this.config.get('testFramework');
    this.testConfig = {
      assertString: this.testFramework === 'mocha' ? 'should assert something' :
        'asserts something',
      expectation: this.testFramework === 'mocha' ? 'expect(true).to.be.true;' :
        'expect(true).toBe(true);'
    }

    this.template('ractive_test.js', 'test/ractives/' + this.name + '_test.js');
  }
});

module.exports = RactiveGenerator;
