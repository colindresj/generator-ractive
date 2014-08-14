'use strict';

var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    inject = require('../lib/inject-script-tag'),
    ComponentGenerator;

ComponentGenerator = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('name', { type: String, required: true });
    this.option('global', {
      desc: 'Registers the component onto the Ractives.component object',
      type: Boolean,
      defaults: false
    });
    this.option('isolated', {
      desc: 'Isolate the component\'s template scope',
      type: Boolean,
      deafults: false
    });
  },
  init: function () {
    var loadMethod = this.loadMethod = this.config.get('loadMethod');

    this.isGlobal = this.options['global'];
    this.isIsolated = this.options['isolated'];

    if (loadMethod === 'scriptTags') {
      this.nameSpace = this.config.get('nameSpace');
      this.template('component.js', 'app/scripts/components/' + this.name + '.js');
      inject.call(this, 'component');
    } else if (loadMethod === 'AMD') {
      this.template('component-amd.js', 'app/scripts/components/' + this.name + '.js');
      this.copy('component-amd.html', 'app/scripts/components/' + this.name + '.html');
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
      this.template('component_test.js', 'test/components/' + this.name + '_test.js');
    } else if (loadMethod === 'AMD') {
      this.template('component_test-amd.js', 'test/components/' + this.name + '_test.js');
    }
  }
});

module.exports = ComponentGenerator;
