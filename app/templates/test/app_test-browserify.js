<% if (testFramework === 'mocha') { %>/* jshint expr: true */<% } %>
'use strict';

require('../app/scripts/app');

describe('<%= props.project %>', function () {
  describe('give it some context', function () {
    it('<%= testConfig.assertString %>', function () {
      <%= testConfig.expectation %>
    });
  });
});
