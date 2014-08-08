(function (window, undefined) {
  'use strict';

  window.<%= _.classify(props.project) %> = window.<%= _.classify(props.project) %> || {
    Components: {},
    Ractives: {}
  };
})(window);
