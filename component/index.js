'use strict';

var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    inject = require('../lib/inject-script-tag'),
    ComponentGenerator;

ComponentGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    this.nameSpace = this.config.get('nameSpace');
    this.isIsolated = true;
    this.template('component.js', 'app/scripts/components/' + this.name + '.js');

    if (this.config.get('loadMethod') === 'scriptTags') {
      inject.call(this, 'component');
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

    this.template('component_test.js', 'test/components/' + this.name + '_test.js');
  }
});

module.exports = ComponentGenerator;
