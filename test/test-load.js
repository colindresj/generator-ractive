/*global describe, beforeEach, it*/
'use strict';

var assert = require('assert');

describe('ractive generator', function () {
  it('can be imported without blowing up', function () {
    assert(require('../app') !== undefined);
    assert(require('../ractive') !== undefined);
  });
});
