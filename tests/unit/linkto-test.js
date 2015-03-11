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

  andThen(function () {

    triggerEvent('#genericLinkTo', 'tap');
    andThen(function() {
      assert.equal(currentRouteName(), 'test-successful');
    });
  });

});

test("Click on LinkTo is silenced", function(assert) {

  assert.expect(1);
  visit('/linkto');
  click('#genericLinkTo');
  andThen(function() {
    assert.equal(currentRouteName(), 'linkto');
  });

});

test("LinkTo Triggers on Internal Tap", function(assert) {
  assert.expect(1);
  visit('/linkto');

  andThen(function () {

    triggerEvent('#genericLinkToInternal .internal-content', 'tap');
    andThen(function() {
      assert.equal(currentRouteName(), 'test-successful');
    });
  });

});

test("Clicks on LinkTo Internals are silenced", function(assert) {

  assert.expect(1);
  visit('/linkto');
  click('#genericLinkToInternal .internal-content');
  andThen(function() {
    assert.equal(currentRouteName(), 'linkto');
  });

});

