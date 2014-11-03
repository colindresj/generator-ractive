'use strict';

var Ractive = require('ractive/ractive.runtime');

new Ractive({
  el: '.<%= _.slugify(name) %>',
  template: require('./<%= _.slugify(name) %>.ract').template,
  data: {}
});
