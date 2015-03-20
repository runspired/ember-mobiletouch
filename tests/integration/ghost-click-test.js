import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import mobileDetection from "ember-mobiletouch/utils/is-mobile";
import ghostTap from '../helpers/ghost-tap';
var App;

module('GhostClick', {

  beforeEach: function() {
    mobileDetection.fake(true);
    App = startApp();
  },
  afterEach: function() {
    Ember.run(App, App.destroy);
    mobileDetection.detect();
  }

});



test("A tap does not focus an input inserted by the tap.", function(assert) {

  assert.expect(8);


  visit('/ghosts');

  andThen(function () {

    ghostTap('#originalTarget', '#unintendedTarget');

    andThen(function() {

      var view = Ember.View.views['unintendedTarget'];
      var $element = view.$();

      assert.equal(view.taps, 0, 'a tap was not observed');
      assert.notEqual(document.activeElement, $element.get(0), 'The input receives focus.');
      assert.equal(view.focuses, 0, 'The view has not been focused.');

      Ember.run.later(function () {
        assert.equal(view.fastClicks, 0, 'a fastclick was not observed');
        assert.equal(view.internalClicks, 0, 'a regular click was never observed');
        assert.equal(view.clicks, 1, 'a single click was observed');
        assert.notEqual(document.activeElement, $element.get(0), 'The input maintains focus.');
        assert.equal(view.focuses, 0, 'The view has not been focused.');
      }, 350);

    });

  });
});

