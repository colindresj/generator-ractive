(function () {
  'use strict';
  <% if (testFramework === 'mocha') { %>
  var expect = require('chai').expect;
  <% } %>
  describe('<%= props.project %>', function () {
    describe('give it some context', function () {
      it('<%= testConfig.assertString %>', function () {
        <%= testConfig.expectation %>
      });
    });
  });
})();
