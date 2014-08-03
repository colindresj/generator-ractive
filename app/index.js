'use strict';

var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    yosay = require('yosay'),
    chalk = require('chalk'),
    _ = require('lodash'),
    RactiveProjectGenerator;


RactiveProjectGenerator = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.option('skip-analytics', {
      desc: 'Do not include Google Analytics tracking code',
      type: Boolean,
      defaults: false
    });
  },

  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async(), prompts;

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Ractive generator!'));

    prompts = [{
      name: 'project',
      message: 'What\'s your project called?'
    },
    {
      type: 'confirm',
      name: 'router',
      message: 'Would you like to include Router.js?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.props = this.props || {};

      _.extend(this.props, props);

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('app/app.js', 'app/app.js');
    this.template('app/index.html', 'app/index.html');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = RactiveProjectGenerator;
