import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import mobileDetection from "ember-mobiletouch/utils/is-mobile";
var App;

module('LinkTo Integration Tests (mobile)', {

  beforeEach: function() {
    mobileDetection.fake(true);
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
    mobileDetection.detect();
  }

 });

test("LinkTo Triggers on Tap by default", function(assert) {
  assert.expect(1);
  visit('/linkto');

  andThen(function () {

    triggerEvent('#genericLinkTo', 'tap');
    andThen(function() {
      assert.equal(currentRouteName(), 'actions');
    });
  });

});

test("LinkTo Triggers after gesture on child element.", function(assert) {

  assert.expect(1);
  visit('/linkto');
  andThen(function () {
    triggerEvent('#genericLinkTo .internal-content', 'tap');
    andThen(function() {
      assert.equal(currentRouteName(), 'actions');
    });
  });

});


test("LinkTo eventName can be changed", function(assert) {

  assert.expect(1);
  visit('/linkto');
  andThen(function () {
    triggerEvent('#customGesture', 'swiperight');
    andThen(function() {
      assert.equal(currentRouteName(), 'actions');
    });
  });

});




module('LinkTo Integration Tests (desktop)', {

  beforeEach: function() {
    mobileDetection.fake(false);
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
    mobileDetection.detect();
  }

});

test("LinkTo Triggers on Tap by default", function(assert) {
  assert.expect(1);
  visit('/linkto');

  andThen(function () {

    triggerEvent('#genericLinkTo', 'tap');
    andThen(function() {
      assert.equal(currentRouteName(), 'actions');
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


