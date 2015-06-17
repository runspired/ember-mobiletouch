import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import mobileDetection from "ember-mobiletouch/utils/is-mobile";
import mobileTap from '../helpers/mobile-tap';
import desktopTap from '../helpers/desktop-tap';

var App;
var controller;

module('Form Integration Tests - faking non-mobile', {

  beforeEach: function() {
    mobileDetection.fake(false);
    App = startApp();
    controller = getController('forms');
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
    mobileDetection.detect();
    controller = null;
  }

 });

test("Clicking on button triggers default form action", function(assert) {
  assert.expect(1);

  visit('/forms');

  click('#submit-button-1');

  andThen(function() {
    assert.equal(controller.submits, 1);
  });
});

test("Tap on a button triggers default form action", function(assert) {
  assert.expect(1);

  visit('/forms');

  andThen(function() {
    desktopTap('#submit-button-1');
  });

  andThen(function() {
    assert.equal(controller.submits, 1);
  });
});


module('Form Integration Tests - faking mobile', {

  beforeEach: function() {
    mobileDetection.fake(true);
    App = startApp();
    controller = getController('forms');
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
    mobileDetection.detect();
    controller = null;
  }

 });

test("Click on button triggers default form action", function(assert) {
  assert.expect(3);

  visit('/forms');

  click('#submit-button-1');

  andThen(function() {
    Ember.run.later(function () {
      assert.equal(controller.submits, 1, 'a submit was observed');
      assert.equal(controller.internalClicks, 0, 'internalClick was prevented by the action handler');
      assert.equal(controller.clicks, 1, 'one click was observed');
    }, 350);
  });
});

test("Tap on a button triggers default form action", function(assert) {
  assert.expect(6);

  visit('/forms');

  andThen(function() {
    mobileTap('#submit-button-1');
  });

  andThen(function() {
    assert.equal(controller.taps, 1, 'a tap was registered');
    Ember.run.later(function () {
      assert.equal(controller.submits, 1, 'a submit was observed');
      assert.equal(controller.submitEvents, 1, 'a submit event was observed');
      assert.equal(controller.fastClicks, 1, 'a fastclick was observed');
      assert.equal(controller.internalClicks, 0, 'internalClick was prevented by the action handler');
      assert.equal(controller.clicks, 2, 'two clicks were observed');
    }, 350);
  });
});

