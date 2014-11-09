(function (<%= nameSpace %>, Ractive) {
  'use strict';

  var <%= _.classify(name) %> = Ractive.extend({
    template: '#component/<%= _.slugify(name) %>-template',
    isolated: <%= isIsolated %>,
    beforeInit: function () {},
    init: function () {},
    data: {}
  });
  <% if (isGlobal) { %>
  Ractive.components.<%= _.camelize(name) %> = <%= _.classify(name) %>;<% } else { %>
  <%= nameSpace %>.components.<%= _.slugify(name) %> = <%= _.classify(name) %>;<% } %>
})(window.<%= nameSpace %>, Ractive);
