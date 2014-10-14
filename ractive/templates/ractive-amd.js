define([
  'ractive',
  'rv!ractives/<%= _.slugify(name) %>'
], function (Ractive, <%= _.camelize(name) %>Template) {
  'use strict';

  return {
    init: function () {
      new Ractive({
        el: '.<%= _.slugify(name) %>',
        template: <%= _.camelize(name) %>Template,
        data: {}
      });
    }
  };
});
