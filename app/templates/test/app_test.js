<% if (testFramework === 'mocha') { %>/* jshint expr: true */<% } %>
(function () {
  'use strict';

  describe('<%= props.project %>', function () {
    describe('give it some context', function () {
      it('<%= testConfig.assertString %>', function () {
        <%= testConfig.expectation %>
      });
    });
  });
})();
