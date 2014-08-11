'use strict';

var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    inject = require('../lib/inject-script-tag').bind(this),
    RactiveGenerator;

RactiveGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    var loadMethod = this.config.get('loadMethod');

    if (loadMethod === 'scriptTags') {
      this.nameSpace = this.config.get('nameSpace');
      this.template('ractive.js', 'app/scripts/ractives/' + this.name + '.js');
      inject('ractive');
    } else if (loadMethod == 'AMD') {
      this.template('ractive-amd.js', 'app/scripts/ractives/' + this.name + '.js');
      this.copy('ractive-amd.html', 'app/scripts/ractives/' + this.name + '.html');
    }
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
