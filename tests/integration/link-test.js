import Ember from "ember";
import { module, test } from 'qunit';

import mobileDetection from "ember-mobiletouch/utils/is-mobile";
import startApp from '../helpers/start-app';
import mobileTap from '../helpers/mobile-tap';

var App;

module('Link Integration Tests', {

  beforeEach: function() {
    //mobileDetection.fake(true);
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
    //mobileDetection.detect();
  }

});



test("Taps on links trigger via fastclick", function(assert) {

  assert.expect(4);

  var controller = getController('links');
  visit('/links');

  andThen(function () {

    mobileTap('#regularLink');
    andThen(function() {
      assert.equal(controller.taps, 1, 'a tap was registered');
      Ember.run.later(function () {
        assert.equal(controller.fastClicks, 1, 'a fastclick was observed');
        assert.equal(controller.internalClicks, 1, 'a regular click was observed');
        assert.equal(controller.clicks, 2, 'two clicks were observed');
      }, 350);

    });
  });

});

test("Links Trigger on Tap on internal content", function(assert) {

  assert.expect(4);

  var controller = getController('links');
  visit('/links');

  andThen(function () {

    mobileTap('#regularLink .internal-content');
    andThen(function() {
      assert.equal(controller.taps, 1, 'a tap was registered');
      Ember.run.later(function () {
        assert.equal(controller.fastClicks, 1, 'a fastclick was observed');
        assert.equal(controller.internalClicks, 1, 'a regular click was observed');
        assert.equal(controller.clicks, 2, 'two clicks were observed');
      }, 350);

    });
  });


});

test("Relative Links Trigger on Tap", function(assert) {

  assert.expect(4);

  var controller = getController('links');
  visit('/links');

  andThen(function () {

    mobileTap('#relativeLink');
    andThen(function() {
      assert.equal(controller.taps, 1, 'a tap was registered');
      Ember.run.later(function () {
        assert.equal(controller.fastClicks, 1, 'a fastclick was observed');
        assert.equal(controller.internalClicks, 1, 'a regular click was observed');
        assert.equal(controller.clicks, 2, 'two clicks were observed');
      }, 350);

    });
  });

});

test("Relative Links Trigger on Tap on internal content", function(assert) {

  assert.expect(4);

  var controller = getController('links');
  visit('/links');

  andThen(function () {

    mobileTap('#relativeLink .internal-content');
    andThen(function() {
      assert.equal(controller.taps, 1, 'a tap was registered');
      Ember.run.later(function () {
        assert.equal(controller.fastClicks, 1, 'a fastclick was observed');
        assert.equal(controller.internalClicks, 1, 'a regular click was observed');
        assert.equal(controller.clicks, 2, 'two clicks were observed');
      }, 350);

    });
  });

});
