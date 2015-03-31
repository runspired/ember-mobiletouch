import Ember from "ember";
import { module, test } from 'qunit';
import { pairModule, pairTest, pairConclude } from '../helpers/pair';

import mobileDetection from "ember-mobiletouch/utils/is-mobile";
import startApp from '../helpers/start-app';

var App;

pairModule('Input Focus Integration Tests', {

  beforeEach: function() {
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, App.destroy);
  }

});


pairTest("Tap on inputs focus them.", function(assert) {

  var view;
  var $element;

  assert.expect(9);

  visit('/inputs');

  andThen(function() {

    view = Ember.View.views.focusTest;
    $element = view.$();

    assert.notEqual(document.activeElement, $element.get(0), 'The input is not initially focused.');
  });

  triggerTap('#focusTest');

  andThen(function() {

    assert.ok(1);
    assert.equal(view.get('taps'), 1, 'a tap was registered');
    assert.equal(document.activeElement,$element.get(0), 'The input receives focus.');
    assert.equal(view.focuses, 1, 'The view has been focused once.');

    Ember.run.later(function () {
      assert.equal(view.fastClicks, 0, 'a fastclick was not observed');
      assert.equal(view.clicks, 1, 'a single click was observed');
      assert.equal(document.activeElement, $element.get(0), 'The input maintains focus.');
      assert.equal(view.focuses, 1, 'The view has not been focused more than once.');
    }, 350);

  });

});


pairTest("Tap on a checkbox causes it to be checked", function(assert) {

  assert.expect(3);
  var controller = getController('inputs');

  assert.equal(controller.get('name'), 'inputs controller');
  assert.ok(controller.get('checkboxChecked') === false);

  visit('/inputs');
  triggerTap('#checkboxTest');

  andThen(function() {
    assert.ok(controller.get('checkboxChecked'));
  });

});

pairConclude();
