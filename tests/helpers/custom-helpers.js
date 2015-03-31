import Ember from "ember";
import tap from './tap';

export default (function() {

  Ember.Test.registerHelper('getController', function (app, name) {
    Ember.assert('helper must be given a controller name', !!name);
    return app.__container__.lookup('controller:' + name);
  });

  // Send a tap or a click depending on if we think we're mobile or not.
  Ember.Test.registerAsyncHelper('triggerTap', function(app, selector) {
    Ember.assert('helper must be given a selector', !!selector);
    tap(selector);
    return app.testHelpers.wait();
  });

})();
