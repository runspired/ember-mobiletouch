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


test("LinkTo Triggers on Tap", function(assert) {
     assert.expect(1);
     visit('/linkto');
     triggerEvent('#genericLinkTo', 'tap');
     andThen(function() {
       assert.equal(currentRouteName(), 'success');
     });

 });

test("Click on LinkTo is silenced", function(assert) {
  assert.expect(1);
  visit('/linkto');
  click('#genericLinkTo');
  andThen(function() {
    equal(currentRouteName(), 'success');
  });

});

