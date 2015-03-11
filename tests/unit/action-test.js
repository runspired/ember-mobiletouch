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


test("Action triggers on `Tap` by default", function(assert) {
  assert.expect(1);
  visit('/action');

  andThen(function () {

    triggerEvent('#genericAction', 'tap');
    andThen(function() {
      assert.equal(currentRouteName(), 'test-successful');
    });
  });

});

test("Action triggers on `Press` when defined", function(assert) {

  assert.expect(1);
  visit('/action');
  click('#actionIsPress');
  andThen(function() {
    assert.equal(currentRouteName(), 'linkto');
  });

});

test("Action Triggers on internal gesture", function(assert) {
  assert.expect(1);
  visit('/action');

  andThen(function () {

    triggerEvent('#genericAction .internal-content', 'tap');
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

