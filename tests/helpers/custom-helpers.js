import Ember from "ember";

export default (function() {

  Ember.Test.registerHelper('getController',
    function (app, name) {
      Ember.assert('helper must be given a controller name', !!name);
      return app.__container__.lookup('controller:' + name);
    }
  );

})();
