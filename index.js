/* jshint node: true */
'use strict';

module.exports = {

  name: 'ember-mobiletouch',

  included: function(app) {
    app.import(app.bowerDirectory + '/hammer.js/hammer.js');
  },

  isDevelopingAddon: function() {
    return false;
  },

  setupPreprocessorRegistry: function(type, registry) {
    var DefaultActionToTap = require('./htmlbars-plugins/default-action-to-tap');

    registry.add('htmlbars-ast-plugin', {
      name: "default-action-to-tap",
      plugin: DefaultActionToTap
    });
  }
};
