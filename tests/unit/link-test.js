import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import mobileTap from '../helpers/mobile-tap';

var App;

module('LinkTo Integration Tests', {

  beforeEach: function() {
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
  }

});

test("Taps on links trigger via fastclick", function(assert) {

  assert.expect(6);
  visit('/links');

  andThen(function () {

    var controller = getController('links');
    assert.ok(controller, 'the controller exists');
    assert.equal(controller.isInserted, true, 'the view was inserted');

    mobileTap('#regularLink');
    andThen(function() {
      assert.equal(controller.taps, 1, 'a tap was registered');
      Ember.run.later(function () {
        assert.equal(controller.fastClicks, 1, 'a fastclick was observed');
      }, 10);
      Ember.run.later(function () {
        assert.equal(controller.internalClicks, 1, 'a regular click was observed');
        assert.equal(controller.clicks, 2, 'two clicks were observed');
      }, 350);
    });
  });

});
/*
test("Links Trigger on Tap on internal content", function(assert) {

  assert.expect(1);
  visit('/links');

  andThen(function () {

    triggerEvent('#linkWithProtocol .internal-content', 'tap');
    andThen(function() {
      assert.equal(window.location.href, 'http://example.com/success');
    });
  });

});

test("Relative Links Trigger on Tap", function(assert) {

  assert.expect(1);
  visit('/links');

  andThen(function () {

    triggerEvent('#relativeLink', 'tap');
    andThen(function() {
      assert.equal(window.location.href, 'http://example.com/success');
    });
  });

});

test("Relative Links Trigger on Tap on internal content", function(assert) {

  assert.expect(1);
  visit('/links');

  andThen(function () {

    triggerEvent('#relativeLink .internal-content', 'tap');
    andThen(function() {
      assert.equal(currentRouteName(), 'http://example.com/success');
    });
  });

});
*/
