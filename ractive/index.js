'use strict';

var yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    RactiveGenerator;

RactiveGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    this.template('ractive.js', 'app/ractives/' + this.name + '.js');
  }
});

module.exports = RactiveGenerator;
