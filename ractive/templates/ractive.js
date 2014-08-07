(function (<%= this.config.get('nameSpace') %>, Ractive) {
  'use strict';

  <%= this.config.get('nameSpace') %>.Ractives.<%= _.slugify(name) %> = new Ractive({
    el: '<%= _.slugify(name) %>',
    template: '<%= _.slugify(name) %>-template',
    data: {}
  });
})(window.<%= this.config.get('nameSpace') %>, Ractive);
