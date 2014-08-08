(function (<%= nameSpace %>, Ractive) {
  'use strict';

  Ractive.components.<%= _.slugify(name) %> = Ractive.extend({
    template: 'component/<%= _.slugify(name) %>-template',
    isolated: <%= isIsolated %>,
    beforeInit: function () {},
    init: function () {},
    data: {}
  });
})(window.<%= nameSpace %>, Ractive);
