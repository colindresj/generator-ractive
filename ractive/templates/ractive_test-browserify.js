<% if (testFramework === 'mocha') { %>/* jshint expr: true */<% } %>
'use strict';

require('../../app/scripts/ractives/<%= name %>');

describe('<%= name %>', function () {
  describe('give it some context', function () {
    it('<%= testConfig.assertString %>', function () {
      <%= testConfig.expectation %>
    });
  });
});
