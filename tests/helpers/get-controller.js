import Ember from "ember";

export default Ember.Test.registerHelper('getController',
  function (app, name) {
    return app.__container__.lookup('controller:' + name);
  }
);
