(function (App, Ractive) {
  'use strict';

  App.Ractives.<%= _.slugify(name) %> = new Ractive({
    el: '<%= _.slugify(name) %>',
    template: '<%= _.slugify(name) %>-template',
    data: {}
  });
})(App, Ractive);
