/* jshint node: true */
'use strict';

module.exports = {

  name: 'ember-mobiletouch',

  included : function (app) {
    app.import(app.bowerDirectory + '/hammerjs/hammer.js');
  },

  setupPreprocessorRegistry: function(type, registry) {
    var DefaultActionToTap = require('./htmlbars-plugins/default-action-to-tap');

    registry.add('htmlbars-ast-plugin', {
      name: "default-action-to-tap",
      plugin: DefaultActionToTap
    });
  },

  isDevelopingAddon: function() {
    return true;
  }

};
