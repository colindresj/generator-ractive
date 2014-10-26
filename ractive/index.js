'use strict';

var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    RactiveGenerator;

RactiveGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    var loadMethod = this.loadMethod = this.config.get('loadMethod'),
        inject = require('../lib/inject-script-tag').bind(this);

    if (loadMethod === 'scriptTags') {
      this.nameSpace = this.config.get('nameSpace');
      this.template('ractive.js', 'app/scripts/ractives/' + this.name + '.js');
      inject('ractive');
    } else if (loadMethod === 'AMD') {
      this.template('ractive-amd.js', 'app/scripts/ractives/' + this.name + '.js');
      this.copy('ractive.html', 'app/scripts/ractives/' + this.name + '.html');
    } else if (loadMethod === 'browserify') {
      this.template('ractive-browserify.js', 'app/scripts/ractives/' + this.name + '.js');
      this.template('ractive.html', 'app/scripts/ractives/' + this.name + '.ract');
    }
  },
  testFiles: function () {
    var testFramework = this.testFramework = this.config.get('testFramework'),
        loadMethod = this.loadMethod;

    this.testConfig = {
      assertString: testFramework === 'mocha' ? 'should assert something' :
        'asserts something',
      expectation: testFramework === 'mocha' ? 'expect(true).to.be.true;' :
        'expect(true).toBe(true);'
    }

    if (loadMethod === 'scriptTags') {
      this.template('ractive_test.js', 'test/ractives/' + this.name + '_test.js');
    } else if (loadMethod === 'AMD') {
      this.template('ractive_test-amd.js', 'test/ractives/' + this.name + '_test.js');
    }
  }
});

module.exports = RactiveGenerator;
