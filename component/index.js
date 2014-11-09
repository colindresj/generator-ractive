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

    this.option('on-the-fly', {
      desc: 'Create the component on the fly by requiring it through extension',
      type: Boolean,
      defaults: false
    });
  },

  init: function () {
    var loadMethod = this.loadMethod = this.config.get('loadMethod');

    this.isGlobal = this.options['global'];
    this.isIsolated = this.options['isolated'];
    this.onTheFly = this.options['on-the-fly'];

    if (this.onTheFly && loadMethod !== 'browserify') {
      this.log(chalk.yellow(
        'The on the fly option can only be used with Browserify. Invoking the ' +
        'component as if the flag was not passed.'
      ));
    }

    if (loadMethod === 'scriptTags') {
      this.nameSpace = this.config.get('nameSpace');
      this.template('component.js', 'app/scripts/components/' + this.name + '.js');
      inject.call(this, 'component');
    } else if (loadMethod === 'AMD') {
      this.template('component-amd.js', 'app/scripts/components/' + this.name + '.js');
      this.copy('component.html', 'app/scripts/components/' + this.name + '.html');
    } else if (loadMethod === 'browserify') {
      if (!this.onTheFly) {
        this.template('component-browserify.js', 'app/scripts/components/' + this.name + '.js');
      }
      this.copy('component.html', 'app/scripts/components/' + this.name + '.ract');
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
