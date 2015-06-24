import Ember from "ember";
import { module, test } from 'qunit';
import { pairModule, pairTest, pairConclude } from '../helpers/pair';

import mobileDetection from "ember-mobiletouch/utils/is-mobile";
import startApp from '../helpers/start-app';
import viewRegistry from '../helpers/view-registry';

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

  assert.expect(8);

  visit('/inputs');

  andThen(function() {

    view = viewRegistry(App).focusTest;
    $element = view.$();

    assert.notEqual(document.activeElement, $element.get(0), 'The input is not initially focused.');
  });

  triggerTap('#focusTest');

  andThen(function() {

    assert.equal(view.taps, 1, 'a tap was registered');
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

/*
// Three related tests that vary in the context of the checkbox.
var testBatch = [
  {label: 'without a form', sel: '#checkbox1-test', prop: 'checkbox1Checked'},
  {label: 'form without an action', sel: '#checkbox2-test', prop: 'checkbox2Checked'},
  {label: 'form with a submit action', sel: '#checkbox3-test', prop: 'checkbox3Checked'}
];

// Instantiate a test for each member in the testBatch.
testBatch.forEach(function(t) {
  var checkboxSel = t.sel+' input[type="checkbox"]';
  pairTest("Tap checkbox makes it checked - "+t.label, function(assert) {

    assert.expect(6);
    var controller = getController('inputs');

    assert.equal(controller.get('name'), 'inputs controller');
    assert.ok(controller.get(t.prop) === false);

    visit('/inputs');
    triggerTap(checkboxSel);

    andThen(function() {
      assert.ok(controller.get(t.prop));
      assert.ok($(checkboxSel).prop('checked'));
      Ember.run.later(function() {
        assert.ok($(checkboxSel).prop('checked'));
      }, 100);
    });
    andThen(function() {
      assert.ok($(checkboxSel).prop('checked'));
    });

  });
});
*/

pairConclude();
