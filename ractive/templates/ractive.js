(function (<%= nameSpace %>, Ractive) {
  'use strict';

  <%= nameSpace %>.Ractives.<%= _.slugify(name) %> = new Ractive({
    el: '<%= _.slugify(name) %>',
    template: '#<%= _.slugify(name) %>-template',
    data: {}
  });
})(window.<%= nameSpace %>, Ractive);
