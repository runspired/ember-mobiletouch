import Ember from "ember";

export default (function() {

  Ember.Test.registerHelper('getController', function(app, controller, context) {
    Ember.assert('helper must be given a controller name', !!controller);
    return app.__container__.lookup("controller:"+controller);
  });

})();
