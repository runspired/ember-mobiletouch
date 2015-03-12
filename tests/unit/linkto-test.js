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

test("Click on LinkTo is silenced", function(assert) {

  assert.expect(1);
  visit('/linkto');
  andThen(function() {
    click('#genericLinkTo');
    andThen(function() {
      assert.equal(currentRouteName(), 'linkto');
    });
  });

});

test("LinkTo Triggers after gesture on child element.", function(assert) {

  assert.expect(1);
  visit('/linkto');
  andThen(function () {
    triggerEvent('#genericLinkTo .internal-content', 'tap');
    andThen(function() {
      assert.equal(currentRouteName(), 'test-successful');
    });
  });

});

test("Clicks on child elements of a LinkTo are silenced", function(assert) {

  assert.expect(1);
  visit('/linkto');
  andThen(function() {
    click('#genericLinkTo .internal-content');
    andThen(function() {
      assert.equal(currentRouteName(), 'linkto');
    });
  });

});

test("LinkTo eventName can be changed", function(assert) {

  assert.expect(1);
  visit('/linkto');
  andThen(function () {
    triggerEvent('#customGesture', 'swiperight');
    andThen(function() {
      assert.equal(currentRouteName(), 'test-successful');
    });
  });

});
