import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
var App;

module('LinkTo Integration Tests', {

  beforeEach: function() {
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
  }

});
/*
test("LinkTo Triggers on Tap by default", function(assert) {
  assert.expect(1);
  visit('/linkto');

  andThen(function () {

    triggerEvent('#genericLinkTo', 'tap');
    andThen(function() {
      assert.equal(currentRouteName(), 'test-successful');
    });
  });

});
*/
