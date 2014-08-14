<% if (testFramework === 'mocha') { %>/* jshint expr: true */
<% } %>(function () {
  'use strict';

  describe('<%= name %>', function () {
    describe('give it some context', function () {
      it('<%= testConfig.assertString %>', function () {
        <%= testConfig.expectation %>
      });
    });
  });
})();
