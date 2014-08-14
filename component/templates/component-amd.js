define([
  'ractive',
  'rv!components/<%= _.slugify(name) %>'
], function (Ractive, <%= _.slugify(name) %>Template) {
  'use strict';

  return {
    init: function () {
      var <%= _.classify(name) %> = Ractive.extend({
        template: <%= _.slugify(name) %>Template,
        isolated: <%= isIsolated %>,
        beforeInit: function () {},
        init: function () {},
        data: {}
      });
      <% if (isGlobal) { %>
      Ractive.components.<%= _.slugify(name) %> = <%= _.classify(name) %>;<% } else { %>
      return <%= _.classify(name) %>;<% } %>
    }
  };
});
