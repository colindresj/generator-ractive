'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    yosay = require('yosay'),
    chalk = require('chalk'),
    _ = require('lodash'),
    RactiveGenerator;


RactiveGenerator = yeoman.generators.Base.extend({
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
    this.mkdir('app/templates');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = RactiveGenerator;
