import Ember from "ember";
import { module, test } from 'qunit';

import mobileDetection from "ember-mobiletouch/utils/is-mobile";
import startApp from '../helpers/start-app';
import mobileTap from '../helpers/mobile-tap';
import desktopTap from '../helpers/desktop-tap';

var App;

module('Input Focus Integration Tests (mobile)', {

  beforeEach: function() {
    mobileDetection.fake(true);
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
    mobileDetection.detect();
  }

});



test("Taps on inputs focus them.", function(assert) {

  assert.expect(10);

  visit('/inputs');

  andThen(function () {

    var view = Ember.View.views.focusTest;
    var $element = view.$();

    assert.notEqual(document.activeElement, $element.get(0), 'The input is not initially focused.');

    mobileTap('#focusTest');
    andThen(function() {

      assert.equal(view.taps, 1, 'a tap was registered');
      assert.equal(document.activeElement,$element.get(0), 'The input receives focus.');
      assert.equal(view.focuses, 1, 'The view has been focused once.');

      Ember.run.later(function () {
        assert.equal(view.fastClicks, 0, 'a fastclick was not observed');
        assert.equal(view.internalClicks, 1, 'a regular click was observed');
        assert.equal(view.preventedClicks, 0, 'a regular click was not prevented');
        assert.equal(view.clicks, 1, 'a single click was observed');
        assert.equal(document.activeElement, $element.get(0), 'The input maintains focus.');
        assert.equal(view.focuses, 1, 'The view has not been focused more than once.');
      }, 350);

    });
  });

});



module('Input Focus Integration Tests (desktop)', {

  beforeEach: function() {
    mobileDetection.fake(false);
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
    mobileDetection.detect();
  }

});

test("A click on an input generates focus.", function(assert) {

  assert.expect(9);

  visit('/inputs');

  andThen(function () {

    var view = Ember.View.views.focusTest;
    var $element = view.$();

    assert.notEqual(document.activeElement, $element.get(0), 'The input is not initially focused.');

    desktopTap('#focusTest');

    andThen(function() {

      assert.equal(view.taps, 1, 'a tap was registered');
      assert.equal(document.activeElement, $element.get(0), 'The input received focus.');
      assert.equal(view.focuses, 1, 'The view has been focused once.');

      Ember.run.later(function () {
        assert.equal(view.fastClicks, 0, 'a fastclick was not observed');
        assert.equal(view.internalClicks, 1, 'a regular click was observed');
        assert.equal(view.clicks, 1, 'a single click was observed');
        assert.equal(document.activeElement, $element.get(0), 'The input maintains focus.');
        assert.equal(view.focuses, 1, 'The view has not been focused more than once.');
      }, 350);

    });
  });


});

