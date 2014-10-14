(function (<%= nameSpace %>, Ractive) {
  'use strict';

  var <%= _.camelize(name) %> = new Ractive({
    el: '.<%= _.slugify(name) %>',
    template: '#<%= _.slugify(name) %>-template',
    data: {}
  });

  <%= nameSpace %>.ractives.<%= _.camelize(name) %> = <%= _.camelize(name) %>;
})(window.<%= nameSpace %>, Ractive);
