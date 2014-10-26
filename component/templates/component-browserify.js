'use strict';

var Ractive = require('ractive/ractive.runtime');

var <%= _.classify(name) %> = Ractive.extend({
  template: require('./<%= _.slugify(name) %>.ract').template,
  isolated: <%= isIsolated %>,
  beforeInit: function () {},
  init: function () {},
  data: {}
});
<% if (isGlobal) { %>
Ractive.components.<%= _.slugify(name) %> = <%= _.classify(name) %>;<% } %>
