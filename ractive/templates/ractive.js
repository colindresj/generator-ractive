(function (<%= this.nameSpace %>, Ractive) {
  'use strict';

  <%= this.nameSpace %>.Ractives.<%= _.slugify(name) %> = new Ractive({
    el: '<%= _.slugify(name) %>',
    template: '<%= _.slugify(name) %>-template',
    data: {}
  });
})(window.<%= this.nameSpace %>, Ractive);
