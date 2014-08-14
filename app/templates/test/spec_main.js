require.config({
  baseUrl: 'scripts/',
  paths: {
    'amd-loader': '../bower_components/requirejs-ractive/vendor/amd-loader',
    rv: '../bower_components/requirejs-ractive/rv',
    ractive: '../bower_components/ractive/ractive'
  }
});

require([
  '../app_test'
], function () {
  /* global mocha */
  'use strict';

  mocha.run();
});
