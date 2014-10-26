'use strict';

var Ractive = require('ractive/ractive.runtime');

var <%= _.camelize(name) %> = new Ractive({
  el: '.<%= _.slugify(name) %>',
  template: require('./<%= _.slugify(name) %>.ract').template,
  data: {}
});
