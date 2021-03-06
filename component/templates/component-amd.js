define([
  'ractive',
  'rv!components/<%= _.slugify(name) %>'
], function (Ractive, <%= _.camelize(name) %>Template) {
  'use strict';

  return {
    init: function () {
      var <%= _.classify(name) %> = Ractive.extend({
        template: <%= _.camelize(name) %>Template,
        isolated: <%= isIsolated %>,
        beforeInit: function () {},
        init: function () {},
        data: {}
      });
      <% if (isGlobal) { %>
      Ractive.components.<%= _.camelize(name) %> = <%= _.classify(name) %>;<% } else { %>
      return <%= _.classify(name) %>;<% } %>
    }
  };
});
