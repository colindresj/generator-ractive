define([
  'ractive',
  'rv!ractives/<%= _.slugify(name) %>'
], function (Ractive, <%= _.slugify(name) %>Template) {
  'use strict';

  return {
    init: function () {
      new Ractive({
        el: '<%= _.slugify(name) %>',
        template: <%= _.slugify(name) %>Template,
        data: {}
      });
    }
  };
});
